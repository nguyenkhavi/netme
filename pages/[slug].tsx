import { useRouter } from "next/router";
import Image from "next/image";

import React from "react";
import { useGetChannelsByUserId } from "../services/channel/query";
import { useGetUserProfileBySlug } from "../services/userProfile/query";

const colors = ["#F4F1DE", "#E07A5F", "#81B29A", "#F2CC8F"];

function Button(props) {
  const style = {
    backgroundColor: colors[props.index],
  };

  return (
    <a href={props.url} className="button" style={style}>
      {props.name}
    </a>
  );
}

function LinkTree() {
  const router = useRouter();
  const { slug = "" } = router.query;
  const { data: userProfile } = useGetUserProfileBySlug({ slug: String(slug) });
  const { data: channels = [] } = useGetChannelsByUserId({
    userID: userProfile?.uid,
  });

  return (
    <div className="container-linktree pt-6 bg-background">
      <section className="profile">
        <div className="m-auto w-full sm:w-[300px]">
          <div className="mb-5">
            <div className="profile-picture">
              <Image
                src={userProfile?.photoURL || "/img/team-3-800x800.jpg"}
                alt={userProfile?.displayName}
                width={128}
                height={128}
                className="rounded-full"
              />
            </div>
            <h1 className="profile-fullname text-center">
              {userProfile?.displayName}
              <br />
              (@{slug})
              {/* <IonIcon
              className="profile-fullname-check_mark"
              src={checkmarkCircleSharp}
            /> */}
            </h1>
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
  );
}
export default LinkTree;
