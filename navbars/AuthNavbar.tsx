import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { firebaseAuth } from "../services/firebase";
import { useSignOut } from "../services/auth/mutation";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { INFO } from "../constants/author";

export default function Navbar() {
  const router = useRouter();
  const { mutate: signOut } = useSignOut({});
  const [user] = useAuthState(firebaseAuth);

  const _loggedIn = useMemo(() => !!user?.uid, [user?.uid]);
  const _buttonText = useMemo(
    () => (_loggedIn ? "Sign out" : "Log in"),
    [_loggedIn]
  );
  const _handler = useCallback(() => {
    if (_loggedIn) {
      signOut(undefined);
    }
    router.push("auth/login");
  }, [_loggedIn, router, signOut]);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between items-center">
            <Link href="/">
              <a
                className="text-white text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap"
                href="#pablo"
              >
                {INFO.PRODUCT}
              </a>
            </Link>
            <button
              className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              type="button"
              onClick={_handler}
            >
              <i className="fas fa-arrow-alt-circle-down"></i>
              {_buttonText}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
