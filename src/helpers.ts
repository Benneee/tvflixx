import moment from "moment";

export const apiURL = "https://www.episodate.com/api";

export function formatDate(date: string): string {
    return moment(date).format('Do MMMM, YYYY')
}

export function formatDateTime(date: string): string {
    return moment(date).format('Do, MMM YYYY, HH:mm a')
}