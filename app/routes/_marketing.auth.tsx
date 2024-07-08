import { LinksFunction } from "@remix-run/node";
import { FC } from "react";
import authStyle from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";

const AuthPage: FC = () => {
    return <AuthForm />;
};

export default AuthPage;

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: authStyle },
];
