import Axios from "axios";
import userStore from "./cookie";

export default Axios.create({
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${userStore.token}`;
      }
    }
  }
});
