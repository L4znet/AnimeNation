import { createStore } from 'vuex'
import router from "../router";
import axios from "axios";

export default createStore({
  state: {
    results:[],
    noResult:false,
    loading:false,
    userData:[],
    followedAnime:[],
    loadingFollowedAnime:''
  },
  mutations: {
    UPDATE_RESULTS(state, payload){
      state.results = payload
    },
    UPDATE_NO_RESULT(state, payload){
      state.noResult = payload
    },
    UPDATE_LOADING(state, payload){
      state.loading = payload
    },
    UPDATE_USER_DATA(state, payload){
      state.userData = payload
    },
    UPDATE_FOLLOWED_ANIME(state, payload){
      state.followedAnime = payload
    },
    UPDATE_LOADING_FOLLOWED_ANIME(state, payload){
      state.loadingFollowedAnime = payload
    },
    UPDATE_ANIME(state, payload){
      state.animes = payload
    },
    UPDATE_EPISODES(state, payload){
      state.episodes = payload
    },
    UPDATE_IS_FOLLOWED_STATE(state, payload){
      state.is_followed = payload
    }
  },
  actions: {
    /**
     * Fonction qui lance la recherche, fonction lancé depuis l'interface
     *
     * @param context
     * @param payload
     */
    search(context, payload){
      context.commit('UPDATE_LOADING', true)
      axios('https://static.charly-e.com/apianime/wp-json/an/v1/anime/list/' + payload, {timeout: 7000}).then((response) => {

        context.commit('UPDATE_RESULTS', {results:response.data.data, searchTerm:payload})
        router.push("/results");
      }).catch((error) => {
        context.commit('UPDATE_LOADING', false)
        if(error.response.status === 404){
          context.commit('UPDATE_RESULTS', {results:[], searchTerm:payload})
          router.push("/results");
        }
      }).finally(() => {
        context.commit('UPDATE_LOADING', false)
      });
    },
    /**
     * Charger les données utilisateurs
     *
     * @param context
     */
    loadUserData(context){
      axios.get('https://static.charly-e.com/apianime/wp-json/an/v1/user/' + 1).then((response) => {
        context.commit('UPDATE_USER_DATA', response.data)
      })
    },
    /**
     * Charger les animés suivi par l'utilisateur
     *
     * @param context
     */
    loadFollowedAnime(context){
      context.commit('UPDATE_LOADING_FOLLOWED_ANIME', true)
      axios.get('https://static.charly-e.com/apianime/wp-json/an/v1/user/1/list').then((response) => {
        context.commit('UPDATE_FOLLOWED_ANIME', response.data)
      }).catch(() => {
        context.commit('UPDATE_LOADING_FOLLOWED_ANIME', false)
      }).finally(() => {
        context.commit('UPDATE_LOADING_FOLLOWED_ANIME', false)
      })
    },



  },
  getters:{
    getResults(state){
      return state.results;
    },
    getLoadingState(state){
      return state.loading;
    },
    getUserData(state){
      return state.userData;
    },
    getFollowedAnime(state){
      return state.followedAnime
    },
    getLoadingFollowedState(state){
      return state.loadingFollowedAnime
    }
  }
})
