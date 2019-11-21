<template>
  <div>
    <PostEditForm :post="propsPost.post" @edit="edit"></PostEditForm>
    this.postFromRoute : {{postFromRoute}}
  </div>
</template>

<script>
import PostEditForm from '@/components/PostEditForm';

export default {
  name: 'PostEditPage',
  components: {
    'PostEditForm': PostEditForm,
  },
  props: {
    propsPost: {
      type: Object,
    },
    postFromRoute: {
      type: Object,
    },
  },
  data() {
    return {
      postFromRoute: '',
    }
  },
  created(){
    console.log("PostEditPage => created");
    console.log("PostEditPage => this.$route.params : ", this.$route.params);
    console.log("PostEditPage => this.postFromRoute : ", this.postFromRoute);
    this.postFromRoute = this.$route.params.post;
    if(JSON.stringify(this.propsPost) === "{}"){
      this.fetchPropsPost();
    }
    console.log("propsPost : ", this.propsPost);
  },
  methods: {
    fetchPropsPost: function(){
      this.$emit('fetchEdit', this.$route.params.postId);
    },
    edit: function(payload){
      alert("게시물이 성공적으로 수정되었습니다.");
      var {title, content} = payload;
      var postID = this.propsPost.post.postID;
      var localpost = this.propsPost.post;
      this.$emit('editPost', {...payload, postID});
      this.$router.push({name: 'PostViewPage', params: {postId: this.$route.params.postId, postID: postID} });
    }
  }

}
</script>

<style>

</style>
