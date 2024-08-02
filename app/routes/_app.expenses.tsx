import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList";

import { FaDownload, FaPlus } from "react-icons/fa";
import { getExpenses } from "../data/database.server";

export const loader = () => {
    return getExpenses();
};

const ExpensesLayout = () => {
    const expenses = useLoaderData<typeof loader>();

    return (
        <>
            <Outlet />
            <main>
                <section id="expenses-actions">
                    <Link to={"add"}>
                        <FaPlus />
                        <span>Add Expenses</span>
                    </Link>
                    <a href="/expenses/raw">
                        <FaDownload />
                        <span>Load Raw Data</span>
                    </a>
                </section>
                <ExpensesList expenses={expenses} />
            </main>
        </>
    );
};

export default ExpensesLayout;
