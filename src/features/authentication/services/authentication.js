import axios from "axios";

export const login = async (username, password) => {
  const requestBody = {
    username: username,
    password: password,
  };

  console.log(requestBody);
  const response = await axios.post("/api/membership/login", requestBody);

  console.log(response);

  return response.data;
};
