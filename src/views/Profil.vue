<template>
  <section class="main_section">
    <div v-if="loading" class="flex justify-center items-center h-96">
      <loading loadingText="Chargement en cours..." width="w-23" styles="text-5xl h-10" parent-styles="text-5xl font-bold"/>
    </div>
    <div v-else>
      <div class="grid grid-rows-4 grid-flow-col gap-8" v-if="!editMode">
        <div class="flex flex-col">
          <div class="col-span-2 flex items-center">
            <h1 class="text-6xl font-bold my-9">Bonjour ! </h1>
            <button class=" ml-6 h-9 bg-yellow-400 px-10 py-1 font-bold rounded-3xl text-xl hover:bg-yellow-300 cursor-pointer" @click.prevent="openEditMode">On passe en mode modification ?</button>
          </div>
          <div class="col-span-2 flex items-center">
            <img :src="getUserData.avatar" alt="" class="w-48 rounded-full">
            <span class="text-5xl font-bold mt-9">{{getUserData[0].data.display_name}} <span class="text-3xl">a k a</span> {{getUserData[0].data.user_nicename}}</span>
          </div>
        </div>
        <div class="row-span-2 col-span-2">
          <ul class="text-3xl">

            <li>Votre adresse e-mail : <b>{{getUserData[0].data.user_email}}</b></li>
            <li>Vous vous êtes inscrit le : <b>{{registrationDate}}</b></li>
            <li>Et vous aimez <strong>{{getUserData.custom_fields[0]}}</strong></li>
          </ul>
          <h3 class="text-5xl my-10 font-bold">Vos réseaux sociaux</h3>
          <ul class="flex items-center">
            <li><a :href="getUserData[0].data.user_url" class="w-14 bg-yellow-400 px-10 py-1 font-bold rounded-3xl text-xl hover:bg-yellow-300 cursor-pointer">Votre site</a></li>
            <li class="ml-6"><a :href="getUserData.custom_fields[1]" class="w-14 bg-yellow-400 px-10 py-1 font-bold rounded-3xl text-xl hover:bg-yellow-300 cursor-pointer">Github</a></li>
            <li class="ml-6"><a :href="getUserData.custom_fields[2]" class="w-14 bg-yellow-400 px-10 py-1 font-bold rounded-3xl text-xl hover:bg-yellow-300 cursor-pointer">Twitter</a></li>
          </ul>
        </div>
      </div>


      <div class="grid grid-rows-4 grid-flow-col gap-8" v-else>
        <div class="flex flex-col">
          <div class="col-span-2 flex items-center">
            <h1 class="text-6xl font-bold my-9">Bonjour, et bienvenue dans le mode modification ! </h1>
            <div class="flex flex-col relative">
              <button class=" ml-6 h-9 bg-yellow-400 px-10 py-1 font-bold rounded-3xl text-xl hover:bg-yellow-300 cursor-pointer " @click.prevent="save()">Retour à la réalité ?</button>

              <span class="font-bold text-md absolute top-10 left-10 w-96">(...et on enregistre les changements au passage)</span>
            </div>
          </div>
          <div class="col-span-2 flex items-center">
            <input type="text" class="w-96 h-24 text-6xl font-bold outline-none" placeholder="Votre nom complet" v-model="userData.fullname">
            <span class="text-5xl h-24 font-bold mt-9 mx-10 ">a k a</span>
            <input type="text" class="w-96 h-24 text-6xl font-bold outline-none" placeholder="Votre adresse-email" v-model="userData.username">
          </div>
        </div>
        <div class="row-span-2 col-span-2">
          <ul class="text-3xl relative">
            <li class="mb-6">Votre adresse e-mail :  <input type="text" class="w-96 h-11 rounded-3xl pl-7 font-bold outline-none" placeholder="Votre adresse e-mail" v-model="userData.email"></li>
            <span class="font-bold text-sm absolute top-12 left-2 w-full">(Si votre adresse e-mail est relié à un compte Gravatar cela changera également votre avatar sur le site.)</span>
            <li class="mt-14">Vous vous êtes inscrit le : <b>{{registrationDate}}</b></li>
            <li class="mt-6">Et vous aimez <input type="text" class="w-96 h-11 rounded-3xl pl-7 font-bold outline-none" placeholder="Votre animé préféré" v-model="userData.socialnetwork[0]"></li>
          </ul>
          <h3 class="text-5xl my-10 font-bold">Vos réseaux sociaux</h3>
          <ul class="flex justify-start flex-col">
            <li class="text-3xl">Votre site : <input type="text" class="w-96 h-11 text-lg rounded-3xl pl-7 font-bold outline-none" placeholder="Votre site" v-model="userData.website"></li>
            <li class="text-3xl mt-6">Votre github : <input type="text" class="w-96 h-11 text-lg rounded-3xl pl-7 font-bold outline-none" placeholder="Votre url github" v-model="userData.socialnetwork[1]"></li>
            <li class=" text-3xl mt-6">Votre twitter : <input type="text" class="w-96 h-11 text-lg rounded-3xl pl-7 font-bold outline-none" placeholder="Votre url twitter" v-model="userData.socialnetwork[2]"></li>
          </ul>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import axios from "axios";
import Loading from '../components/Loading'

export default {
  name: 'Single',
  data(){
    return{
      registrationDate:'',
      editMode:false,
      userData:{},
      loading:false
    }
  },
  components:{
    Loading
  },
  methods:{
    ...mapActions(['loadUserData']),
    loadRegistrationDate(){
      let registrationDate = new Date(this.getUserData[0].data.user_registered);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      this.registrationDate = registrationDate.toLocaleDateString('fr-FR', options)
    },
    save(){
      this.loading = true
      axios.post('http://apipartiel.local/wp-json/an/v1/user/1', this.userData).then((response) => {
      }).catch(() => {
        this.loading = false
      }).finally(() => {
        this.loading = false
        this.editMode = !this.editMode
        this.loadUserDataToFront()
      })
    },
    loadUserDataToFront(){
      this.$store.dispatch('loadUserData')
     this.userData = {
        fullname:this.getUserData[0].data.display_name,
        username:this.getUserData[0].data.user_nicename,
        email:this.getUserData[0].data.user_email,
        socialnetwork:[this.getUserData.custom_fields[0], this.getUserData.custom_fields[1],this.getUserData.custom_fields[2]],
        website:this.getUserData[0].data.user_url,
      }
    },
    openEditMode(){
      this.editMode = !this.editMode
      this.loadUserDataToFront()
    }
  },
  computed:{
    ...mapGetters(['getUserData'])
  },
  mounted() {
    this.loadUserDataToFront()
    this.loadRegistrationDate()
  }
}
</script>