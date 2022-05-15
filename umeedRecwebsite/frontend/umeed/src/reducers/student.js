import {
  STUDENT_DATA,
  CLEAR_FETCH_STATE,
  FETCH_START,
  FETCH_FAILED,
} from "../actions/actionTypes";
const initialAuthState = {
  student: {},
  error: null,
  inProgress: false,
  isStudent: false,
};
export default function student(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_FETCH_STATE:
      return {
        ...state,
        isStudent: false,
        student: {},
        error: null,
      };
    case FETCH_START:
      return {
        ...state,
        isStudent: false,
        inProgress: true,
      };
    case FETCH_FAILED:
      return {
        ...state,
        inProgress: false,
        isStudent: true,
        error: action.error,
      };
    case STUDENT_DATA:
      return {
        ...state,
        student: action.student,
        inProgress: false,
        isStudent: true,
        error: null,
      };
    default:
      return state;
  }
}
