import { InjectionKey } from "vue";
import {
    createStore,
    useStore as baseUseStore,
    Store,
    createLogger,
} from "vuex";

import anime from "./modules/anime";
import { State as AnimeState } from "./modules/anime";



export type State = {
    anime: AnimeState;
};


export const store = createStore<State>({
    plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
    modules: {
        anime,
    },
});

export const useStore = () => store;