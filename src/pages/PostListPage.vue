<template>
  <div class="post-list-page">
    <h1>포스트 게시글</h1>
    <div>
      <table>
        <colgroup>
          <col style="width: 10%;"/>
          <col style="width: 60%;"/>
          <col style="width: 10%;"/>
          <col style="width: 20%;"/>
        </colgroup>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody v-for="post in posts">
          <PostList @link="linkProps" v-bind:post="post" v-bind:index="getIndex(post)"></PostList>
        </tbody>
      </table>
    </div>
    <router-link :to="{path: '/post/create'}"><a>글쓰기</a></router-link>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue';

export default {
  name: 'PostListPage',
  components: {
    'PostList': PostList,
  },
  props: {
    posts: {
      type: Array,
    }
  },
  created() {
    // console.log("PostListPage => posts : ", this.posts);
  },
  methods: {
    getIndex: function(post){
      return this.posts.indexOf(post);
    },
    linkProps: function(postID){
      this.$emit('linkProps', postID);
    }
  },
  computed: {

  }

}
</script>

<style>

</style>
