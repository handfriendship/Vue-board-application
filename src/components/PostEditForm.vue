<template>
  <div class="post-edit-page">
    <form>
      <h1>게시물 수정</h1>
      <fieldset>
        <label>게시물 번호</label>
        <input type="text"
              disabled="disabled"
              :value="index">
        <label>게시물 생성일</label>
        <input type="text"
              disabled="disabled"
              :value="computedPost.curTime">
        <label>제목</label>
        <input type="text"
              placeholder="게시물 제목을 입력해주세요."
              v-bind:value="computedPost.title"
              ref="title"/>
        <label>내용</label>
        <textarea row="5"
                  placeholder="게시물 내용을 입력해주세요."
                  v-bind:value="computedPost.content"
                  ref="content">
        </textarea>
        <button type="submit" @click="edit">수정하기</button>
        <router-link :to="{name:'PostViewPage', params:{postId: this.index}}">취소</router-link>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
    },
    msg: {
      type: String,
    }
  },
  data() {
    return {
      index: this.$route.params.postId,
    }
  },
  methods: {
    edit: function(e){
      e.preventDefault();
      var title = this.$refs.title.value;
      var content = this.$refs.content.value;
      this.$emit('edit', {title, content});
    }
  },
  computed: {
    computedPost() {
      return this.post;
    }
  },
}
</script>

<style>

</style>
