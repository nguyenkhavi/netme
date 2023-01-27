import Image from "next/image";

import React from "react";
import { GetServerSideProps } from "next";
import { getDocs, limit, query, where } from "firebase/firestore";
import { channelColRef, userProfileColRef } from "../services/firebase";
import { TUserProfile } from "../services/userProfile/dto";
import { formatListDocument } from "../helper";
import { TChannel } from "../services/channel/dto";
import FooterSmall from "../footers/FooterSmall";

const colors = Array(10)
  .fill(["#F4F1DE", "#E07A5F", "#81B29A", "#F2CC8F"])
  .flat();

function Button(props) {
  const style = {
    backgroundColor: colors[props.index],
  };

  return (
    <a
      href={props.url}
      className="button"
      target="_blank"
      style={style}
      rel="noreferrer"
    >
      {props.name}
    </a>
  );
}

const LinkTree = ({ userProfile, channels }: TProps) => {
  return (
    <>
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
                {/* <IonIcon
              className="profile-fullname-check_mark"
              src={checkmarkCircleSharp}
            /> */}
              </h1>
              <h2 className="profile-slug">@{userProfile.slug}</h2>
              <div className="profile-bio  mt-2">
                {(userProfile?.jobTitles || []).join(" / ")}
              </div>
            </div>

            <h1 className="profile-about">About</h1>
            <div className="profile-bio">{userProfile?.bio}</div>
            <div className="social_media flex flex-col">
              {channels.map((el, i) => (
                <Button key={el.ID} name={el.title} url={el.url} index={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <FooterSmall linktree />
    </>
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
    : null;

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
