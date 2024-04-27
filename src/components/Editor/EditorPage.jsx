import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { NavLink, useParams } from "react-router-dom";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import "./EditorPage.css";
import { getProblemDescription, getCode, runProgram } from "../../api/index.js";

const EditorPage = () => {
  const [language, setLanguage] = useState("python");
  const params = useParams();
  const problem_id = params.id;

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleRunProgram = (user_id) => {
    // console.log(code);
    runProgram(user_id, code, problem_id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [data, setData] = useState(null);
  useEffect(() => {
    getProblemDescription("65f83c2d9153d14c61eaf1bb").then((problems) =>
      setData(problems)
    );
    // console.log(data);
  }, []);

  const handleEditorChange = (value, event) => {
    setCode(value);
  };

  const [code, setCode] = useState("");
  useEffect(() => {
    getCode("65f83c2d9153d14c61eaf1bb").then((e) => setCode(e.data));
    // console.log(code);
  }, []);

  // useEffect(() => {
  //   console.log(language);
  // }, [language]);

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
        <select value={language} onChange={handleLanguageChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <button
          onClick={() => {
            handleRunProgram(101);
          }}
        >
          Run
        </button>
        <button>Submit</button>
      </div>
      {/* Topbar ends */}
      <div className="flex">
        <Split className="flex">
          <ProblemDescription id={"65f83c2d9153d14c61eaf1bb"} />
          <div className="w-1/2 h-full">
            <Editor
              theme="vs-dark"
              height="100%"
              defaultLanguage={language}
              defaultValue={code}
              onChange={handleEditorChange}
            />
          </div>
        </Split>
      </div>
    </div>
  );
};

export default EditorPage;
