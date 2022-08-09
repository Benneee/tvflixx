import moment from "moment";
import { notify } from "@kyvg/vue3-notification";

import Show from "@/types/Show";



export const apiURL = "https://www.episodate.com/api";

export function formatDate(date: string): string {
    return moment(date).format('Do MMMM, YYYY')
}

export function shorterFormatDate(date: string): string {
    return moment(date).format('Do MMM, YYYY')
}

export function formatDateTime(date: string): string {
    return moment(date).format('Do, MMM YYYY, HH:mm a')
}

export function formatDateFromNow(date: string): string {
    return moment(date).fromNow()
}

export function formatTime(date: string): string {
    return moment(date).format('HH:mm a')
}

export function fetchFavorites(): Show[] {
    const shows: Show[] = localStorage && JSON.parse(localStorage.getItem("tvShows") || "[]");
    return shows;
}

export function isShowAFavorite(showId: number | undefined): boolean {
    const shows: Show[] = fetchFavorites();
    return shows.findIndex((show: Show) => show.id === showId) !== -1;
}

export function addToFavorites(tvShow: Show): void {
    const favoriteShows = [];
    const savedFavorites = fetchFavorites();

    if (savedFavorites.length > 0) {
        const newFavorites: Show[] = [tvShow, ...savedFavorites];
        const noDuplicates: Show[] = newFavorites.filter(
            (v, i, a) => a.findIndex((show) => show.id === v.id) === i,
        );
        localStorage.removeItem("tvShows");
        localStorage.setItem(
            "tvShows",
            JSON.stringify(noDuplicates)
        )
    } else {
        favoriteShows.push(tvShow);
        localStorage.setItem(
            "tvShows",
            JSON.stringify(favoriteShows)
        )
    }

    notify({
        title: "Favorites",
        text: `${tvShow.name} has been added to your favorite TV shows`
    })
}

export function removeFromFavorites(showId: number | undefined): void {
    const favoriteShows: Show[] = fetchFavorites();
    if (favoriteShows.length > 0) {
        const updatedFavorites = favoriteShows.filter(show => show.id !== showId);
        localStorage.removeItem("tvShows");
        localStorage.setItem(
            "tvShows",
            JSON.stringify(updatedFavorites)
        )
    }
}