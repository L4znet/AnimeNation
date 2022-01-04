<template>
  <section class="main_section">
    <h1 class="text-5xl py-10 font-bold"> Ce que vous avez vu récemment </h1>
    <div v-if="!getLoadingFollowedState">
      <episodesItems  v-if="getFollowedAnime.latest_episode.length > 0" :animes="getFollowedAnime.latest_episode"/>
      <div v-else class="text-3xl">Aucun épisode vu récemment à afficher</div>
    </div>

    <loading v-else loadingText="Chargement en cours..." width="w-8" styles="text-2xl" parent-styles="text-2xl font-bold"/>
    <h3 class="text-5xl py-10 font-bold">Les animés que vous suivez </h3>
    <div v-if="!getLoadingFollowedState">
      <animeItems v-if="getFollowedAnime.followed.length > 0" :animes="getFollowedAnime.followed"/>
      <div v-else class="text-3xl">Vous ne suivez aucun animé</div>
    </div>
    <loading v-else loadingText="Chargement en cours..." width="w-8" styles="text-2xl" parent-styles="text-2xl font-bold"/>
  </section>
</template>

<script>
import animeItems from '../components/Animes.vue'
import episodesItems from '../components/Episodes'
import loading from '../components/Loading.vue'
import {mapActions, mapGetters} from "vuex";
import axios from "axios";
import router from "../router";
export default {
  name: 'Home',
  data(){
    return{
      animesData: [],
      animesDataFollow: [],
    }
  },
  components: {
    animeItems,
    loading,
    episodesItems
  },
  computed:{
    ...mapGetters(['getFollowedAnime', 'getLoadingFollowedState'])
  },
  methods: {
    ...mapActions(['loadFollowedAnime']),
  },
  created() {
    this.loadFollowedAnime()
  }

}
</script>