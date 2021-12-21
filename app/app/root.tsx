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
            <Link className="mr-5" to="/about">About</Link>
            <a href="https://github.com/dhargitai/roadtomastery.dev" title="Road to Mastery on GitHub" target="_blank" rel="noopener">
              <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            </a>
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
