<template>
  <div class="mr-10 mb-16 rounded-2xl w-52 h-72 bg-yellow-400">
    <img :src="anime.image_url" alt="" class="mr-10 rounded-2xl w-52 h-72">
    <strong>Épisode {{anime.id_episode}} : {{anime.episode_title}}</strong>
    <br>
    <span>{{anime.title}}</span>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Anime',
  components: {
  },
  props: ['anime'],
  methods:{
    /**
     * Slugify a string to use in a url
     * @param str
     * @returns {string}
     */
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
    ...mapActions(['updateResult'])
  }
}
</script>