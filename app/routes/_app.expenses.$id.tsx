import { FC } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
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
