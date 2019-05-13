import moment from "moment";

export function formatDate(date?: Date): string {
  return moment(date || new Date()).format("dddd MMMM Do, YYYY");
}
