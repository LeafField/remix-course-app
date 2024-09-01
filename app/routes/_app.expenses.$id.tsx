import { FC } from "react";
import ExpenseForm, { ExpensesType } from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { deleteExpense, updateExpense } from "../data/expenses.server";
import { ExpensesData } from "../types/type";
import { validateExpenseInput } from "../data/validation.server";

const UpdateExpensesPage: FC = () => {
    return (
        <Modal>
            <ExpenseForm />
        </Modal>
    );
};

export default UpdateExpensesPage;

export const action = async ({ params, request }: ActionFunctionArgs) => {
    const id = params.id;
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);

    if (request.method === "PATCH") {
        try {
            validateExpenseInput(expenseData as ExpensesData);
        } catch (err) {
            return err;
        }
        await updateExpense(id, expenseData as ExpensesData);
        return redirect("/expenses");
    } else if (request.method === "DELETE") {
        await deleteExpense(id);
        return redirect("/expenses");
    }
};
export const meta: MetaFunction = ({ matches, params }) => {
    const expenses = matches.find(
        (value) => value.id === "routes/_app.expenses"
    )?.data as ExpensesType[];
    const expense = expenses.find((value) => value.id === params.id);

    return [
        {
            title: expense?.title,
        },
        {
            name: "description",
            content: "Update Expense",
        },
    ];
};
