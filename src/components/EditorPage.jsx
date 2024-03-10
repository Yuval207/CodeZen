import { useState } from "react";
import { Editor } from "@monaco-editor/react";

const EditorPage = () => {
  return (
    <div className="flex flex-col">
      {/* Topbar starts*/}
      <div className="flex gap-5">
        <button>Logo</button>
        <button>Problems List</button>
        <button>Run</button>
      </div>
      {/* Topbar ends */}
      <div className="p-10 h-1/2 w-full flex">
        <div className="w-1/2"></div>
        <div className="flex justify-end w-1/2">
          <Editor
            theme="vs-dark"
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
          />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
