import { Link } from "@remix-run/react";
import { FC } from "react";

const Logo: FC = () => {
    return (
        <h1 id="logo">
            <Link to="/">RemixExpenses</Link>
        </h1>
    );
};

export default Logo;
