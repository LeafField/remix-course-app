import { prisma } from "./database.server";
import { Credentials } from "./validation.server";
import bcrypt from "bcrypt";

export async function signup({ email, password }: Credentials) {
    const existingUser = await prisma.user.findFirst({ where: { email } });
    if (existingUser) {
        const error = new Error(
            "A user with provided email address exists already."
        );
        throw error;
    }

    // const passwordHash = await hash(password, 12);
    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
        data: { email: email, password: passwordHash },
    });
}
