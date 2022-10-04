// pages/create.tsx

import React, { useState } from "react";
import Router from "next/router";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e) => {
    e.preventDefault();
    // TODO
    try {
      const createdAt = new Date().getTime();
      const updatedAt = new Date().getTime();
      const body = { title, content, createdAt, updatedAt };
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
