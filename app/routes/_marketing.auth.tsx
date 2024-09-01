import {
    ActionFunctionArgs,
    HeadersFunction,
    LinksFunction,
} from "@remix-run/node";
import { FC } from "react";
import authStyle from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import {
    validateCredentials,
    type Credentials,
} from "../data/validation.server";
import { login, signup, ExistingUserError } from "../data/auth.server.js";

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
            return login(credentials);
        } else {
            return signup(credentials);
        }
    } catch (error) {
        if (error instanceof ExistingUserError && error.status === 422) {
            return { credentials: error.message };
        }
    }
};

export const headers: HeadersFunction = ({ parentHeaders }) => {
    return {
        "Cache-Control": parentHeaders.get("Cache-Control") ?? "",
    };
};
