<template>
  <section class="w-full flex-wrap flex">
    <anime v-for="(anime, index) in animes" :anime="anime" :key="index"/>
  </section>
</template>

<script>
import anime from './Anime.vue'
export default {
  name: 'Animes',
  components: {
    anime
  },
  props: ['animes']
}
</script>