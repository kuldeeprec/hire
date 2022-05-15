import {
  STUDENT_DATA,
  CLEAR_FETCH_STATE,
  FETCH_START,
  FETCH_FAILED,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function fetchStart() {
  return {
    type: FETCH_START,
  };
}
export function fetchFailed(errorMessage) {
  console.log(errorMessage);
  return {
    type: FETCH_FAILED,
    error: errorMessage,
  };
}

export function fetchSuccess(student) {
  return {
    type: STUDENT_DATA,
    student,
  };
}
export function fetchStudent(rollno) {
  let token = localStorage.getItem("token");
  console.log(token);
  return (dispatch) => {
    dispatch(fetchStart());
    const url = APIUrls.fetchStudent(rollno);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(fetchSuccess(data.data.student));
          return;
        }
        dispatch(fetchFailed(data.message));
        return;
      });
  };
}

export function clearFetchState() {
  return {
    type: CLEAR_FETCH_STATE,
  };
}
