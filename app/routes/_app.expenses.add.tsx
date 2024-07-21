import { FC } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { addExpenses } from "../data/expenses.server";
import type { ExpensesData } from "../types/type";
import { Errors, validateExpenseInput } from "../data/validation.server";

const AddExpensesPage: FC = () => {
    return (
        <Modal>
            <ExpenseForm />
        </Modal>
    );
};

export default AddExpensesPage;

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const expensesData = Object.fromEntries(
        formData
    ) as unknown as ExpensesData;

    try {
        validateExpenseInput(expensesData);
    } catch (err) {
        return err as Errors;
    }

    await addExpenses(expensesData);
    return redirect("/expenses");
};
