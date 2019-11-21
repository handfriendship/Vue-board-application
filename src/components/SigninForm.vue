<template>
  <form>
    <fieldset>
      <input type="text"
            v-model="email"
            placeholder="이메일을 입력해주세요."/>
      <input  type="text"
              v-model="password"
              placeholder="비밀번호를 입력해주세요."/>
      <button type="submit" @click="login">로그인</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  data (){
    return {
      email: '', password: '',
    }
  },
  methods: {
    login: function(e){
      e.preventDefault();
      var email = this.email;
      var password = this.password;
      this.$emit('login', {email, password});
    }
  }
}
</script>

<style>

</style>
