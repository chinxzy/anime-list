<script lang="ts">
import { ref, computed, defineComponent, PropType } from "vue";
import { useStore } from "../store/index";
import { State } from "../store/modules/anime";
import { Anime, paginatedAnimeList, Status } from "../types/anime";

export default defineComponent({
  name: "AnimeSection",

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
    items: ["Add to Watchlist", "Set to Watching"],
  }),

  setup() {
    const store = useStore();

    const animeState = computed<State>(() => store.state.anime);
    const anime = computed<Anime>(() => animeState.value.animeDetail);
    const loadingState = ref({
      getAnime: computed<Status>(
        () => animeState.value.animeRequestStatus.getAnime
      ),
    });

    return { store, anime, loadingState, animeState };
  },

  methods: {
    async getSingleAnimes() {
      const id = Number(this.$route.params.id);
      await this.store.dispatch("anime/fetchSingleAnime", id);
      return;
    },
    getFormattedDateFrom() {
      return new Date(this.anime.aired.from).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },

    getFormattedDateTo() {
      if (this.anime.aired.to === null) return "Still Ongoing";
      return new Date(this.anime.aired.to).toLocaleDateString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },

    checkAiringStat() {
      if (this.anime.airing === false) return "Finished Airing";

      if (this.anime.airing === true) return "Ongoing";
    },
    formatNumber() {
      return this.anime.scored_by.toLocaleString("en-US");
    },
  },
  mounted() {
    this.getSingleAnimes();
  },
});
</script>

<template >
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Photos</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>
  <div class="anime">
    <div>
      <v-container class="anime-section__top-div fill-height">
        <v-row no-gutters>
          <v-col cols="4">
            <v-sheet class="ma-2 pa-2 anime-section__top-div">
              <v-img
                class=""
                width="300"
                :aspect-ratio="1"
                :src="anime.images.jpg.image_url"
                cover
              ></v-img>

              <div class="d-flex justify-space-around pa-3 mr-2">
                <v-select
                  :items="items"
                  label="Action"
                  variant="solo"
                ></v-select>
              </div>
              <!-- <div>
                <p>{{ anime.genres[0].name }}</p>
                <p>{{ anime.genres[1].name }}</p>
              </div> -->
            </v-sheet>
          </v-col>

          <v-col cols="8" class="anime-section__top-right-div">
            <v-sheet class="ma-2 pa-2">
              <v-row no-gutters>
                <v-col cols="4">
                  <div>
                    <h4>Score</h4>
                  </div>
                  <h2>{{ anime.score }}</h2>
                  <p>{{ formatNumber() }} users</p>
                </v-col>

                <v-col cols="4">
                  <div>
                    <h4>Ranked</h4>
                  </div>
                  <h2>#{{ anime.rank }}</h2>
                </v-col>

                <v-col cols="4">
                  <div>
                    <h4>Popularity</h4>
                  </div>
                  <h2>#{{ anime.popularity }}</h2>
                </v-col>
              </v-row>
              <div>
                <div><h4>Synopsis</h4></div>
                <p>{{ anime.synopsis }}</p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <v-container class="fill-height">
        <v-row no-gutters>
          <v-col cols="4">
            <v-sheet class="ma-2 pa-2 anime-section__side-div">
              <div>
                <h4>Airing</h4>
                <p>{{ checkAiringStat() }}</p>
              </div>
              <div>
                <h4>Format</h4>
                <p>{{ anime.type }}</p>
              </div>
              <div>
                <h4>Duration</h4>
                <p>{{ anime.duration }}</p>
              </div>
              <div>
                <h4>Status</h4>
                <p>{{ anime.status }}</p>
              </div>
              <div>
                <h4>Start Date</h4>
                <p>{{ getFormattedDateFrom(anime.aired.from) }}</p>
              </div>
              <div>
                <h4>End Date</h4>
                <p>{{ getFormattedDateTo(anime.aired.to) }}</p>
              </div>
              <div>
                <h4>Season</h4>
                <p>{{ anime.season }}</p>
              </div>
              <div>
                <h4>Score</h4>
                <p>{{ anime.score }} (scored by {{ anime.scored_by }} users)</p>
              </div>
              <div>
                <h4>Ranked</h4>
                <p>#{{ anime.rank }}</p>
              </div>
              <div>
                <h4>Favorites</h4>
                <p>{{ anime.favorites }}</p>
              </div>

              <div>
                <h4>Source</h4>
                <p>{{ anime.source }}</p>
              </div>
              <div>
                <h4>English</h4>
                <p>{{ anime.title_english }}</p>
              </div>
              <div>
                <h4>Japanese</h4>
                <p>{{ anime.title_japanese }}</p>
              </div>
            </v-sheet>
          </v-col>

          <v-col cols="8">
            <v-sheet class="ma-2 pa-2">
              <div>
                <h4>Background</h4>
                <p>{{ anime.background }}</p>
              </div>
            </v-sheet>

            <v-sheet class="ma-2 pa-2">
              <div>
                <h4>Characters</h4>
                <p>just</p>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import "src/styles/main.scss";
</style>