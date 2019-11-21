<template>
  <div>
    <form>
      <fieldset>
        <input type="text" v-model="name" placeholder="이름을 입력해주세요."/>
        <input type="text" v-model="email" placeholder="이메일을 입력해주세요."/>
        <input type="password" v-model="password" placeholder="비밀번호를 입력해주세요."/>
        <input type="password" v-model="repassword" placeholder="비밀번호를 다시 입력해주세요." />
        <button type="submit" @click="signup">회원가입</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '', email: '', password: '', repassword: '',
    }
  },
  methods: {
    signup: function(e){
      e.preventDefault();
      var emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

      if(this.name === ''){
        alert("이름을 입력해주세요.");
      } else if(this.email === ''){
        alert("이메일을 입력해주세요.");
      } else if(this.password === ''){
        alert("비밀번호를 입력해주세요.");
      } else if(this.password !== this.repassword){
        alert("비밀번호를 다시 한 번 확인해주세요.");
      } else if(!emailCheck.test(this.email)){
        alert("올바르지 않은 이메일입니다.");
      } else {
        alert("회원가입이 완료되었습니다.");
        var userInfo = {
          name: this.name,
          email: this.email,
          password: this.password,
        }
        this.$emit('signup', userInfo);
      }
    }
  }
}
</script>

<style>

</style>
