import { SET_MOVIE_INFO } from "../types/movieType";

const DEFAULT_STATE = {
  movieDetail: {},
};

const stringify = localStorage.getItem("USER_INFO");

if (stringify) {
  DEFAULT_STATE.movieDetail = JSON.parse(stringify);
}

export const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_MOVIE_INFO:
      state.movieDetail = action.payload;
      break;
    default:
      break;
  }
  return { ...state };
};
