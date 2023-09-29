import moment from "moment";

export const formatDate = (date) => moment(date).format("LLL");
export const formatDateAdmin = (date) => moment(date).format("LL");
