<template>
  <section class="w-full flex-wrap flex">
    <episode v-for="(anime, index) in animes" :anime="anime" :key="index"/>
  </section>
</template>

<script>
import episode from './Episode.vue'
export default {
  name: 'Episodes',
  components: {
    episode
  },
  props: ['animes']
}
</script>