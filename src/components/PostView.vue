<template>
  <div class="post-view">
    <div>
      <h1>{{computedPost.title}}</h1>
      <span>게시물 번호 {{index}}</span>
      <strong v-html="this.post.author + this.middledot + this.post.curTime"></strong>
    </div>
    <p>{{computedPost.content}}</p>
  </div>
</template>

<script>
export default {
  name: 'PostView',
  props: {
    post: {
      type: Object,
    },
    index: {
      type: Number,
    }
  },
  data (){
    return {
      middledot: " &middot; "
    }
  },
  created(){
    console.log("PostView => post : ", this.post);
  },
  computed: {
    computedPost() {
      return this.post;
    }
  }

}
</script>

<style>

</style>
