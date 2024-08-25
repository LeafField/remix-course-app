import { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { FC } from "react";
import marketingStyle from "~/styles/marketing.css?url";
import MainHeader from "../components/navigation/MainHeader";
import { getUserFromSession } from "../data/auth.server";

const MarketingLayout: FC = () => {
    return (
        <>
            <MainHeader />
            <Outlet />
        </>
    );
};

export default MarketingLayout;

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: marketingStyle },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    return getUserFromSession(request);
};
