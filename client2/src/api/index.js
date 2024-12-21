export const getProblemList = async () => {
  const response = await fetch("http://localhost:3000/problemlist", {
    method: "GET",
  });
  return await response.json();
};

export const getProblemDescription = async (id) => {
  const response = await fetch(
    `http://localhost:3000/problemdescription/${id}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};

export const getCode = async (id, language) => {
  const response = await fetch(
    `http://localhost:3000/code/${id}?language=${language}`,
    {
      method: "GET",
    }
  );
  return await response.json();
};

export const runProgram = async (user_id, code, problem_id) => {
  const payload = {
    user_id: user_id,
    code: code,
    problem_id: problem_id,
  };
  const response = await fetch(`http://localhost:3000/runprogrampy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
};
