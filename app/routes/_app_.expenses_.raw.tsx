import { LoaderFunctionArgs } from "@remix-run/node";
import { getExpenses } from "../data/database.server";
import { requireUserSession } from "../data/auth.server";

// const DUMMY_EXPENSES = [
//     {
//         id: "e1",
//         title: "First expense",
//         amount: 12.99,
//         date: new Date().toISOString(),
//     },
//     {
//         id: "e2",
//         title: "second expense",
//         amount: 16.99,
//         date: new Date().toISOString(),
//     },
// ];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const userId = await requireUserSession(request);
    return getExpenses(userId);
};
