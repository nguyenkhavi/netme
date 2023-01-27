import { NextSeo, NextSeoProps } from "next-seo";
import React, { PropsWithChildren } from "react";

type TProps = {
  seoData: NextSeoProps;
};
const LinkTree = ({ children, seoData }: PropsWithChildren<TProps>) => {
  return (
    <>
      <NextSeo {...seoData} />
      <main>{children}</main>
    </>
  );
};

export default LinkTree;
