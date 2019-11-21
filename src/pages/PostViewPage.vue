<template>
  <div class="post-view-page">
    propsPost: {{propsPost}}<br />

    <PostView :post="propsPost.post" :index="propsPost.index"/>
    <p></p>
    <router-link :to="{name:'PostEditPage', params: {postId: propsPost.index, post: propsPost.post}}" @click.native="editing">수정</router-link>
    <button type="button" @click="delPost">삭제</button>
    <router-link to="/">목록</router-link>
    <comment-list :comments="propsPost.post.comments" :currentUser="currentUser"
                  @editComment="editComment" @delComment="delComment"></comment-list>
    <comment-form @addCom="addComment"></comment-form>
  </div>
</template>

<script>
import PostView from '@/components/PostView'
import CommentForm from '@/components/CommentForm';
import CommentList from '@/components/CommentList';

export default {
  name: 'PostViewPage',
  components: {
    'PostView': PostView,
    'comment-form': CommentForm,
    'comment-list': CommentList,
  },
  created(){
    console.log("PostViewPage => created called!");

    if(JSON.stringify(this.propsPost) === "{}"){
      this.fetchPropsPost();
    }
    console.log("PostViewPage => propsPost : ", this.propsPost);
  },
  mounted(){
    console.log("PostViewPage -> mounted called!");
      console.log("PostViewPage => mounted => currentUser : ", this.currentUser);
  },
  beforeUpdate(){
    console.log("beforeUpdate");
    console.log("PostViewPage => beforeUpdate => currentUser : ", this.currentUser);
  },
  beforeRouteLeave(to, from, next) {
    console.log("to.params : ", to);
    console.log("from.params : ", from);
    this.$emit('updateEdit', this.propsPost.post.postID);
    next();
  },
  data (){
    return {
      index: 0,
    }
  },
  props: {
    propsPost: {
      type: Object,
    },
    getCurrentTime: {
      type: Function,
    },
    currentUser: {
      type: String,
    }
  },
  methods: {
    fetchPropsPost: function(){
      console.log("PostViewPage => fetchPropsPost called!");
      this.$emit('fetchProps', this.$route.params.postId);
    },
    delPost: function(){
      if(this.currentUser === null){
        alert("로그인이 필요합니다!");
        this.$router.push( {name: 'Signin'} );
        return false;
      } else if(this.currentUser !== this.propsPost.post.name){
        alert("자신의 게시물이 아닌 게시물은 삭제하실 수 없습니다.");
        return false;
      }
      console.log("this.propsPost : ", this.propsPost);
      this.$emit('delPost', this.propsPost.post.postID);
    },
    editing: function(){
      this.$emit('');
    },
    addComment: function(comment){
      if(this.currentUser === null){
        alert("로그인이 필요합니다!");
        this.$router.push( {name: 'Signin'} );
        return false;
      }
      alert("댓글이 성공적으로 작성되었습니다.");
      var author = this.currentUser;
      var content = comment;
      var curTime = this.getCurrentTime();
      var postID = this.propsPost.post.postID;
      var commentID = new Date().getTime();
      this.$emit('addComment', {author: author, content: content, curTime: curTime, commentID: commentID}, postID);
    },
    editComment: function(value){
      alert("댓글이 수정되었습니다.");
      this.$emit('editComment', {...value, postID: this.propsPost.post.postID});
    },
    delComment: function(value){
      alert("댓글이 삭제되었습니다.");
      this.$emit('delComment', {commentID: value, postID: this.propsPost.post.postID});
    }
  },
  computed: {
    computedProps: function(){
      console.log("PostViewPage => computedProps called!");
      console.log("typeof propsPost : ", this.propsPost);
      return this.propsPost.post.comments;
    },
    test: function(){
      console.log("computed test called!");
      return this.index;
    }
  }
}
</script>

<style>

</style>
