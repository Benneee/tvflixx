import Episode from "./Episode";

interface Show {
    id: number,
    name: string,
    permalink: string,
    url: string,
    description: string,
    country: string,
    status: string,
    network: string,
    image_path: string,
    image_thumbnail_path: string,
    rating: string,
    genres: string[],
    pictures: string[],
    episodes: Episode[],
}

export default Show;