import { prisma } from "./database.server";
import { Credentials } from "./validation.server";
import bcrypt from "bcrypt";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET!;

type Session = {
    userId: string;
};

const sessionStorage = createCookieSessionStorage<Session>({
    cookie: {
        secure: process.env.NODE_ENV === "production",
        secrets: [SESSION_SECRET],
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30days,
        httpOnly: true,
    },
});

async function createUserSession(userId: string, redirectPath: string) {
    const session = await sessionStorage.getSession();
    session.set("userId", userId);
    return redirect(redirectPath, {
        headers: {
            "Set-Cookie": await sessionStorage.commitSession(session),
        },
    });
}

export class ExistingUserError extends Error {
    constructor(
        public message: string,
        public status: number
    ) {
        super(message);
    }
}

export class NotFoundUser extends Error {
    constructor(
        public message: string,
        public status: number
    ) {
        super(message);
    }
}

export class PasswordError extends Error {
    constructor(
        public message: string,
        public status: number
    ) {
        super(message);
    }
}

export async function getUserFromSession(request: Request) {
    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );
    const userId = session.get("userId");
    if (!userId) {
        return null;
    }
    return userId;
}

export async function destroyUserSession(request: Request) {
    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );
    return redirect("/", {
        headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
        },
    });
}

export async function requireUserSession(request: Request) {
    const userId = await getUserFromSession(request);

    if (!userId) {
        throw redirect("/auth?mode=login");
    }
}

export async function signup({ email, password }: Credentials) {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
        const error = new ExistingUserError(
            "A user with provided email address exists already.",
            422
        );
        throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: { email: email, password: passwordHash },
    });
    return createUserSession(user.id, "/expenses");
}

export async function login({ email, password }: Credentials) {
    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (!existingUser) {
        const error = new NotFoundUser(
            "Could not log you in, please check the provided credentials",
            401
        );
        throw error;
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    );
    if (!passwordCorrect) {
        const error = new PasswordError(
            "Could not log you in, please check the provided credentials",
            401
        );
        throw error;
    }

    return createUserSession(existingUser.id, "/expenses");
}
