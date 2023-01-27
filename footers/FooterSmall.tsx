import React from "react";
import { INFO } from "../constants/author";

export default function FooterSmall({ absolute = false, linktree = false }) {
  return (
    <>
      <footer
        className={
          (absolute ? "absolute w-full bottom-0 bg-blueGray-800" : "relative") +
          " pb-6"
        }
        style={linktree ? { backgroundColor: "#F4F1DE" } : undefined}
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-800 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.creative-tim.com?ref=nnjs-footer-small"
                  className="text-blueGray-500 hover:text-blueGray-800 text-sm font-semibold py-1"
                >
                  {INFO.WEBSITE}
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4 text-blueGray-800">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href={INFO.REF}
                    className=" hover:text-blueGray-1200 text-sm font-semibold block py-1 px-3"
                  >
                    {INFO.WEBSITE}
                  </a>
                </li>
                <li>
                  <a
                    href={INFO.ABOUT_US}
                    className=" hover:text-blueGray-1200 text-sm font-semibold block py-1 px-3"
                  >
                    About Us
                  </a>
                </li>
                {/* <li>
                  <a
                    href="http://blog.creative-tim.com?ref=nnjs-footer-small"
                    className=" hover:text-blueGray-1200 text-sm font-semibold block py-1 px-3"
                  >
                    Blog
                  </a>
                </li> */}
                <li>
                  <a
                    href={INFO.LICENSE}
                    className=" hover:text-blueGray-1200 text-sm font-semibold block py-1 px-3"
                  >
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
