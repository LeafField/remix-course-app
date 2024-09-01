import {
    Form,
    Link,
    useActionData,
    useMatches,
    useNavigation,
    useParams,
} from "@remix-run/react";
import { action } from "../../routes/_app.expenses.add";
import { ExpensesData } from "../../types/type";

export type ExpensesType = {
    amount: number;
    date: string;
    dateAdded: string;
    id: string;
    title: string;
};

function ExpenseForm() {
    const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
    const validationErrors = useActionData<typeof action>();
    // const expenseData = useLoaderData<expenseIdLoader>();
    const matches = useMatches();
    const params = useParams();
    const expenses = matches.find(
        (match) => match.id === "routes/_app.expenses"
    )?.data as ExpensesType[];
    const expenseData = expenses.find((expense) => expense.id === params.id);
    const navigation = useNavigation();

    const defaultValue: ExpensesData = expenseData
        ? {
              title: expenseData.title,
              amount: String(expenseData.amount),
              date: String(expenseData.date),
          }
        : {
              title: "",
              amount: "0.00",
              date: "",
          };

    const isSubmitting = navigation.state !== "idle";

    return (
        <Form
            method={expenseData ? "PATCH" : "POST"}
            className="form"
            id="expense-form"
        >
            <p>
                <label htmlFor="title">Expense Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    maxLength={30}
                    defaultValue={defaultValue.title}
                />
            </p>

            <div className="form-row">
                <p>
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        min="0"
                        step="0.01"
                        required
                        defaultValue={defaultValue.amount}
                    />
                </p>
                <p>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        max={today}
                        required
                        defaultValue={
                            defaultValue.date
                                ? defaultValue.date.slice(0, 10)
                                : ""
                        }
                    />
                </p>
            </div>
            {validationErrors && (
                <ul>
                    {Object.values(validationErrors).map((error) => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
            <div className="form-actions">
                <button disabled={isSubmitting}>
                    {isSubmitting ? "save..." : "Save Expense"}
                </button>
                <Link relative="path" to={".."}>
                    Cancel
                </Link>
            </div>
        </Form>
    );
}

export default ExpenseForm;
