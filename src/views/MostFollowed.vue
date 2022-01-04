<template>
  <section class="main_section">
    <h1 class="text-5xl py-10 font-bold">Les plus suivi</h1>
    <ul v-if="!loading">
      <li v-for="(top, index) in topAnime" class="w-52">
        <div class="text-6xl py-10 font-bold text-center w-56">{{top.rank}}</div>
        <router-link :to="{ name: 'Single', params: { title: slugify(top.title) + '-' +  top.mal_id }}" class="mr-10 rounded-2xl w-full block bg-yellow-400">
          <img :src="top.image_url" alt="" class="mr-10 rounded-2xl w-52 h-72 hover:opacity-60 cursor-pointer">
        </router-link>
        <h3 class="text-2xl font-bold">{{top.title}}</h3>
      </li>
    </ul>
    <loading v-else loadingText="Chargement en cours..." width="w-8" styles="text-2xl" parent-styles="text-2xl font-bold"/>
  </section>
</template>

<script>
import animeItems from '../components/Animes.vue'
import loading from '../components/Loading.vue'
import { mapGetters } from 'vuex'
import axios from "axios";
export default {
  name: 'MostFollowed',
  data() {
    return {
      topAnime:[],
      loading:false
    }
  },
  components:{
    loading
  },
  methods:{
    loadMostFollowed(){
      this.loading = true
      axios.get('http://apipartiel.local/wp-json/an/v1/anime/most-followed').then((response) => {
        this.topAnime = response.data.top
      }).catch(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },
    slugify(str){
      str = str.replace(/^\s+|\s+$/g, '');
      str = str.toLowerCase();

      let from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
      let to   = "aaaaaeeeeeiiiiooooouuuunc------";
      for (let i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      str = str.replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

      return str;
    },
  },
  created() {
    this.loadMostFollowed()
  }
}
</script>