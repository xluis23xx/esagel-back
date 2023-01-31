import moment from 'moment';

export const setFormatDate = ({ order = 0, date, separator = "-" }) => {
  if (date) {
    const convertDate = date ? new Date(date) : "";
    const year = convertDate ? convertDate.getFullYear() : "";
    let month = convertDate ? convertDate.getMonth() + 1 : "";
    if (month < 10) {
      month = `0${month}`;
    }
    let day = convertDate ? convertDate.getDate() : "";
    if (day < 10) {
      day = `0${day}`;
    }
    if (order === 0) {
      return year && month && day
        ? `${day}${separator}${month}${separator}${year}`
        : "";
    }
    if (order === 1) {
      return year && month && day
        ? `${year}${separator}${month}${separator}${day}`
        : "";
    }
  }
  return "";
};

export const generateUTCToLimaDate = () => {
  const date = new Date(
    moment
      .utc()
      .add(-(5 * 60 * 60 * 1000))
      .toString()
  );
  return date;
};
