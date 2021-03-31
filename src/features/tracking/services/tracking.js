import axios from "axios";
import { handleErrorStatus } from "../../../helpers/errorHandler";

class TrackingService {
  async getPendingPackages(username) {
    try {
      return {
        data: await tryGetPendingPackages(username),
        error: null,
      };
    } catch (error) {
      return {
        data: [],
        error: handleErrorStatus(error.response.status),
      };
    }
  }
}

const tryGetPendingPackages = async (username) => {
  const response = await axios.get(
    `/api/packages/getPending?username=${username}`
  );

  return response.data;
};

export default new TrackingService();
