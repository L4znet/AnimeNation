<template>
  <section class="main_section">
    <h1 v-if="getResults.results.length > 0" class="text-5xl py-10 font-bold">{{ getResults.results.length }} résultats pour "{{ getResults.searchTerm }}"</h1>
    <animeItems v-if="getResults.results.length > 0" :animes="getResults.results"/>
    <p v-else class="text-5xl py-10 font-bold">Nous n'avons pas trouvé de résultat pour "{{ getResults.searchTerm }}"</p>
  </section>
</template>

<script>
import animeItems from '../components/Animes.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Results',
  components: {
    animeItems
  },
  computed:{
  ...mapGetters(['getResults'])
  },

}
</script>