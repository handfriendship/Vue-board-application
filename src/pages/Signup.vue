<template>
  <div class="sign-up-page">
    <h3>회원가입</h3>
    <SignupForm @signup="signup"></SignupForm>
    <p>
      이미 가입하셨나요? <router-link to="/signin">로그인 하러가기</router-link>
    </p>
  </div>
</template>

<script>
import SignupForm from '@/components/SignupForm'

export default {
  name: 'Signup',
  components: {
    'SignupForm': SignupForm
  },
  methods: {
    signup: function(payload){
      var userID = new Date().getTime();

      this.$emit('signup', {...payload, userID: userID, authorized: false});
      this.$router.push({name: 'Signin' });
    }
  }

}
</script>

<style>

</style>
