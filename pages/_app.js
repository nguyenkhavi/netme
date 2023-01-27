import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Router from "next/router";

import PageChange from "../component/PageChange/PageChange";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
// import "../styles/globals.css";
import "../styles/tailwind.css";
import "../services/firebase";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { DefaultSeo } from "next-seo";
import { INFO } from "../constants/author";
// import "styles/global.css";

const queryClient = new QueryClient();

Router.events.on("routeChangeStart", (url) => {
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  static async getInitialProps({ Component, _, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);
    return (
      <React.Fragment>
        <DefaultSeo
          title={`${INFO.PRODUCT} by ${INFO.NAME}`}
          description={`${INFO.PRODUCT} by ${INFO.NAME}`}
          // openGraph={{
          //   url: "https://www.url.ie/a",
          //   title: "Open Graph Title",
          //   description: "Open Graph Description",
          //   images: [
          //     {
          //       url: "https://www.example.ie/og-image-01.jpg",
          //       width: 800,
          //       height: 600,
          //       alt: "Og Image Alt",
          //       type: "image/jpeg",
          //     },
          //     {
          //       url: "https://www.example.ie/og-image-02.jpg",
          //       width: 900,
          //       height: 800,
          //       alt: "Og Image Alt Second",
          //       type: "image/jpeg",
          //     },
          //     { url: "https://www.example.ie/og-image-03.jpg" },
          //     { url: "https://www.example.ie/og-image-04.jpg" },
          //   ],
          //   siteName: "SiteName",
          // }}
          // twitter={{
          //   handle: "@handle",
          //   site: "@site",
          //   cardType: "summary_large_image",
          // }}
        />
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </QueryClientProvider>
      </React.Fragment>
    );
  }
}
