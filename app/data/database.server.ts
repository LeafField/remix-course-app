import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var __db: PrismaClient;
}

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//     prisma = new PrismaClient();
//     prisma.$connect();
// } else {
//     if (!global.__db) {
//         global.__db = new PrismaClient();
//         global.__db.$connect();
//     }
//     prisma = global.__db;
// }

export class PrismaInstance {
    private static instance: PrismaInstance | undefined;
    private prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient();
        this.prisma.$connect();
    }

    static get client() {
        if (this.instance) return this.instance.prisma;
        this.instance = new PrismaInstance();
        return this.instance.prisma;
    }
}

const prisma = PrismaInstance.client;

export { prisma };

export async function getExpenses(userId: string) {
    if (!userId) {
        throw new Error("Faild to get expenses");
    }
    try {
        const expenses = await prisma.expenses.findMany({
            where: { userId },
            orderBy: { date: "desc" },
        });
        return expenses;
    } catch (err) {
        throw new Error("Faild to get expenses");
    }
}

export async function getExpense(id: string | undefined) {
    try {
        const expense = await prisma.expenses.findFirst({ where: { id } });
        return expense;
    } catch (err) {
        throw new Error("Faild to get expense");
    }
}
