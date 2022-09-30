// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  console.log(router.pathname);

  const { data: session, status } = useSession();

  let left = (
    <div>
      <Link href="/">
        <a>Feed</a>
      </Link>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div>
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
      <button className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-sm">
        <Link href="/api/auth/signin">
          <a>Log in</a>
        </Link>
      </button>
    );
  }

  if (session) {
    left = (
      <div className="flex gap-4 font-semibold">
        <Link href="/">
          <a className={`${router.pathname}` === "/drafts" ? "active" : null}>
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
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <div className="gap-5 flex">
          <Link href="/create">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ">
              <a>New post</a>
            </button>
          </Link>
          <button
            className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow "
            onClick={() => signOut()}
          >
            <a>Log out</a>
          </button>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-slate-200 border-b-2 border-b-black-400 p-2  px-4 mb-4 flex justify-between items-center h-[60px]">
      {left}
      {right}
    </nav>
  );
};

export default Header;
