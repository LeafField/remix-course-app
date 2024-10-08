import ExpenseListItem from "./ExpenseListItem";
import type { Expenses } from "../../types/type";
import { FC } from "react";

const ExpensesList: FC<Expenses> = ({ expenses }) => {
    return (
        <ol id="expenses-list">
            {expenses.map((expense) => (
                <li key={expense.id}>
                    <ExpenseListItem
                        id={expense.id}
                        title={expense.title}
                        amount={expense.amount}
                    />
                </li>
            ))}
        </ol>
    );
};

export default ExpensesList;
