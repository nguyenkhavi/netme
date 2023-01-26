import React from "react";
const profile = {
  fullname: "Marwan Zaky",
  bio: "Hey! I'm Marwan, I like to code. 👋",
  picture: "https://avatars.githubusercontent.com/u/64248203?v=4",
  socialMedia: [
    {
      name: "Buy me a coffee ☕️",
      url: "https://www.buymeacoffee.com/marwanzaky",
    },
    { name: "Visit my portfolio 🍳", url: "https://marwanzaky.com" },
    { name: "Learn web dev 💻", url: "#" },
    { name: "Visit my github 🤓", url: "https://github.com/marwanzaky" },
    {
      name: "Follow my twitter 💬",
      url: "https://twitter.com/marwan_zaky_dev",
    },
  ],
};

const colors = ["#F4F1DE", "#E07A5F", "#3D405B", "#81B29A", "#F2CC8F"];

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

function Linktree() {
  return (
    <div className="container-linktree pt-6">
      <section className="profile">
        <div className="m-auto w-full sm:w-[300px]">
          <div className="mb-5">
            <div className="profile-picture">
              <img src={profile.picture} alt={profile.name}></img>
            </div>
            <h1 className="profile-fullname">
              {profile.fullname}
              {/* <IonIcon
              className="profile-fullname-check_mark"
              src={checkmarkCircleSharp}
            /> */}
            </h1>
          </div>

          <h1 className="profile-about">About</h1>
          <div className="profile-bio">{profile.bio}</div>

          <div className="social_media flex flex-col">
            {profile.socialMedia.map((el, i) => (
              <Button key={el.name} name={el.name} url={el.url} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Linktree;
