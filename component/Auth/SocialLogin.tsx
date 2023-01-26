import React from "react";
import Image from "next/image";
import { useSocialLogin } from "../../services/auth/mutation";
import { useRouter } from "next/router";
import {
  AUTH_ERROR_MAP,
  githubProvider,
  googleProvider,
} from "../../services/firebase";
import { toast } from "react-toastify";

function SocialLogin() {
  const router = useRouter();
  const { mutate: socialLogin } = useSocialLogin({
    onSuccess: (resp) => {
      toast(`🦄 Welcome back ${resp.user.displayName}!`, {
        position: "top-right",
        type: "success",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/profile");
    },
    onError: (error) => {
      const code = error.code;
      const message = AUTH_ERROR_MAP[code];
      toast(`${message}!`, {
        position: "top-right",
        type: "error",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });
  return (
    <div className="rounded-t mb-0 px-6 py-6">
      <div className="text-center mb-3">
        <h6 className="text-blueGray-500 text-sm font-bold">Sign in with</h6>
      </div>
      <div className="btn-wrapper text-center">
        <button
          className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
          type="button"
          onClick={() => socialLogin({ provider: githubProvider })}
        >
          <Image alt="..." src="/img/github.svg" width={16} height={16} />
          {"  "}
          Github
        </button>
        <button
          className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
          type="button"
          onClick={() => socialLogin({ provider: googleProvider })}
        >
          <Image alt="..." src="/img/google.svg" width={16} height={16} />
          {"  "}
          Google
        </button>
      </div>
      <hr className="mt-6 border-b-1 border-blueGray-300" />
    </div>
  );
}

export default SocialLogin;
