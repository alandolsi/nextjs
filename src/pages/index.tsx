import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Source_Sans_Pro } from "@next/font/google";

const sourceSansPro = Source_Sans_Pro({
  subsets: ["latin"],
  weight: "700",
  style: "normal",
});

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [countries, setCountries] = useState<Array<any>>([]);
  // complete date in german format with weekday
  // const [date, setDate] = useState("");

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const darkModeClass = isDark ? `bg-gray-900 text-white` : `bg-white text-black`;
  // const [time, setTime] = useState(new Date().toLocaleTimeString());

  // useEffect(() => {
  //   // set date
  //   setDate(
  //     new Date().toLocaleDateString("de-DE", {
  //       weekday: "long",
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //     })
  //   );

  //   setInterval(() => {
  //     setTime(new Date().toLocaleTimeString());
  //   }, 1000);
  // }, []);

  // store api request in local storage
  useEffect(() => {
    // check if data is already in local storage
    if (localStorage.getItem("countries")) {
      return;
    }

    const getData = async () => {
      let allCountry = await fetch("https://restcountries.com/v3.1/all");
      let response: Array<any> = await allCountry.json();
      if (response) {
        localStorage.setItem("countries", JSON.stringify(response));
      }
    };
    getData();
  }, []);

  // get data from local storage
  useEffect(() => {
    const getData = async () => {
      let allCountry = await JSON.parse(localStorage.getItem("countries") || "[]");
      if (allCountry) {
        setCountries(allCountry);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={`${darkModeClass} ${sourceSansPro.className}`}>
        <div className={`container mx-auto mx-7xl p-4`}>
          <div className='grid grid-cols-1 sm:grid-cols-2 my-8'>
            <div className='grid-span-1'>
              <button
                onClick={toggleDarkMode}
                className={`${
                  isDark
                    ? "bg-white text-gray-900 w-48 px-4 py-2 rounded-lg"
                    : "bg-gray-900 text-white w-48 px-4 py-2 rounded-lg"
                } w-48 px-4 py-2 rounded-lg`}>
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
            <div className='grid-span-1'>
              <div className='flex justify-start md:justify-end items-center'>
                {/* <p className='text-1xl mt-4 sm:text-2xl sm:mt-0 font-bold'>
                  {date} - {time}
                </p> */}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {countries.map((country: any, index: number) => (
              <div
                key={index}
                className={`rounded-lg p-4 ${isDark ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
                <Image
                  src={country.flags.svg}
                  width={150}
                  height={100}
                  alt={country.name.common}
                  style={{ width: 150, height: 100 }}
                  priority={true}
                />
                <p className='text-xl font-bold'>{country.name.common}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
