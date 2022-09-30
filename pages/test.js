import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function Test() {
  const [term, setTerm] = useState();

  const detect = (e) => {
    const text = e.target.value;
    setTerm(text);
  };
  return (
    <div>
      <h1 className="text-3xl italic">Hi It's me</h1>
      <form>
        <textarea
          rows="10"
          onChange={(e) => detect(e)}
          placeholder="typehere"
          className="p-2 border border-slate-400 rounded-md my-4 w-full"
        ></textarea>
        <ReactMarkdown parserOptions={{ commonmark: true }}>
          {term}
        </ReactMarkdown>
      </form>
      <small className="italic">
        **Use Backslah for multiple line breaks**
      </small>
    </div>
  );
}

export default Test;
