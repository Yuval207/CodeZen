import React from "react";
import "./ProblemDescription.css";
import Split from "react-split";
import { getProblemDescription } from "../../api/index.js";

import { useState, useEffect } from "react";

const ProblemDescription = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getProblemDescription(props.id).then((problems) => setData(problems));

    // console.log(data);
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

        {/* <div style={{ background: "#333", color: "#fff" }} className="p-4">
          Testcases
          <p>
            <li>case 1</li>
            <li>case 1</li>
            <li>case 1</li>
          </p>
        </div> */}
      </Split>
    </>
  );
};

export default ProblemDescription;
