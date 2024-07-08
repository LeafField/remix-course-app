import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { FC } from "react";
import expensesStyle from "~/styles/expenses.css?url";
import ExpensesHeader from "../components/navigation/ExpensesHeader";

const ExpensesAppLayout: FC = () => {
    return (
        <>
            <ExpensesHeader />
            <Outlet />
        </>
    );
};

export default ExpensesAppLayout;

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: expensesStyle },
];
