import React from "react";
import "./ProblemDescription.css";
import Split from "react-split";
import { getProblemDescription } from "../../api/index.js";

import { useState, useEffect } from "react";

const ProblemDescription = (props) => {
  const [data, setData] = useState(null);

  const [istestcase, setIstestcase] = useState(true);

  useEffect(() => {
    getProblemDescription(props.id).then((problems) => setData(problems));
  }, []);

  return (
    <>
      <Split
        className="h-[calc(100vh-50px)]"
        direction="vertical"
        sizes={[100, 0]}
        minSize={60}
      >
        <div
          style={{ background: "#333", color: "#fff" }}
          className="p-4 overflow-auto"
        >
          Problem
          <p className="mb-12">
            {" "}
            {data ? data.problemStatement : <p>Loading...</p>}
          </p>
          <p>
            {data ? (
              data.examples.map((e, idx) => {
                return (
                  <div key={e.id}>
                    <p className="font-semibold mb-[1%]">Example {idx + 1}:</p>
                    <div style={{ fontFamily: "Rajdhani" }} className="">
                      <div className="flex gap-2">
                        <p className="ml-[3%] font-medium">Input:</p>
                        <p className="font-light">{e.Input}</p>
                      </div>
                      <p className="mb-2 ml-[3%] font-medium">
                        Output: {e.Output}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="mt-[5%]">
            <p className="font-semibold mb-[2%]">Constraints:</p>
            {data ? (
              data.constraints.map((e) => {
                return (
                  <div>
                    <li>
                      <p className="mb-[1.5%] bg-gray-500 bg-opacity-90 badge badge-outline">
                        {e}
                      </p>
                    </li>
                  </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </p>
        </div>

        <div
          style={{ background: "#333", color: "#fff" }}
          className="overflow-auto"
        >
          <div className="flex gap-7 bg-gray-700 pl-4 h-12">
            <button
              className={`rounded-xl ${istestcase ? "bg-gray-800" : ""} p-2`}
              onClick={() => {
                setIstestcase(true);
              }}
            >
              Testcases
            </button>
            <button
              className={`rounded-xl p-2 ${istestcase ? "" : "bg-gray-800"}`}
              onClick={() => {
                setIstestcase(false);
              }}
            >
              Test Result
            </button>
          </div>
          <div className="m-4">
            {istestcase ? (
              <div className="flex flex-col">
                <div className="flex gap-7 ">
                  <button>Case 1</button>
                  <button>Case 2</button>
                  <button>Case 3</button>
                </div>

                {data ? (
                  data.testcase.map((e) => {
                    return (
                      <div>
                        {Object.keys(e.input).map((key) => {
                          return (
                            <div>
                              <p className="mt-5">{key} = </p>
                              <div className="mt-2 bg-gray-800 w-full rounded-2xl h-12 p-1 flex pl-4 items-center">
                                {JSON.stringify(e.input[key])}
                                {console.log(e.input[key])}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            ) : (
              <p>Test Result</p>
            )}
          </div>
        </div>
      </Split>
    </>
  );
};

export default ProblemDescription;
