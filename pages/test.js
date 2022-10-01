import React, { useState } from "react";

import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

function Test() {
  const [term, setTerm] = useState("");

  const detect = (e) => {
    const text = e.target.value;
    setTerm(text);
  };
  const toMark = (text) => marked.parse(text, { breaks: true });

  return (
    <div>
      <h1 className="text-3xl italic">Hi It&apos;s me</h1>
      <form>
        <textarea
          rows="10"
          onChange={(e) => detect(e)}
          placeholder="typehere"
          className="p-2 border border-slate-400 rounded-md my-4 w-full"
        ></textarea>
      </form>

      <div className="prose">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(toMark(term)),
          }}
        ></div>
      </div>
    </div>
  );
}

export default Test;
