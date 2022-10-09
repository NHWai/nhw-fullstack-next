// pages/create.tsx

import React, { useState, useEffect } from "react";
import Router from "next/router";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [published, setPublished] = useState(false);

  const toMark = (text) => marked.parse(text, { breaks: true });

  useEffect(() => {
    const now = String(new Date().getTime());
    setCreatedAt(now);
    setUpdatedAt(now);
  }, []);

  const submitData = async (e) => {
    e.preventDefault();
    // TODO
    try {
      const body = { title, content, createdAt, updatedAt, published };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
    // You will implement this next ...
  };

  if (showPreview) {
    return (
      <>
        <div className="prose">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(toMark(content)),
            }}
          ></div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit"
            onClick={() => setShowPreview(false)}
          >
            Back To Editor
          </button>
        </div>
      </>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-6">New Draft</h1>
        <form className=" flex flex-col gap-4" onSubmit={submitData}>
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
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <div className="flex gap-4">
            <button className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit">
              Create
            </button>
            <button className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit">
              <a href="#" onClick={() => Router.push("/")}>
                Cancel
              </a>
            </button>
            <div
              onClick={() => setShowPreview(true)}
              className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit cursor-pointer"
            >
              Preview
            </div>
            <div
              className=" hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs w-fit cursor-pointer"
              onClick={() => setPublished((pre) => !pre)}
            >
              {published ? "Unpublish" : "Publish"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
