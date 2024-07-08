import { FC } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";

const UpdateExpensesPage: FC = () => {
    return (
        <Modal>
            <ExpenseForm />
        </Modal>
    );
};

export default UpdateExpensesPage;
