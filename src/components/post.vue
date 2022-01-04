<template>
  <article class="w-8/12 bg-white max-h-36 rounded-lg p-5 font-bold min-h-10 mb-10">
    {{ message }}
  </article>
</template>

<script>
export default {
  name: 'Post',
  props:{
    message:String
  }

}
</script>