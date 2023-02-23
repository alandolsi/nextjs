import { useState } from "react";
import Head from "next/head";
import { Source_Sans_Pro } from "@next/font/google";

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: "700",
  style: "normal",
});

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const darkModeClass = isDark ? `bg-gray-900 text-white` : `bg-white text-black`;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${darkModeClass} ${sourceSansPro.className} h-screen`}>
        <main className='mx-auto mx-7xl p-4'>
          <h1 className='text-4xl font-bold'>Hello World</h1>
          <button
            className={
              isDark
                ? `bg-white text-gray-900 font-bold py-2 px-4 rounded`
                : `bg-gray-900 text-white font-bold py-2 px-4 rounded`
            }
            onClick={toggleDarkMode}>
            Toggle Dark Mode
          </button>
        </main>
      </main>
    </>
  );
}
