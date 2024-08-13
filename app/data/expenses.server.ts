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
        throw new Error("Faild to add expenses");
    }
}

export async function updateExpense(
    id: string | undefined,
    expenseData: ExpensesData
) {
    try {
        await prisma.expenses.update({
            where: {
                id,
            },
            data: {
                title: expenseData.title,
                amount: Number(expenseData.amount),
                date: new Date(expenseData.date),
            },
        });
    } catch (err) {
        throw new Error("Faild to update expenses");
    }
}

export async function deleteExpense(id: string | undefined) {
    try {
        await prisma.expenses.delete({
            where: { id },
        });
    } catch (err) {
        throw new Error("Faild to delete expenses");
    }
}
