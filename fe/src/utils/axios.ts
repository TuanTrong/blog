import Axios from "axios";
import userStore from "../store/user";

export default Axios.create({
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${userStore.token}`;
      }
    }
  }
});
