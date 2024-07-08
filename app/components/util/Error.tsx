import { FC, PropsWithChildren } from "react";
import { FaExclamationCircle } from "react-icons/fa";

type Props = {
    title: string;
};

const Error: FC<PropsWithChildren<Props>> = ({ title, children }) => {
    return (
        <div className="error">
            <div className="icon">
                <FaExclamationCircle />
            </div>
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default Error;
