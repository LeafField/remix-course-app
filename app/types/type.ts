export type Expenses = {
    expenses: {
        id: string;
        title: string;
        amount: number;
        date: string;
    }[];
};

export type ExpensesData = {
    title: string;
    amount: string;
    date: string;
};
