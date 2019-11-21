<template>
  <div class="app-header">
    <h1 @click="homeBtn">VueJS Community</h1>
    <div v-if="currentUser !== null">
      <strong>
        <button @click="toggle">{{ currentUser }} 님 환영합니다.
          <i v-if="!isActive" class="fas fa-sort-down"></i>
          <i v-else class="fas fa-sort-up"></i>
        </button>
      </strong>
      <ul v-if="isActive">
        <li><button @click="signout">로그아웃</button></li>
      </ul>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Signin' }">로그인</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isActive: false,
    }
  },
  props: {
    currentUser: {
      type: String,
    }
  },
  methods: {
    signout: function(){
      this.$emit('signout');
      this.isActive = false;
    },
    toggle: function(){
      this.isActive = !this.isActive;
    },
    homeBtn: function(){
      this.$router.push({name: 'main',})
    }
  }
}
</script>

<style>

</style>
