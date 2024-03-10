import React from "react";
import { Editor } from "@monaco-editor/react";

const EditorPage = () => {
  return (
    <div className="p-10 h-1/2 w-1/2">
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      />
      ;
    </div>
  );
};

export default Editor;
