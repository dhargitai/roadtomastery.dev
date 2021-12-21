import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction } from "remix";
import tailwindStyles from "./styles/tailwind.css";
import appStyles from "./styles/app.css";
import Logo from '~/components/logo'
import Beer from '~/components/beer'

export let links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: 'https://fonts.googleapis.com' },
    { rel: "preconnect", href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Proza+Libre:wght@700&display=swap' },
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: appStyles },
  ];
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div className="flex flex-wrap container px-5 py-12 mx-auto">
          <main className="w-full text-xl lg:w-4/5 xl:w-3/4 prose lg:pr-8 mx-auto mb-8 md:mb-0 text-center">
            <h1 className="text-4xl mb-12">There was an error on the backend...</h1>
            <p><em>{error.message}</em></p>
            <p>Oh well... Let's have a beer till I fix the issue. If it's urgent (I'd be surprised) then you may contact me, as it won't fix itself if I don't know about it, right? :)</p>
            <div className="grid justify-center">
              <div className="bg-indigo-500 rounded-full p-7">
                <Beer />
              </div>
            </div>
          </main>
        </div>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <div className="flex flex-wrap container px-5 py-12 mx-auto">
          <main className="w-full text-xl lg:w-4/5 xl:w-3/4 prose lg:pr-8 mx-auto mb-8 md:mb-0 text-center">
            <h1 className="text-4xl mb-12">{caught.status}: {caught.statusText}</h1>
            {message}
          </main>
        </div>
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/" title="Road to Mastery" className="text-2xl">
            <Logo />
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5" to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </header>

      <div className="">
        {children}
      </div>

      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <Logo />
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            &copy; {new Date().getFullYear()} David Hargitai
          </p>
        </div>
      </footer>
    </div>
  );
}
