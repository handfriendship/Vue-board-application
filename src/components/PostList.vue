<template>
  <tr>
    <td scope="col">{{index}}</td>
    <td scope="col" @click="link">{{post.title}} [{{post.comments.length}}]</td>
    <td scope="col">{{post.author}}</td>
    <td scope="col">{{post.curTime}}</td>
  </tr>
</template>

<script>
export default {
  props: ['post', 'index'],
  data (){
    return {
      msg: 'Hello World'
    }
  },
  created() {
    console.log("PostList => created called!");
    console.log("PostList => post : ", this.post);
  },
  methods: {
    link: function(){ //, params: {postId: index, post: post}
      console.log("PostList => link called!");
      this.$emit('link', this.post.postID);
      this.$router.push({name: 'PostViewPage', params: {postId: this.index} })
      //<router-link :to="{ name:'PostViewPage', params:{postId: index}}">{{post.title}}[0]</router-link>
    },
    clicktest: function(){
      console.log("clicktest called!");
    }
  }
}
</script>

<style>
tr > td:nth-child(2):hover {cursor: pointer;}
</style>
