import React, { useEffect } from "react";

function ProfileCard({ coinModal, d }) {
  const userData = {
    name: d?.name,
    username: d?.username,
    followers: 100,
    following: 100,
    generations: d?.generations,
    credits: Number(d?.tokens) / 100000000,
  };

  useEffect(() => {
    console.log(d);
  }, [d]);

  return (
    <article className="flex overflow-hidden flex-col px-9 py-8 text-xl text-white rounded-2xl bg-[#82828285] bg-opacity-50 max-w-[359px]">
      <img
        loading="lazy"
        src={d?.profile_url}
        alt="Profile picture of Aditya Kumar"
        className="object-contain w-full rounded-xl aspect-square"
      />
      <header className="text-center mt-5">
        <h1 className="text-2xl font-bold">{userData.name}</h1>
        <p className="mt-1">@{userData.username}</p>
      </header>
      <section className="flex gap-5 self-center mt-6">
        <p className="grow mr-4 -ml-0.5">{userData.followers} Followers</p>
        <p className="basis-auto">{userData.following} Following</p>
      </section>
      <section className="mt-4">
        <p>{userData.generations} Generations</p>
        <p className="mt-4">{userData.credits} Credits Remaining</p>
      </section>
      <footer className="flex gap-5 justify-between mt-6 text-base font-semibold text-black">
        <button
          onClick={() => {
            coinModal(true);
          }}
          className="overflow-hidden px-6 py-2.5 rounded-md bg-white"
        >
          Buy Credits
        </button>
        <button className="overflow-hidden px-12 py-2.5 whitespace-nowrap rounded-md bg-white">
          Edit
        </button>
      </footer>
    </article>
  );
}

export default ProfileCard;
