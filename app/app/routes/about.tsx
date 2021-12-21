import type { MetaFunction } from "remix";
import Logo from '~/components/logo'

export let meta: MetaFunction = () => {
  return {
    title: "About Road to Mastery",
    description: "What's this site all about?",
  };
};

export default function Index() {
  return (
    <div className="flex flex-wrap container px-5 py-12 mx-auto">
      <main className="w-full text-xl lg:w-4/5 xl:w-3/4 prose lg:pr-8 mx-auto mb-8 md:mb-0">
        <h1 className="text-4xl mb-12">About{" "}<Logo /></h1>

        <p>Hey, I'm David Hargitai, software (web, frontend) engineer, currently working at Born Group.</p>
        <p>From time to time I experience with technologies to try them out, learn more about them by doing and building something.</p>
        <p><Logo />, this development blog is one of these projects. It's built with Remix (React framework), Tailwind CSS, Sanity.io, and it's hosted on Fly.io. This is a fantastic stack to work with!</p>
        <p>I also experiment with writing articles here as that's also a whole skill on its own and I need to practice a lot.</p>
        <p>Enjoy your time here! :)</p>
      </main>
    </div>
  );
}
