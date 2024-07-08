import { Link } from "@remix-run/react";
import { FC } from "react";

type Props = {
    title: string;
    amount: number;
    id: string;
};

const ExpenseListItem: FC<Props> = ({ title, amount, id }) => {
    function deleteExpenseItemHandler() {
        // tbd
    }

    return (
        <article className="expense-item">
            <div>
                <h2 className="expense-title">{title}</h2>
                <p className="expense-amount">${amount.toFixed(2)}</p>
            </div>
            <menu className="expense-actions">
                <button onClick={deleteExpenseItemHandler}>Delete</button>
                <Link to={id}>Edit</Link>
            </menu>
        </article>
    );
};

export default ExpenseListItem;
