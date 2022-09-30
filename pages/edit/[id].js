import React, { useEffect, useState } from "react";
import Router from "next/router";
import prisma from "../../lib/prisma";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import DOMPurify from "dompurify";
import { marked } from "marked";

const Edit = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  const toMark = (text) => marked.parse(text, { breaks: true });

  useEffect(() => {
    setTitle(title === "" ? toMark(props.title) : title);
    setContent(content === "" ? toMark(props.content) : content);
  }, [preview]);

  const submitData = async (e, id) => {
    e.preventDefault();
    // TODO
    try {
      const body = { title, content };
      await fetch(`/api/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push(`/p/${id}`);
    } catch (error) {
      console.error(error);
    }
    // You will implement this next ...
  };

  if (preview) {
    return (
      <>
        <button
          className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit"
          onClick={() => setPreview(false)}
        >
          Back To Edit
        </button>
        <button className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit">
          Publish
        </button>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></div>
      </>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        <form
          className=" flex flex-col gap-4"
          onSubmit={(e) => submitData(e, props.id)}
        >
          <input
            className="p-2 border-2 border-dark-600 shadow-md"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            className="p-2 border-2 border-dark-600 shadow-md"
            cols={50}
            onChange={(e) => setContent(toMark(e.target.value))}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <div className="flex gap-4">
            <button className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit">
              Edit
            </button>
            <button
              className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit"
              onClick={() => setPreview(true)}
            >
              Preview
            </button>
            <button className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit">
              <a href="#" onClick={() => Router.push("/")}>
                Cancel
              </a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
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
}

export default Edit;
