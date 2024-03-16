import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { NavLink } from "react-router-dom";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import "./EditorPage.css";

const EditorPage = () => {
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Topbar starts*/}
      <div className="flex items-center justify-between p-5 bg-black text-white">
        <NavLink to={"/"}>
          <button>Logo</button>
        </NavLink>
        <NavLink to={"/problems"}>
          <button>Problems List</button>
        </NavLink>
        <button>Run</button>
      </div>
      {/* Topbar ends */}
      <div className="flex">
        <Split className="flex">
          <ProblemDescription />
          <div className="w-1/2 h-full">
            <Editor
              theme="vs-dark"
              height="100%"
              defaultLanguage="javascript"
              defaultValue="// some comment"
            />
          </div>
        </Split>
      </div>
    </div>
  );
};

export default EditorPage;
