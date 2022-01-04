<template>

  <section class="main_section">
    <div class="grid grid-rows-3 grid-flow-col gap-4" v-if="loadingContent">
      <div class="text-4xl font-bold mt-9 flex items-center w-30 justify-center">
        <h1>Chargement en cours...</h1>
        <svg class="animate-spin ml-4 mr-3 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    </div>

    <div class="grid grid-rows-10 grid-flow-col gap-10 flex items-start " v-else>
      <div class="row-span-3">
        <img :src="anime.image_url" alt="" class="w-full">
      </div>
      <div class="col-span-2 flex items-end">
        <h1 class="text-6xl font-bold mt-9">{{anime.title}}</h1>
        <ul class="h-full items-center flex ">
          <li v-if="loading" class="cursor-default font-bold mx-10 mb-2 rounded-3xl h-9 px-8 flex items-center min-w-min w-22 bg-yellow-400 leading-9 hover:bg-yellow-300">
            <loading styles="w-5" loadingText="Un instant..."/>
          </li>
          <li v-else :class="[isFollowed ? isFollowedClass : notFollowedClass, 'font-bold mx-10 mb-2 rounded-3xl h-9 px-12 min-w-min leading-9 cursor-pointer']" @click="followAnime">
            {{ isFollowed ? 'Ne plus suivre' : 'Suivre' }}</li>
        </ul>
      </div>

      <div class="col-span-2">
        <p class="text-2xl"> {{anime.synopsis}} </p>
        <div class="row-span-4 flex mt-32 justify-between">
          <div class="col-span-14">
            <h3 class="text-4xl font-bold">Donnez votre avis</h3>
            <form action="" class="flex justify-center flex-col w-96">
              <textarea name="" id="" class="w-full h-48 border-4 border-yellow-400 mt-3 rounded-xl px-3 py-3 outline-none font-bold" v-model="commentToSubmit" placeholder="Que pensez-vous de cet animé ?"></textarea>
              <button class="font-bold mt-8 rounded-3xl h-9 px-12 min-w-min  w-0 bg-yellow-400 leading-9 hover:bg-yellow-300 cursor-pointer" @click.prevent="add_comment({comment:commentToSubmit,user_id: 1,anime_id:anime.mal_id})">Publier</button>
            </form>
            <div class="mt-12">
              <h3 class="text-4xl font-bold">La communauté en parle</h3>
              <ul v-if="anime.comments.count > 0" class="mt-10">
                <li v-for="(comment, index) in anime.comments.comments" :key="index">
                <span class="bg-yellow-400 w-96 min-h-12 h-auto mt-6 rounded-2xl flex px-3 py-3 font-bold mb-3">
                  {{comment.post_content}}
                </span>
                </li>
              </ul>
              <div class="text-2xl mt-6" v-else>
                Pas de commentaires pour le moment..
              </div>
            </div>
          </div>
          <div class="col-span-4">
            <div class="mb-3 flex">
              <h3 class="text-4xl font-bold mb-3">La note globale</h3>
              <span class="text-4xl ml-3"> {{anime.rate}}/20</span>
            </div>
            <div class="">
              <span class="text-2xl font-bold">Notez cet animé </span>
              <input class="w-16 border-4 border-yellow-400 text-4xl ml-10 mr-1 rounded-xl px-3 py-3 outline-none font-bold" v-model="rateToSubmit" placeholder="18">
              <span class="text-4xl font-bold">/20 </span>
            </div>
            <button class="font-bold mt-8 rounded-3xl h-9 px-12 min-w-min  w-0 bg-yellow-400 leading-9 hover:bg-yellow-300 cursor-pointer" @click.prevent="set_rate({rate:rateToSubmit,user_id: 1,anime_id:anime.mal_id})">Noter</button>
          </div>
        </div>
      </div>

      <div class="row-span-3">
        <ul class="w-63 h-full mt-6 mb-10" v-if="episodes.length > 0">
          <li class="flex mt-6 justify-end" v-for="(episode, index) in episodes" :key="index">
            <span class="text-2xl font-bold">Épisode {{episode.episode_id}}</span>
            <div v-if="anime[0].latest_watched !== null && anime[0].latest_watched.id_episode >= episode.episode_id" class="font-bold mx-16 rounded-3xl h-9 px-14 min-w-min w-auto bg-gray-300 leading-9">
              Déjà vu
            </div>
            <button v-else class="font-bold mx-16 rounded-3xl h-9 px-12 min-w-min  w-0 bg-yellow-400 leading-9 hover:bg-yellow-300 cursor-pointer" @click.prevent="set_as_lastest_watched({episode_id:episode.episode_id, user_id:1, anime_id:anime.mal_id, title:anime.title, image_url:anime.image_url, episode_title:episode.title})">
              <span> Regarder</span>
            </button>
          </li>
        </ul>
        <ul class="w-63 h-100 font-bold text-2xl mt-6 mb-10 items-center flex" v-else>
          <li class="flex mt-4">
            Aucun épisode n'a été trouvé pour ce contenu
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import router from "../router";
import axios from "axios";
import Loading from '../components/Loading'
export default {
  name: 'Single',
  components:{
    Loading
  },
  data(){
    return{
      anime:[],
      episodes:[],
      isFollowedClass:"bg-red-500 w-22 hover:bg-red-400 text-white",
      notFollowedClass:"bg-yellow-400 w-0 hover:bg-yellow-300 ",
      loading:false,
      rate:0,
      rateToSubmit:'',
      commentToSubmit:'',
      loadingContent:false,
      isFollowed:false,
      loadingWatchedEpisode:false
    }
  },
  methods:{

    /**
     * Fonction qui se déclenche quand on appuis sur "Suivre" pour suivre un animé.
     *
     */
    followAnime(){
      this.loading = true
      axios.post('https://static.charly-e.com/apianime/wp-json/an/v1/user/1/anime/' + this.anime.mal_id).then((response) => {
        if(response.data === "added"){
          this.isFollowed = true
          this.followedText = "Ne plus suivre"
        } else {
          this.isFollowed = false
          this.followedText = "Suivre"
        }
      }).catch((error) => {
        this.loading = false
      }).finally(() => {
        this.loading = false
      })
    },

    set_as_lastest_watched(params){
      axios.post('https://static.charly-e.com/apianime/wp-json/an/v1/user/'+ params.user_id +'/anime/' + params.anime_id + '/episode/' + params.episode_id, {'title':params.title, 'image_url':params.image_url, 'episode_title':params.episode_title}).then((response) => {
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loadAnime()
      })
    },

    set_rate(params){
      if(!isNaN(params.rate)){
        axios.post('https://static.charly-e.com/apianime/wp-json/an/v1/user/'+ params.user_id +'/anime/' + params.anime_id + '/rate/', {rate:params.rate, title:this.anime.title}).then((response) => {
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.loadAnime()
          this.rateToSubmit = ""
        })
      } else {
        // On retourne une erreur...
      }
    },
    add_comment(params){
      if(params.comment !== ""){
        axios.post('https://static.charly-e.com/apianime/wp-json/an/v1/user/'+ params.user_id +'/anime/' + params.anime_id + '/comment', {comment:params.comment, title:this.anime.title}).then((response) => {
        }).catch((error) => {
          console.log(error)
        }).finally(() => {
          this.loadAnime()
          this.commentToSubmit = ""
        })
      } else {
        // On retourne une erreur...
      }
    },
    loadAnime(){
      let self = this
      this.loadingContent = true
      let params = router.currentRoute._value.params.title.split('-')
      let id = params[params.length - 1]

      const anime = axios.get('https://static.charly-e.com/apianime/wp-json/an/v1/anime/' + id);
      const episodes = axios.get('https://static.charly-e.com/apianime/wp-json/an/v1/anime/' + id + '/episodes');

      axios.all([anime, episodes]).then(axios.spread(function(...responses) {
        self.anime = responses[0].data
        self.episodes = responses[1].data.episodes
      })).finally(() => {
        self.loadingContent = false
        self.isFollowed = this.anime.followed
      });
    },
  },
  computed:{
    ...mapGetters(['getResult', 'getUserData'])
  },
  created() {
    this.loadAnime()
  },


}
</script>

