import { Link, Outlet } from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList";

import { FaDownload, FaPlus } from "react-icons/fa";

const DUMMY_EXPENSES = [
    {
        id: "e1",
        title: "First expense",
        amount: 12.99,
        date: new Date().toISOString(),
    },
    {
        id: "e2",
        title: "second expense",
        amount: 16.99,
        date: new Date().toISOString(),
    },
];

const ExpensesLayout = () => {
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
                <ExpensesList expenses={DUMMY_EXPENSES} />
            </main>
        </>
    );
};

export default ExpensesLayout;
