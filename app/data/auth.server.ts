import { prisma } from "./database.server";
import { Credentials } from "./validation.server";
import bcrypt from "bcrypt";

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

    await prisma.user.create({
        data: { email: email, password: passwordHash },
    });
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
}
