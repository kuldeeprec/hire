import { combineReducers } from "redux";
import Navbar from "./Navbar";
import auth from "./auth";
import student from "./student";
import educator from "./educator";
export default combineReducers({
  Navbar,
  auth,
  student,
  educator,
});
