// pages/drafts.tsx

import React from "react";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import prisma from "../lib/prisma";

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  let draft = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return {
    props: { drafts: draft },
  };
};

const Drafts = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </div>
    );
  }

  if (props.drafts.length == 0) {
    return <div className="text-3xl italic">No drafts so far</div>;
  }
  console.log(props);
  return (
    <div>
      <div className="page">
        <ul className="list-disc flex flex-col gap-2">
          {props.drafts.map((post) => (
            <li key={post.id}>
              <Link href={`/p/${post.id}`}>
                <button>
                  <span className="font-semibold uppercase">{post.title} </span>{" "}
                  <span className="italic ">
                    written by
                    {post.author.name}
                  </span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Drafts;
