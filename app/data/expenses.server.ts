import { prisma } from "./database.server";
import type { ExpensesData } from "../types/type";

export async function addExpenses(expensesData: ExpensesData) {
    try {
        return await prisma.expenses.create({
            data: {
                title: expensesData.title,
                amount: Number(expensesData.amount),
                date: new Date(expensesData.date),
            },
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
}
