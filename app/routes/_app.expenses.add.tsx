import { FC } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";

const AddExpensesPage: FC = () => {
    return (
        <Modal>
            <ExpenseForm />
        </Modal>
    );
};

export default AddExpensesPage;
