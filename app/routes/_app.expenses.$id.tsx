import { FC } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { deleteExpense, updateExpense } from "../data/expenses.server";
import { ExpensesData } from "../types/type";
import { validateExpenseInput } from "../data/validation.server";
// import { LoaderFunctionArgs } from "@remix-run/node";
// import { getExpense } from "../data/database.server";

const UpdateExpensesPage: FC = () => {
    return (
        <Modal>
            <ExpenseForm />
        </Modal>
    );
};

export default UpdateExpensesPage;

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//     const expensesId = params.id;
//     const expense = await getExpense(expensesId);
//     return expense;
// };

// export type expenseIdLoader = typeof loader;

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
