import moment from "moment";

export function formatDate(
  date?: Date,
  format: string = "dddd MMMM Do, YYYY"
): string {
  return moment(date || new Date()).format(format);
}
