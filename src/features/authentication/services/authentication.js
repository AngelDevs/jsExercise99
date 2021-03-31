import axios from "axios";
import { handleErrorStatus } from "../../../helpers/errorHandler";
class AuthService {
  async signUp(username, password) {
    try {
      return await trySignUp(username, password);
    } catch (error) {
      return handleErrorStatus(error.response.status);
    }
  }
}

const trySignUp = async (username, password) => {
  const requestBody = {
    username: username,
    password: password,
  };

  const response = await axios.post("/api/membership/login", requestBody);
  checkSignUpResponse(response.data);
  return response.data;
};

const checkSignUpResponse = (response) => {
  if (response["success"] === false) {
    const unauthorizedError = {
      response: {
        status: 401,
      },
    };
    throw unauthorizedError;
  }
};

export default new AuthService();
