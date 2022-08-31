
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { store } from "../store";
import { useStore } from "vuex";
import { State } from "../store/modules/anime";
import { Anime, paginatedAnimeList, Status } from "../types/anime";
import MainComponent from "../components/MainComponent.vue";

export default defineComponent({
  name: "HomeView",
  components: { MainComponent },
  setup() {},
});
</script>

<template>
  <v-app>
    <v-main>
      <main-component />
    </v-main>
  </v-app>
</template>