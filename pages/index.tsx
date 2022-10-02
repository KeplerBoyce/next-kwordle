import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Kwordle</title>
        <meta name="description" content="Online 1v1 Wordle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-red-500">
          Tailwind test
        </h1>
      </main>
    </>
  )
}
