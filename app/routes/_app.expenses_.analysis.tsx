import { FC } from "react";
import ExpenseStatistics from "../components/expenses/ExpenseStatistics";
import Chart from "../components/expenses/Chart";
import { json } from "@remix-run/node";
import { getExpenses } from "../data/database.server";
import {
    isRouteErrorResponse,
    useLoaderData,
    useRouteError,
} from "@remix-run/react";
import ErrorComponent from "../components/util/Error";

export const loader = async () => {
    const expenses = await getExpenses();
    if (!expenses || expenses.length === 0) {
        throw json(
            {
                message: "Could not load expenses for the requested analysys",
            },
            { status: 404 }
        );
    }
    return expenses;
};

const ExpensesAnalysisPage: FC = () => {
    const expenses = useLoaderData<typeof loader>();
    return (
        <main>
            <Chart expenses={expenses} />
            <ExpenseStatistics expenses={expenses} />
        </main>
    );
};

export default ExpensesAnalysisPage;

export function ErrorBoundary() {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <main>
                <ErrorComponent title={error.statusText}>
                    <p>{error.data.message}</p>
                </ErrorComponent>
            </main>
        );
    } else if (error instanceof Error) {
        return (
            <main>
                <ErrorComponent title={error.name}>
                    <p>{error.message}</p>
                </ErrorComponent>
            </main>
        );
    }
}
