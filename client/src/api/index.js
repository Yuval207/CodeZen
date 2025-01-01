const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

export const getProblemList = async () => {
  const response = await fetch(`${apiEndpoint}/problemlist`, {
    method: "GET",
  });
  return await response.json();
};

export const getProblem = async (id) => {
  const response = await fetch(`${apiEndpoint}/problem/${id}`, {
    method: "GET",
  });
  return await response.json();
};

export const getCode = async (id, language) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found. Please log in.");
  }
  const response = await fetch(
    `${apiEndpoint}/code/${id}?language=${language}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
};

export const runProgram = async (code, problem_id, language) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const payload = {
    code: code,
    problem_id: problem_id,
    mode: "run",
    language: language,
  };
  const response = await fetch(`${apiEndpoint}/runprogrampy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
};

export const submitProgram = async (code, problem_id, language) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const payload = {
    code: code,
    problem_id: problem_id,
    mode: "submit",
    language: language,
  };
  const response = await fetch(`${apiEndpoint}/runprogrampy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
};

export const signupUser = async (userData) => {
  const response = await fetch(`${apiEndpoint}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

export const signInUser = async (userData) => {
  const response = await fetch(`${apiEndpoint}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("authToken", data.token);
    return data;
  } else {
    return data;
  }
};

export const getUserData = async () => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  const response = await fetch(`${apiEndpoint}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return await response.json();
};
