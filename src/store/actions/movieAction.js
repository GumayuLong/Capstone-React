import { notification } from "antd";
import { movieService } from "../../services/movie";

export const createMovieAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await movieService.fetchMovieCreateApi(formData);
      console.log(result.data.content);
      notification.success({
        message: "Thêm phim thành công",
        placement: "bottomRight",
      });
    } catch (error) {
      console.log(error.response?.data);
      notification.error({
        message: "Thêm phim thất bại",
        placement: "bottomRight",
      });
    }
  };
};

export const getMovieDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await movieService.fetchMovieDetailApi(id);
      console.log(result.data.content);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};
