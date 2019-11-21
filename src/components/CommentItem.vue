<template>
  <div class="comment-item">
    <strong>{{comment.author}}</strong><span>{{comment.curTime}}</span>
    <div v-if="isEditing">
      <textarea ref="editingArea"
                rows="3">{{comment.content}}
      </textarea>
      <button @click="editComment">수정완료</button>
    </div>
    <p v-else>{{comment.content}}</p>
    <ul v-if="currentUser !== null">
      <li><button @click="toggleEditing">{{editButton}}</button></li>
      <li><button @click="delComment">삭제</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
    },
    currentUser: {
      type: String,
    }
  },
  data() {
    return {
      isEditing: false,
    }
  },
  created(){
    console.log("CommentItem => created");
    console.log("CommentItem => this.post : ", this.post);
  },
  methods: {
    toggleEditing: function(){
      this.isEditing = !this.isEditing;
    },
    editComment: function(){
      this.isEditing = false;
      this.$emit('editComment', {content: this.$refs.editingArea.value, commentID: this.comment.commentID});
    },
    delComment: function(){
      this.$emit('delComment', this.comment.commentID);
    },
  },
  computed: {
    editButton() {
      return this.isEditing ? "수정 취소" : "수정" ;
    },
  }
}
</script>

<style>

</style>
