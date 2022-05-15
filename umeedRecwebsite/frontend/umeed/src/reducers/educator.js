import {
  EDUCATOR_DATA,
  CLEAR_FETCH_STATE,
  FETCH_START,
  FETCH_FAILED,
  SET_BATCH,
} from "../actions/actionTypes";
const initialAuthState = {
  educator: [],
  error: null,
  inProgress: false,
  iseducator: false,
  batch: 2023,
};
export default function educator(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_FETCH_STATE:
      return {
        ...state,
        iseducator: false,
        educator: [],
        batch: 2023,
        error: null,
      };
    case FETCH_START:
      return {
        ...state,
        iseducator: false,
        inProgress: true,
      };
    case FETCH_FAILED:
      return {
        ...state,
        inProgress: false,
        iseducator: true,
        error: action.error,
      };
    case EDUCATOR_DATA:
      return {
        ...state,
        educator: action.educator,
        inProgress: false,
        iseducator: true,
        error: null,
      };
    case SET_BATCH:
      return {
        ...state,
        batch: action.batch,
      };

    default:
      return state;
  }
}
