import moment from "moment";

export const TableDate = (isoDate: string) => {
  const transactionDate = moment(isoDate).format("DD MMM, YYYY HH:mm");
  return transactionDate;
};
