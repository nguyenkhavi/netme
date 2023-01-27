import Image from "next/image";

import React, { useCallback, useMemo } from "react";
import { GetServerSideProps } from "next";
import LinkTreeLayout from "../layouts/LinkTree";
import { getDocs, limit, query, where } from "firebase/firestore";
import { channelColRef, userProfileColRef } from "../services/firebase";
import { TUserProfile } from "../services/userProfile/dto";
import { formatListDocument } from "../helper";
import { TChannel } from "../services/channel/dto";
import FooterSmall from "../footers/FooterSmall";
import { NextSeoProps } from "next-seo";
import { INFO } from "../constants/author";
import { useUpdateChannel } from "../services/channel/mutation";

const colors = Array(10)
  .fill(["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"])
  .flat();

const LinkTree = ({ userProfile, channels }: TProps) => {
  const seoData = useMemo<NextSeoProps>(() => {
    const title = `${userProfile.displayName} | ${channels
      .map((c) => c.title)
      .join(", ")} | ${INFO.PRODUCT}`;
    return {
      title,
      description: title,
      openGraph: {
        url: `https://netme.nkvi.xyz/${userProfile.slug}`,
        title,
        description: title,
        images: [
          {
            url: userProfile.photoURL,
            width: 800,
            height: 600,
            alt: title,
            type: "image/jpeg",
          },
        ],
        siteName: INFO.PRODUCT,
      },
    };
  }, [
    channels,
    userProfile.displayName,
    userProfile.photoURL,
    userProfile.slug,
  ]);
  const { mutate: updateChannel } = useUpdateChannel({});

  const renderItem = useCallback(
    (item: TChannel, index: number) => {
      const style = {
        backgroundColor: colors[index],
        color: colors[index] === "#3D405B" ? "white" : undefined,
      };

      return (
        <a
          key={item.ID}
          href={item.url}
          className="button"
          target="_blank"
          style={style}
          rel="noreferrer"
          onClick={() =>
            updateChannel({
              ID: item.ID,
              totalClick: (item.totalClick || 0) + 1,
            })
          }
        >
          {item.title}
        </a>
      );
    },
    [updateChannel]
  );

  return (
    <LinkTreeLayout seoData={seoData}>
      <div className="container-linktree pt-6">
        <section className="profile">
          <div className="max-w-[300px]">
            <div className="mb-5 text-center">
              <div className="profile-picture">
                <Image
                  src={userProfile?.photoURL || "/img/team-3-800x800.jpg"}
                  alt={userProfile?.displayName}
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
              <h1 className="profile-fullname">
                {userProfile?.displayName}
                {!!userProfile.verified && (
                  <i className="fas fa-circle-check profile-fullname-check_mark"></i>
                )}
              </h1>
              <h2 className="profile-slug">@{userProfile.slug}</h2>
              {!!userProfile?.location && (
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-500 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-500"></i>{" "}
                  {userProfile?.location}
                </div>
              )}
              <div className="profile-bio  mt-2">
                {(userProfile?.jobTitles || []).join(" / ")}
              </div>
            </div>

            <h1 className="profile-about">About</h1>
            <div className="profile-bio">{userProfile?.bio}</div>
            <div className="social_media flex flex-col">
              {channels.map(renderItem)}
            </div>
          </div>
        </section>
      </div>
      <FooterSmall linktree />
    </LinkTreeLayout>
  );
};

type TParams = {
  slug?: string;
};
type TProps = { userProfile: TUserProfile; channels: TChannel[] };

export const getServerSideProps: GetServerSideProps<TProps, TParams> = async (
  context
) => {
  const slug = context.params.slug;
  const userProfileQuery = query(
    userProfileColRef,
    where("slug", "==", slug),
    limit(1)
  );
  const snapshot = await getDocs(userProfileQuery);
  const userProfile = snapshot.docs.length
    ? (snapshot.docs[0].data() as TUserProfile)
    : {};

  let channels: TChannel[] = [];
  if (userProfile.uid) {
    const channelsQuery = query(
      channelColRef,
      where("userID", "==", userProfile.uid)
    );
    const channelsSnapshot = await getDocs(channelsQuery);
    channels = formatListDocument<TChannel[]>(channelsSnapshot);
  }
  return {
    props: {
      userProfile,
      channels,
    },
  };
};
export default LinkTree;
