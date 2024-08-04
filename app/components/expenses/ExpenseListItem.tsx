import { Link, useFetcher } from "@remix-run/react";
import { FC } from "react";

type Props = {
    title: string;
    amount: number;
    id: string;
};

const ExpenseListItem: FC<Props> = ({ title, amount, id }) => {
    const fetcher = useFetcher();
    function deleteExpenseItemHandler() {
        const proceed = confirm("本当に削除しますか？");
        if (!proceed) return;
        fetcher.submit(null, { action: `/expenses/${id}`, method: "DELETE" });
    }

    if (fetcher.state !== "idle") {
        return (
            <article className="expenses-item locked">
                <p>deleting...</p>
            </article>
        );
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
