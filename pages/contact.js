import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'

export default function Contact({preview}) {
  return (
    <Layout preview={preview}>
      <Container>
        <main className="flex my-10 gap-10 mx-auto justify-center">
          <article className="bg-white shadow-xl rounded pt-12 pb-20 px-5 sm:mx-5 sm:max-w-xl md:max-w-3xl md:px-12 md:pt-12 lg:max-w-4xl lg:px-32">
            <Head>
              <title>Contact us | roadToMastery</title>
            </Head>

            <h1 className="font-bold text-3xl mb-4 md:text-5xl md:mb-6">
              Contact us
            </h1>
            <div className="mt-7 md:mt-8 flex flex-col md:flex-row-reverse">
              <div className="text-lg lg:text-xl leading-7 lg:leading-8 md:flex-grow">
                <form
                  method="post"
                  action="https://rake.red/api/road-to-mastery/contact"
                  className="mx-auto"
                >
                  <div className="grid grid-cols-1 gap-6">
                    <label className="block">
                      <span className="text-gray-700">Full name</span>
                      <input
                        name="name"
                        type="text"
                        className="mt-1 block w-full"
                        placeholder=""
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="text-gray-700">Email address</span>
                      <input
                        name="email"
                        type="email"
                        className="mt-1 block w-full"
                        required
                      />
                    </label>

                    <label className="block">
                      <span className="text-gray-700">Your message</span>
                      <textarea
                        name="message"
                        className="mt-1 block w-96"
                        rows="5"
                        required
                      ></textarea>
                    </label>

                    <button
                      type="submit"
                      className="bg-orange-500 text-white w-full block py-2 mt-6 text-center hover:bg-orange-600 focus:shadow-inner relative rounded transition"
                    >
                      Send!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </article>
        </main>
      </Container>
    </Layout>
  )
}
