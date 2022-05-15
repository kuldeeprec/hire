import {
  EDUCATOR_DATA,
  CLEAR_FETCH_STATE,
  FETCH_START,
  FETCH_FAILED,
  SET_BATCH,
} from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import { getFormBody } from "../helpers/utils";

export function fetchStart() {
  return {
    type: FETCH_START,
  };
}
export function setbatch(batch) {
  return {
    type: SET_BATCH,
    batch,
  };
}
export function fetchFailed(errorMessage) {
  console.log(errorMessage);
  return {
    type: FETCH_FAILED,
    error: errorMessage,
  };
}

export function fetchSuccess(educator) {
  return {
    type: EDUCATOR_DATA,
    educator,
  };
}
export function fetcheducator(batch) {
  return (dispatch) => {
    dispatch(fetchStart());
    const url = APIUrls.fetcheducator(batch);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(fetchSuccess(data.data.educator));
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
