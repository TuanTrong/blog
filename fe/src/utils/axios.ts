import Axios from "axios";
import { loadToken } from "./cookie";

export default Axios.create({
  headers: {
    Authorization: `Bearer ${loadToken()}`
  }
});
