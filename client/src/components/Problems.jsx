import React, { useState, useEffect } from "react";
import { getProblemList } from "../api/index.js";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import "./Problems.css";

const Problems = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getProblemList().then((problems) => setData(problems));
  }, []);

  return (
    <>
      <div className="h-20 px-10 font-mono flex items-center sticky top-0 z-50 bg-gray-800">
        <p className="text-white text-4xl font-bold">
          <NavLink to={"/"}>CodeZen</NavLink>
        </p>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-center">
          <NavLink to={"/"}>
            <Button btnText="Sign Out" />
          </NavLink>
        </div>
      </div>
      <div className="h-screen overflow-y-auto">
        <div className="mt-8 mx-auto w-11/12 lg:w-3/4">
          <div
            style={{ backgroundColor: "#2b2a2b" }}
            className="rounded-lg overflow-hidden"
          >
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-gray-300">Status</th>
                  <th className="px-4 py-3 text-gray-300">Title</th>
                  <th className="px-4 py-3 text-gray-300">Difficulty</th>
                  <th className="px-4 py-2 my-[5%] text-gray-300">Topics</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((e) => (
                    <tr key={e._id} className="border-b border-gray-600">
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          {e.status ? (
                            <p className="text-green-500">Solved</p>
                          ) : (
                            <p className="text-red-500">Unsolved</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          <NavLink
                            to={`/editor/${e._id}`}
                            className="text-blue-500 hover:underline"
                          >
                            {e.title}
                          </NavLink>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          {e.difficulty}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          {e.topics}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-2 text-center text-gray-400"
                    >
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Problems;
