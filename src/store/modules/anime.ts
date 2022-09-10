import axios from "axios";
import { Module, Commit } from "vuex";
import { Anime, AnimeCharacters, AnimeRequestStatus, AnimeStaff, characterList, defaultAnimeDetails, defaultPagination, paginatedAnimeList, query, Status, staffList } from "../../types/anime";
import { State as Rootstate } from "../index";
import * as ACTIONS from '../types';
import { ModuleRequestQuery } from "../types/anime";

export interface State {
    animeRequestError: string;
    animeRequestStatus: AnimeRequestStatus;
    anime: paginatedAnimeList;
    animeDetail: Anime;
    animeCharacters: characterList;
    animeStaff: staffList
}

const anime: Module<State, Rootstate> = {
    namespaced: true,

    state: () => ({
        animeRequestError: '',
        animeRequestStatus: {
            getAnime: Status.IDLE,
            getAnimeDetails: Status.IDLE,
            getAnimeCharacters: Status.IDLE,
            getAnimeStatistics: Status.IDLE,
            getAnimeStaffs: Status.IDLE,
            getAnimeTrailer: Status.IDLE

        },
        anime: {
            data: [],
            pagination: { ...defaultPagination }
        },

        animeDetail: { ...defaultAnimeDetails },
        animeCharacters: {
            data: []
        },
        animeStaff: {
            data: []
        },

    }),

    mutations: {
        //mutation for anime 
        [ACTIONS.GET_ANIME_LOADING](state: State): void {
            state.animeRequestStatus.getAnime = Status.LOADING;
        },

        [ACTIONS.GET_ANIME_SUCCESS](state: State, anime: paginatedAnimeList): void {
            state.animeRequestStatus.getAnime = Status.SUCCESS;
            state.anime = anime;
        },

        [ACTIONS.GET_ANIME_ERROR](state: State, error: string): void {
            state.animeRequestError = error;
            state.animeRequestStatus.getAnime = Status.ERROR;
        },

        //mutation for anime details
        [ACTIONS.GET_ANIME_DETAILS_LOADING](state: State): void {
            state.animeRequestStatus.getAnimeDetails = Status.LOADING;
        },

        [ACTIONS.GET_ANIME_DETAILS_SUCCESS](state: State, animeDetail: Anime): void {
            state.animeRequestStatus.getAnimeDetails = Status.SUCCESS;
            state.animeDetail = animeDetail;
        },

        [ACTIONS.GET_ANIME_DETAILS_ERROR](state: State, error: string): void {
            state.animeRequestError = error;
            state.animeRequestStatus.getAnimeDetails = Status.ERROR;
        },

        //mutation for anime characters
        [ACTIONS.GET_ANIME_CHARACTERS_LOADING](state: State): void {
            state.animeRequestStatus.getAnimeCharacters = Status.LOADING;
        },

        [ACTIONS.GET_ANIME_CHARACTERS_SUCCESS](state: State, animeCharacters: characterList): void {
            state.animeRequestStatus.getAnimeCharacters = Status.SUCCESS;
            state.animeCharacters.data = animeCharacters.data.filter((element, index) => index < 10);
        },

        [ACTIONS.GET_ANIME_CHARACTERS_ERROR](state: State, error: string): void {
            state.animeRequestError = error;
            state.animeRequestStatus.getAnimeCharacters = Status.ERROR;
        },

        //mutation for anime staffs
        [ACTIONS.GET_ANIME_STAFFS_LOADING](state: State): void {
            state.animeRequestStatus.getAnimeCharacters = Status.LOADING;
        },

        [ACTIONS.GET_ANIME_STAFFS_SUCCESS](state: State, animeStaff: staffList): void {
            state.animeRequestStatus.getAnimeStaffs = Status.SUCCESS;
            state.animeStaff.data = animeStaff.data.filter((element, index) => index < 4);
            console.log("anime staff:", state.animeStaff.data)
        },

        [ACTIONS.GET_ANIME_STAFFS_ERROR](state: State, error: string): void {
            state.animeRequestError = error;
            state.animeRequestStatus.getAnimeStaffs = Status.ERROR;
        },

    },

    actions: {
        async fetchanime({ commit }: { commit: Commit }, { page = 1, limit = "25" }) {
            try {
                ACTIONS.GET_ANIME_LOADING;
                const { data } = await axios.get(
                    `https://api.jikan.moe/v4/anime?page=${page}&?limit=${limit}&order_by=score&sort=desc`
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

        async fetchSingleAnimeCharacters({ commit }: { commit: Commit }, id: number
        ) {
            try {
                ACTIONS.GET_ANIME_LOADING;
                const { data } = await axios.get(
                    `https://api.jikan.moe/v4/anime/${id}/characters`
                );
                commit(ACTIONS.GET_ANIME_CHARACTERS_SUCCESS, data);


            } catch (e) {
                commit(ACTIONS.GET_ANIME_ERROR, "error");
                console.log("error: ", e);
            }

        },

        async fetchSingleAnimeStaffs({ commit }: { commit: Commit }, id: number
        ) {
            try {
                ACTIONS.GET_ANIME_LOADING;
                const { data } = await axios.get(
                    `https://api.jikan.moe/v4/anime/${id}/staff`
                );
                commit(ACTIONS.GET_ANIME_STAFFS_SUCCESS, data);
                console.log("STAFF", data.data)


            } catch (e) {
                commit(ACTIONS.GET_ANIME_STAFFS_ERROR, "error");
                console.log("error: ", e);
            }

        },
    },
};

export default anime;