import React from "react";
import Head from "next/head";
// components

import Navbar from "../navbars/AuthNavbar";
import FooterSmall from "../footers/FooterSmall";
import { INFO } from "../constants/author";

export default function Auth({ children }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>
          {INFO.PRODUCT} by {INFO.WEBSITE}
        </title>
      </Head>
      <Navbar />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url('/img/register_bg_2.png')",
            }}
          ></div>
          {children}
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
