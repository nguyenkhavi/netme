import React, { useRef, useState } from "react";
import Image from "next/image";

import Navbar from "../navbars/AuthNavbar";
import Footer from "../footers/Footer";
import { useCreateChannel } from "../services/channel/mutation";
import { TCreateChannel } from "../services/channel/dto";
import { useGetChannelsByUserId } from "../services/channel/query";
import { useGetUserProfile } from "../services/userProfile/query";
import { useCreateUserProfile } from "../services/userProfile/mutation";

import { toast } from "react-toastify";
import { useUploadFile } from "../services/file/mutation";

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const { mutateAsync: uploadFile } = useUploadFile({});
  const { data: userProfile, refetch: refetchUserProfile } = useGetUserProfile({
    onSuccess: (profile) => {
      if (profile?.slug) window.location.hash = profile?.slug;
    },
  });
  const { mutate: updateUserProfile } = useCreateUserProfile({
    onSettled: () => {
      refetchUserProfile();
    },
    onSuccess: () => {
      toast(`New avatar updated!`, {
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
    },
  });

  const { data = [], refetch } = useGetChannelsByUserId({});
  const { mutate: createChannel, isLoading } = useCreateChannel({
    onSuccess: () => {
      toast(`Created successfully!`, {
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
      refetch();
    },
  });

  const [state, setState] = useState<TCreateChannel>({
    title: "",
    url: "",
  });

  const handlePickFile: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    e.preventDefault();
    const file = e.target?.files[0];

    if (!file) return;
    const photoURL = await uploadFile(file);
    updateUserProfile({ photoURL });

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     setProgresspercent(progress);
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       setImgUrl(downloadURL);
    //     });
    //   }
    // );
  };
  const handleChange =
    (name: keyof typeof state) =>
    ({ target }) => {
      setState((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    };
  const handleSubmit = () => {
    createChannel(state);
  };
  const handleAvatarPress = () => {
    inputFile.current.click();
  };
  return (
    <>
      <Navbar />
      <main className="profile-page">
        {showModal ? (
          <>
            <div
              className="w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              // onClick={() => setShowModal(false)}
            >
              <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 px-4 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Create new link</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ??
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="mb-3 mt-3 pt-0">
                      <input
                        type="text"
                        placeholder="Title"
                        className="w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline"
                        value={state.title}
                        onChange={handleChange("title")}
                      />
                    </div>
                    <div className="mb-3 pt-0">
                      <input
                        type="text"
                        placeholder="URL"
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white  rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                        value={state.url}
                        onChange={handleChange("url")}
                      />
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <div className="absolute -m-16 -ml-20 lg:-ml-16 max-w-172-px">
                        <Image
                          alt="..."
                          src={
                            userProfile?.photoURL || "/img/team-2-800x800.jpg"
                          }
                          width={172}
                          height={172}
                          onClick={handleAvatarPress}
                          className="rounded-full cursor-pointer"
                        />
                      </div>
                      <input
                        ref={inputFile}
                        onChange={handlePickFile}
                        type="file"
                        hidden
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Connect
                      </button>
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(true)}
                      >
                        Create new link
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {userProfile?.displayName}
                  </h3>
                  {!!userProfile?.location && (
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                      {userProfile?.location}
                    </div>
                  )}
                  <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    {(userProfile?.jobTitles || []).join(" / ")}
                  </div>
                  <div className="mb-2 text-blueGray-600">
                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                    University of Computer Science
                  </div>
                  <div className="mb-2 text-blueGray-600 flex">
                    {data.map((item) => (
                      <div
                        key={item.ID}
                        className="flex flex-col bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        <h5>{item.title}</h5>
                        <div className="flex items-center text-white">
                          <i className="fas text-xs fa-arrow-pointer mr-1"></i>
                          <p className="text-xs">{item.totalClick || 0}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {userProfile?.bio}
                      </p>
                      {/* <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
