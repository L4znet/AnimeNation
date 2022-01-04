<template>
  <section class="main_section ">
    <div class="grid grid-rows-10 grid-flow-col gap-10 flex items-start ">
      <div class="row-span-2 col">
        <div class="col-span-2 flex flex-col">
          <h1 class="text-5xl py-10 font-bold">Le feed</h1>
          <textarea name="" id="" class="w-full h-48 border-4 border-yellow-400 mt-3 rounded-xl px-3 py-3 outline-none font-bold" v-model="message" placeholder="Exprimez-vous..."></textarea>
          <button class="bg-yellow-500 w-2/12 h-11 text-xl font-bold mt-10 rounded-lg hover:bg-yellow-400 cursor-pointer" @click.prevent="publishPost">Poster</button>
        </div>
      </div>
      <div class="row-span-2 col mt-32">
        <div class="col-span-2">
          <post v-for="(post, index) in posts" :message="post.message" :key="index"/>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import post from '../components/post';
import axios from "axios";
export default {
  name: 'Flux',
  components: {
    post
  },
  data() {
    return {
      message:'',
      posts:[]
    }
  },
  methods:{
    publishPost(){
      axios.post('http://apipartiel.local/wp-json/an/v1/feed', {message:this.message}).then((response) => {
      }).catch(() => {
      }).finally(() => {
        this.message = ""
        this.loadPosts()
      })
    },
    loadPosts(){
      axios.get('http://apipartiel.local/wp-json/an/v1/feed').then((response) => {
        this.posts = response.data
      }).catch(() => {
      }).finally(() => {
      })
    }
  },
  created() {
    this.loadPosts()
  }

}
</script>