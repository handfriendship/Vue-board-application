<template>
  <div class="post-create-page">
    <form>
      <fieldset>
        <h1>게시물 작성하기</h1>
        <label>제목</label>
        <input type="text"
              placeholder="게시물 제목을 입력해주세요."
              v-model="title"/>
        <label>내용</label>
        <textarea placeholder="게시물 내용을 입력해주세요."
                  v-model="content">
        </textarea>
        <button type="submit" @click="register">작성하기</button>
        <router-link to="/">취소</router-link>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data (){
    return {
      title: '', content: '',
    }
  },
  methods: {
    register: function(e){
      e.preventDefault();
      var title = this.title;
      var content = this.content;
      if(title === ""){
        alert("게시물 제목을 입력해주세요.");
      } else if(content === ""){
        alert("게시물 내용을 입력해주세요.");
      } else {
        alert("게시물이 성공적으로 작성되었습니다.");
        this.$emit('register', {title, content});
        // this.$router.push('/post/:postID');
        this.$router.push('/');
        // location.reload();
      }
    }
  }
}
</script>

<style>

</style>
