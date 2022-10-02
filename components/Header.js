// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  let left = (
    <div className="text-xl font-semibold">
      <Link href="/">
        <a>Feed</a>
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="text-xl font-semibold">
        <Link href="/">
          <a>Feed</a>
        </Link>
      </div>
    );
    right = (
      <div>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <button className=" hover:bg-gray-100 text-gray-800 font-semibold  p-2 border border-gray-400 rounded shadow text-xs">
        <Link href="/api/auth/signin">
          <a>Log in</a>
        </Link>
      </button>
    );
  }

  if (session) {
    left = (
      <div className="flex gap-4 text-xl font-semibold">
        <Link href="/">
          <a className={`${router.pathname}` === "/drafts" ? "active " : null}>
            Feed
          </a>
        </Link>
        <Link href="/drafts">
          <a className={`${router.pathname}` !== "/drafts" ? "active" : null}>
            My drafts
          </a>
        </Link>

        <style jsx>
          {`
            .active {
              color: grey;
            }
          `}
        </style>
      </div>
    );
    right = (
      <div className="flex gap-5 items-center text-sm">
        <div className="  md:flex items-center justify-center gap-2">
          <div className="rounded-full h-[25px] w-[25px]">
            <picture>
              <source srcSet={session.user.image} type="image/webp" />
              <img
                src={session.user.image}
                className="h-full w-full rounded-full"
                alt="profile"
              />
            </picture>
          </div>
          <p className="hidden md:block text-center">{session.user.name}</p>
        </div>

        <div className="gap-5 flex">
          <Link href="/create">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold p-2 rounded text-xs">
              <a>New post</a>
            </button>
          </Link>
          <button
            className=" hover:bg-gray-100 text-gray-800 font-semibold  px-2 border border-gray-400 rounded shadow text-xs"
            onClick={() => signOut()}
          >
            <a>Log out</a>
          </button>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-slate-200 border-b-2 border-b-black-400 p-2 px-4 mb-4 flex justify-between items-center h-[80px]">
      {left}
      {right}
    </nav>
  );
};

export default Header;
