import { ActionFunctionArgs, LinksFunction, redirect } from "@remix-run/node";
import { FC } from "react";
import authStyle from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import {
    validateCredentials,
    type Credentials,
} from "../data/validation.server";
import { signup } from "../data/auth.server.js";
import { ExistingUserError } from "../data/auth.server.js";

const AuthPage: FC = () => {
    return <AuthForm />;
};

export default AuthPage;

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: authStyle },
];

export const action = async ({ request }: ActionFunctionArgs) => {
    const searchParams = new URL(request.url).searchParams;
    const authMode = searchParams.get("mode") || "login";

    const formData = await request.formData();
    const credentials = Object.fromEntries(formData) as unknown as Credentials;
    try {
        validateCredentials(credentials);
    } catch (err) {
        return err as unknown as Partial<Credentials>;
    }

    try {
        if (authMode === "login") {
            //signin
        } else {
            await signup(credentials);
            return redirect("/expenses");
        }
    } catch (error) {
        if (error instanceof ExistingUserError && error.status === 422) {
            return { credentials: error.message };
        }
    }
};
