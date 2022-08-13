import Episode from "./Episode"

// reference: https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
interface SeasonEpisodes { 
    [index: string]: Episode[]
}

export default SeasonEpisodes;