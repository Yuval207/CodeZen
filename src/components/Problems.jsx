import React from "react";
import { getPosts } from "../api";
import { useState, useEffect } from "react";

const Problems = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getPosts().then((posts) => setData(posts));
  }, []);
  return (
    <div className="h-screen bg-blue-950">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Title</th>
              <th>Acceptance</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((e) => (
                <tr className="hover">
                  <th>0</th>
                  <td>{e.title}</td>
                  <td>{e.body}</td>
                  <td>100%</td>
                </tr>
              ))
            ) : (
              <div className="skeleton w-full h-full"></div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problems;
