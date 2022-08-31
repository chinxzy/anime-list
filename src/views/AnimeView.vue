
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import AnimeSection from "../components/AnimeSection.vue";

export default defineComponent({
  name: "HomeView",
  components: { AnimeSection },
  setup() {
    // const store = useStore();
    // const route = useRoute();
    // const id = Number(route.params.id);
    // store.dispatch("anime/fetchSingleAnime", id);
  },
});
</script>

<template>
  <v-app>
    <v-main>
      <anime-section />
    </v-main>
  </v-app>
</template>