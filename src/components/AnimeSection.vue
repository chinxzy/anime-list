<script lang="ts">
import { ref, computed, defineComponent, PropType } from "vue";
import { useStore } from "../store/index";
import { State } from "../store/modules/anime";
import {
  Anime,
  AnimeCharacters,
  AnimeStaff,
  AnimeVoiceCharacters,
  characterList,
  paginatedAnimeList,
  Status,
} from "../types/anime";

export default defineComponent({
  name: "AnimeSection",

  data: () => ({
    items: ["Add to Watchlist", "Set to Watching"],
  }),

  setup() {
    const store = useStore();
    console.log(store);

    const animeState = computed<State>(() => store.state.anime);

    const anime = computed<Anime>(() => animeState.value.animeDetail);

    const characters = computed<AnimeCharacters[]>(
      () => animeState.value.animeCharacters.data
    );

    const staffs = computed<AnimeStaff[]>(
      () => animeState.value.animeStaff.data
    );

    const loadingState = ref({
      getAnime: computed<Status>(
        () => animeState.value.animeRequestStatus.getAnime
      ),

      getAnimeDetails: computed<Status>(
        () => animeState.value.animeRequestStatus.getAnimeDetails
      ),

      getAnimeCharacters: computed<Status>(
        () => animeState.value.animeRequestStatus.getAnimeCharacters
      ),

      getAnimeStaffs: computed<Status>(
        () => animeState.value.animeRequestStatus.getAnimeStaffs
      ),
    });

    return { store, anime, loadingState, animeState, characters, staffs };
  },

  methods: {
    async getSingleAnimes() {
      const id = Number(this.$route.params.id);
      await this.store.dispatch("anime/fetchSingleAnime", id);
      return;
    },

    async getSingleAnimesCharacter() {
      const id = Number(this.$route.params.id);
      await this.store.dispatch("anime/fetchSingleAnimeCharacters", id);
      return;
    },

    async getSingleAnimeStaff() {
      const id = Number(this.$route.params.id);
      await this.store.dispatch("anime/fetchSingleAnimeStaffs", id);
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

    getJapaneseVoiceActor(voiceActors: AnimeVoiceCharacters[]): string {
      const actor = voiceActors.find(
        (actor) => actor.language.toLocaleLowerCase() === "japanese"
      );
      if (actor) {
        return actor.language;
      }
      return "";
    },

    getJapaneseVoiceActorName(voiceActors: AnimeVoiceCharacters[]): string {
      const actor = voiceActors.find(
        (actor) => actor.language.toLocaleLowerCase() === "japanese"
      );
      if (actor) {
        return actor.person.name;
      }
      return "";
    },

    // getJapaneseVoiceActorImage(voiceActors: AnimeVoiceCharacters[]): string {
    //   const actor = voiceActors.find(
    //     (actor) => actor.language.toLocaleLowerCase() === "japanese"
    //   );
    //   if (actor) {
    //     return actor.person.images.jpg.image_url;
    //   }
    //   return "";
    // },
  },
  mounted() {
    this.getSingleAnimes();
    this.getSingleAnimesCharacter();
    this.getSingleAnimeStaff();
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
          <v-col cols="3">
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

          <v-col cols="9">
            <v-sheet class="ma-2 pa-2">
              <div>
                <h4>Background</h4>
                <p>{{ anime.background }}</p>
              </div>
            </v-sheet>

            <v-sheet class="mt-2 pa-2 anime-section__character-div">
              <div>
                <h3>Characters</h3>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="6"
                    v-for="item in characters"
                    :key="item.character.mal_id"
                  >
                    <v-sheet
                      height="180"
                      class="mb-2 mr-3 pa-2 anime-section__character-div__row"
                    >
                      <v-row no-gutters>
                        <v-col cols="6">
                          <v-sheet
                            class="anime-section__character-div__colleft"
                          >
                            <v-img
                              class="bg-dark"
                              width="100"
                              :aspect-ratio="1"
                              :src="item.character.images.jpg.image_url"
                              cover
                            ></v-img>
                            <h4>{{ item.character.name }}</h4>
                            <p>{{ item.role }}</p>
                          </v-sheet>
                        </v-col>

                        <v-col
                          cols="6"
                          class="
                            anime-section__character-div__colright
                            d-flex
                            justify-end
                          "
                        >
                          <v-sheet width="100">
                            <v-img
                              class="bg-dark"
                              width="100"
                              :aspect-ratio="1"
                              :src="
                                getJapaneseVoiceActorImage(item.voice_actors)
                              "
                              cover
                            ></v-img>
                            <h4>
                              {{ getJapaneseVoiceActorName(item.voice_actors) }}
                            </h4>
                            <p>
                              {{ getJapaneseVoiceActor(item.voice_actors) }}
                            </p>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>

            <v-sheet class="mt-2 pa-2 anime-section__character-div">
              <div>
                <h3>Staffs</h3>
                <v-row no-gutters>
                  <v-col
                    cols="12"
                    sm="6"
                    v-for="item in staffs"
                    :key="item.person.mal_id"
                  >
                    <v-sheet
                      height="180"
                      class="mb-2 mr-3 pa-2 anime-section__character-div__row"
                    >
                      <v-row no-gutters>
                        <v-col v-for="n in 2" :key="n" cols="12" sm="6">
                          <v-sheet
                            class="anime-section__character-div__colleft"
                          >
                            <v-img
                              class="bg-dark"
                              width="100"
                              :aspect-ratio="1"
                              :src="item.person.images.jpg.image_url"
                              cover
                            ></v-img>
                            <h4>{{ item.person.name }}</h4>
                            <p>{{ item.position }}</p>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>
                </v-row>
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