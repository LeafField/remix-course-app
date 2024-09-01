import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList";

import { FaDownload, FaPlus } from "react-icons/fa";
import { getExpenses } from "../data/database.server";
import { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserSession } from "../data/auth.server";
import { json } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const userId = await requireUserSession(request);
    const expenses = await getExpenses(userId);
    // return expenses;
    return json(expenses, {
        headers: {
            "Cache-control": "max-age=3",
        },
    });
};

const ExpensesLayout = () => {
    const expenses = useLoaderData<typeof loader>();
    const hasExpenses = expenses && expenses.length > 0;

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
                {hasExpenses && <ExpensesList expenses={expenses} />}
                {!hasExpenses && (
                    <section id="no-expenses">
                        <h1>No Expenses found</h1>
                        <p>
                            Start <Link to={"add"}>adding some</Link> today.
                        </p>
                    </section>
                )}
            </main>
        </>
    );
};

export default ExpensesLayout;

export const headers: HeadersFunction = ({ loaderHeaders }) => {
    return {
        "Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
    };
};
