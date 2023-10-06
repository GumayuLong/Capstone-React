import moment from "moment";

export const formatDate = (date) => moment(date).format("LLL");
export const formatDateAdmin = (date) => moment(date).format("LL");
export const formatTime = (date) => moment(date).format("LT");
export const formatShowDate = (date) => moment(date).format("l");