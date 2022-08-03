import Show from "./Show";

interface ShowsListDataFromAPI {
    page: number,
    pages: number,
    total: string,
    tv_shows: Show[]
}

export default ShowsListDataFromAPI;