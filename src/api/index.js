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

export const getCode = async (id) => {
  const response = await fetch(`http://localhost:3000/code/${id}`, {
    method: "GET",
  });
  return await response.json();
};
