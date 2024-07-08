import { LoaderFunctionArgs } from "@remix-run/node";

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

export const loader = ({}: LoaderFunctionArgs) => {
    return DUMMY_EXPENSES;
};
