<template>
  <div class="comment-form">
    <textarea v-model="comment"
              placeholder="댓글을 입력해주세요."/>
    <button type="submit" @click="addCom">등록</button>
  </div>
</template>

<script>
export default {
  name: 'CommentForm',
  data() {
    return {
      comment: '',
    }
  },
  methods: {
    addCom: function(){
      this.$emit('addCom', this.comment);
      this.comment = "";
    }
  }

}
</script>

<style>

</style>
