<template>
  <header class="w-full bg-yellow-400 h-24 flex items-center justify-between relative">
    <nav class="flex items-center">
      <ul>
        <li class="font-bold mx-12 rounded-3xl h-9 min-w-min w-0 bg-white leading-9 ">
          <router-link class="h-full px-12 flex rounded-3xl hover:bg-yellow-100 cursor-pointer" to="/">Accueil</router-link>
        </li>
      </ul>
      <div class="flex items-center">
        <input v-if="!getLoadingState" type="text" class="w-96 h-11 rounded-3xl pl-7 font-bold outline-none" placeholder="Vous recherchez..." v-model="searchTerm" @keypress.enter="startSearch(searchTerm)">
        <div v-else class="w-96 h-11 rounded-3xl pl-7 font-bold outline-none bg-white flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Recherche en cours...
        </div>
        <ul class="flex">
          <li class="font-bold ml-10 mr-5 rounded-3xl h-9 min-w-min w-auto bg-white leading-9 ">
            <router-link class="h-full px-12 flex rounded-3xl hover:bg-yellow-100 cursor-pointer" to="/most-followed">Afficher les plus suivi</router-link>
          </li>
          <li class="font-bold mr-5 rounded-3xl h-9 min-w-min w-auto bg-white leading-9 ">
            <router-link class="h-full px-12 flex rounded-3xl hover:bg-yellow-100 cursor-pointer" to="/feed">Feed</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <button class="bg-white w-14 h-14 mr-8 rounded-full flex justify-center items-center hover:bg-yellow-100 cursor-pointer" @click.prevent="profilOpened = !profilOpened">
      <img :src="getUserData.avatar" alt="" class="w-48 rounded-full">
    </button>
    <ul v-if="profilOpened" class="absolute bg-yellow-400 right-0 top-32 bg-white py-3 min-h-32 w-80 rounded-xl flex items-center justify-center mr-3 flex-col">
      <h3 class="text-3xl font-bold text-white mb-3 py-1">    {{getUserData[0].data.display_name}}</h3>
      <router-link to="/profil" @click="profilOpened = false" class="w-10/12 bg-white h-14 rounded-xl my-3 justify-center items-center flex font-bold text-xl hover:bg-yellow-100 cursor-pointer">Accéder à mon profil</router-link>
    </ul>

  </header>
  <main>
    <router-view/>
  </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import { onMounted } from 'vue'
import loading from './components/Loading'

export default {
  name:'App',
  data() {
    return {
      profilOpened:false,
      searchTerm:""
    }
  },
  components:{
    loading
  },
  methods:{
    ...mapActions(['search', 'loadUserData']),
    /**
     * Lancer la recherche avec un terme de recherche
     *
     * @param searchTerm
     */
    startSearch(searchTerm){
      this.$store.dispatch('search', searchTerm)
      this.searchTerm = ""
    }
  },
  computed:{
    ...mapGetters(['getLoadingState', 'getUserData'])
  },
  created() {
    this.loadUserData()
  }

}

</script>

<style>
body{
  background-color: #f1f1f1;
}

main{
  display: flex;
  justify-content: center;
}
.main_section{
  width:95%;
}
</style>