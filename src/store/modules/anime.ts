import axios from "axios";
import { Module, Commit } from "vuex";
import { Anime, AnimeCharacters, AnimeRequestStatus, AnimeVoiceCharacters, characterList, defaultAnimeDetails, defaultPagination, paginatedAnimeList, query, Status, voiceCharacterList } from "../../types/anime";
import { State as Rootstate } from "../index";
import * as ACTIONS from '../types';
import { ModuleRequestQuery } from "../types/anime";

export interface State {
    animeRequestError: string;
    animeRequestStatus: AnimeRequestStatus;
    anime: paginatedAnimeList;
    animeDetail: Anime;
    animeCharacters: characterList;
    animeVoiceCharacters: voiceCharacterList
}

const anime: Module<State, Rootstate> = {
    namespaced: true,

    state: () => ({
        animeRequestError: '',
        animeRequestStatus: {
            getAnime: Status.IDLE,

        },
        anime: {
            data: [],
            pagination: { ...defaultPagination }
        },

        animeDetail: { ...defaultAnimeDetails },
        animeCharacters: {
            actors: []
        },
        animeVoiceCharacters: {
            voiceActors: []
        },

    }),

    mutations: {
        [ACTIONS.GET_ANIME_LOADING](state: State): void {
            state.animeRequestStatus.getAnime = Status.LOADING;
        },

        [ACTIONS.GET_ANIME_SUCCESS](state: State, anime: paginatedAnimeList): void {
            console.log('anime response: ', anime)
            state.animeRequestStatus.getAnime = Status.SUCCESS;
            state.anime = anime;
        },

        [ACTIONS.GET_ANIME_DETAILS_SUCCESS](state: State, animeDetail: Anime): void {
            console.log("anime details:", animeDetail)
            state.animeRequestStatus.getAnime = Status.SUCCESS;
            state.animeDetail = animeDetail;
        },

        [ACTIONS.GET_ANIME_ERROR](state: State, error: string): void {
            state.animeRequestError = error;
            state.animeRequestStatus.getAnime = Status.ERROR;
        }
    },

    actions: {
        async fetchanime({ commit }: { commit: Commit }, { page = 1, limit = "25" }) {
            try {
                ACTIONS.GET_ANIME_LOADING;
                const { data } = await axios.get(
                    `https://api.jikan.moe/v4/anime?page=${page}&?limit=${limit}`
                );
                commit(ACTIONS.GET_ANIME_SUCCESS, data);

            } catch (e) {
                commit(ACTIONS.GET_ANIME_ERROR, "error");
                console.log("error: ", e);
            }

        },

        async fetchSingleAnime({ commit }: { commit: Commit }, id: number
        ) {
            try {
                ACTIONS.GET_ANIME_LOADING;
                const { data } = await axios.get(
                    `https://api.jikan.moe/v4/anime/${id}/full`
                );
                commit(ACTIONS.GET_ANIME_DETAILS_SUCCESS, data.data);


            } catch (e) {
                commit(ACTIONS.GET_ANIME_ERROR, "error");
                console.log("error: ", e);
            }

        },
    },
};

export default anime;