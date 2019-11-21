<template>
  <ul class="comments">
    <li v-if="comments.length > 0" v-for="comment in comments">
      <comment-item :comment="comment" :currentUser="currentUser"
                    @editComment="editComment"
                    @delComment="delComment"></comment-item>
    </li>
    <li v-else>
      입력된 댓글이 없습니다.
    </li>
  </ul>
</template>

<script>
import CommentItem from '@/components/CommentItem';

export default {
  name: 'CommentList',
  components: {
    'comment-item': CommentItem,
  },
  props: ['comments', 'currentUser'],
  created() {
    console.log("CommentList created!");
    console.log("CommentList => comments : ", this.comments);
  },
  methods: {
    editComment: function(value){
      this.$emit('editComment', value);
    },
    delComment: function(value){
      this.$emit('delComment', value);
    }
  },
}
</script>

<style>

</style>
