export interface AnimeRequestStatus {
    getAnime: Status;
}

export interface query {
    page?: number;
    limit?: number;
    q?: string;
    type?: string;
    status?: string;
}

export const defaultQuery: query = {
    page: 1,
    limit: 25,
    q: '',
    type: '',
    status: '',
}

export enum Status {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    IDLE = 'IDLE'
}

export interface paginatedAnimeList {
    pagination: pagination;
    data: Array<Anime>;
}

export interface characterList {
    actors: Array<AnimeCharacters>
}

export interface voiceCharacterList {
    voiceActors: Array<AnimeVoiceCharacters>
}
export interface pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
        count: number;
        total: number;
        per_page: number
    }
}

export interface Anime {
    mal_id: number;
    airing: boolean;
    scored_by: number;
    images: {
        jpg: {
            image_url: string;
        }
    };
    title_english: string;
    title_japanese: string;
    type: string;
    episodes: number;
    duration: string;
    rating: string;
    synopsis: string;
    background: string;
    aired: {
        from: string,
        to: string
    }
    score: number;
    genres: {
        name: string
    }
}

export interface AnimeCharacters {
    character: {
        images: {
            jpg: {
                image_url: string
            }
            webp: {
                image_url: string;
                small_image_url: string
            }
        }
        name: string
    }
    role: string
}

export interface AnimeVoiceCharacters {
    person: {
        images: {
            jpg: {
                image_url: string
            }
        }
    }
    name: string;
    language: string

}
export const defaultPagination = {
    last_visible_page: 1005,
    has_next_page: true,
    current_page: 1,
    items: {
        count: 25,
        total: 25113,
        per_page: 25
    }
}
export const defaultAnimeDetails = {
    mal_id: 0,
    airing: false,
    scored_by: 0,
    images: {
        jpg: {
            image_url: '',
        }
    },
    title_english: '',
    title_japanese: '',
    type: '',
    episodes: 0,
    duration: '',
    rating: '',
    synopsis: '',
    background: '',
    aired: {
        from: '',
        to: '',
    },
    score: 0,
    genres: {
        name: '',
    }
}



