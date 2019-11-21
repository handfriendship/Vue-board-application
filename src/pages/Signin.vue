<template>
  <div class="sign-in-page">
    <h3>로그인</h3>
    <SigninForm @login="login"></SigninForm>
    <p>
      회원이 아니신가요? <router-link to="/signup">회원가입 하러가기</router-link>
    </p>
  </div>
</template>

<script>
import SigninForm from '@/components/SigninForm';

export default {
  name: 'Signin',
  components: {
    'SigninForm': SigninForm
  },
  props: {
    emailExist: {
      type: Function,
    },
    pwFetch: {
      type: Function,
    }
  },
  methods: {
    login: function(loginInfo){
      var {email, password} = loginInfo;
      var emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if(email === ""){
        alert("이메일을 입력해주세요.");
      } else if(password === ""){
        alert("비밀번호를 입력해주세요.")
      } else if(!emailCheck.test(email)){
        alert("올바른 이메일 형식이 아닙니다.");
      } else if(!this.emailExist(email)){
        alert("존재하지 않는 이메일입니다.");
      } else if(this.pwFetch(email) != password){
        alert("아이디 또는 비밀번호를 다시 한 번 확인해주세요.");
      } else {
        alert("로그인 되었습니다.");
        this.$emit('signin', loginInfo);
        this.$router.push({name: 'main'});
      }
    },

  }

}
</script>

<style>

</style>
