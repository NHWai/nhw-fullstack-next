import prisma from "../../lib/prisma";
import Link from "next/link";
import Router from "next/router";
import { useSession } from "next-auth/react";

async function publishPost(id) {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

const unpublishPost = async (id) => {
  await fetch(`/api/unpublish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
};

const deletePost = async (id) => {
  await fetch(`/api/delete/${id}`, {
    method: "Delete",
  });

  await Router.push("/");
};

function Feed(props) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = session;
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <div>
      <div className="max-w-[600px]">
        <h2 className="text-2xl font-bold uppercase">{title}</h2>
        <p className="pt-4">{props.content}</p>
        <div className="mb-4 italic text-sm font-semibold text-right">
          By {props?.author?.name || "Unknown author"}
          <div className="text-[9px]">{props?.author?.email}</div>
        </div>
      </div>
      <div className="w-8/12 flex gap-5">
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button
            className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs"
            onClick={() => publishPost(props.id)}
          >
            Publish
          </button>
        )}
        {props.published && userHasValidSession && postBelongsToUser && (
          <button
            className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs"
            onClick={() => unpublishPost(props.id)}
          >
            Unpublish
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <>
            <button
              className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs"
              onClick={() => deletePost(props.id)}
            >
              Delete
            </button>
            <button className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs">
              <Link href={`/edit/${props.id}`}>Edit</Link>
            </button>
          </>
        )}

        <button className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs">
          <Link href="/">Back Home</Link>
        </button>
      </div>
    </div>
  );
}

export default Feed;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const post = await prisma.post.findFirst({
    where: {
      id: +params?.id, //plus sign is changing string type to integer type
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};
