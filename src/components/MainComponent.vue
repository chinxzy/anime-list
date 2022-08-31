<script lang="ts">
import { ref, computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { State } from "../store/modules/anime";
import {
  Anime,
  defaultQuery,
  paginatedAnimeList,
  pagination,
  Status,
} from "../types/anime";

export default defineComponent({
  name: "MainComponent",

  data: () => ({
    width: 400,
    aspectRatio: 16 / 9,
    aspectRatios: [
      {
        title: "16/9",
        value: 16 / 9,
      },
      {
        title: "4/3",
        value: 4 / 3,
      },
      {
        title: "1/1",
        value: 1,
      },
    ],
    query: {
      ...defaultQuery,
    },
  }),

  setup() {
    const store = useStore();

    const animeState = computed<State>(() => store.state.anime);
    const paginationState = computed<State>(() => store.state.anime);
    const animes = computed<Anime[]>(() => animeState.value.anime.data);
    const pagination = computed<pagination>(
      () => paginationState.value.anime.pagination
    );
    const loadingState = ref({
      getAnime: computed<Status>(
        () => animeState.value.animeRequestStatus.getAnime
      ),
    });
    return { store, animes, loadingState, pagination };
  },

  methods: {
    fetchAnime() {
      this.store.dispatch("anime/fetchanime", this.query);
    },
  },

  mounted() {
    this.fetchAnime();
  },
});
</script>

<template>
  <v-app-bar color="primary" density="compact" height="80">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Animes</v-app-bar-title>
    <v-form>
      <v-text-field
        append-inner-icon="mdi-magnify"
        label="find anime"
        variant="outlined"
        clearable="true"
        v-model="query.q"
        @update:modelValue="searchAnime"
      ></v-text-field>
    </v-form>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>

  <div>
    <v-container class="main fill-height">
      <v-row no-gutters>
        <v-col
          v-for="anime in animes"
          :key="anime.id"
          cols="12"
          sm="3"
          width="50%"
        >
          <router-link :to="`/anime/${anime.mal_id}`">
            <v-sheet class="ma-2 pa-2">
              <v-img
                class="bg-dark"
                width="300"
                :aspect-ratio="1"
                :src="anime.images.jpg.image_url"
                cover
              ></v-img>
              <p class="main__anime-title">{{ anime.title }}</p>
            </v-sheet>
          </router-link>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination
          v-model="query.page"
          :length="pagination.last_visible_page"
          @update:modelValue="fetchAnime"
          :rounded="circle"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang='scss'>
@import "src/styles/main.scss";
</style>
