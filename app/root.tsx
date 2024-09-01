import {
    isRouteErrorResponse,
    Link,
    Links,
    Meta,
    MetaFunction,
    Outlet,
    Scripts,
    ScrollRestoration,
    useMatches,
    useRouteError,
} from "@remix-run/react";

import sharedStyle from "./styles/shared.css?url";
import { LinksFunction } from "@remix-run/node";
import { FC } from "react";
import ErrorComponent from "./components/util/Error";

export const meta: MetaFunction = () => {
    return [
        { title: "Remix App" },
        { name: "description", content: "ずんだもんのブログなのだ" },
    ];
};

export function Layout({ children }: { children: React.ReactNode }) {
    const matches = useMatches();
    const disableJS = matches.some((match) => {
        if (
            match.handle &&
            typeof match.handle === "object" &&
            "disableJS" in match.handle
        ) {
            return match.handle.disableJS;
        } else return false;
    });
    return (
        <html lang="ja">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                {!disableJS && <Scripts />}
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: sharedStyle },
];

export const ErrorBoundary: FC = () => {
    const error = useRouteError();
    console.error(error);
    if (isRouteErrorResponse(error)) {
        return (
            <main>
                <ErrorComponent title={error.statusText}>
                    <p>{error.data.message}</p>
                    <p>
                        Back to <Link to={"/"}>safty</Link>
                    </p>
                </ErrorComponent>
            </main>
        );
    } else if (error instanceof Error) {
        return (
            <main>
                <ErrorComponent title={error.message}>
                    <p>{error.message}</p>
                    <p>
                        Back to <Link to={"/"}>safty</Link>
                    </p>
                </ErrorComponent>
            </main>
        );
    }
};
