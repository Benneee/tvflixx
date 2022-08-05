import Episode from "./Episode";

interface ShowDetail {
    countdown: string | null
    country: string,
    description: string,
    description_source: string | null,
    end_date: string | null,
    episodes: Episode[],
    genres: string[],
    id: number,    
    image_path: string,
    image_thumbnail_path: string,
    name: string,
    network: string,
    permalink: string,
    pictures: string[],
    rating: string,
    rating_count: string,
    runtime: number
    start_date: string
    status: string,
    url: string,
    youtube_link: null
}

export default ShowDetail;