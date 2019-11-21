<template>
  <div id="app">
    <AppHeader @signout="signout"
                :currentUser="currentUser"></AppHeader>
    <router-view name="list" v-bind:posts="posts" @linkProps="updateProps"/>
    <router-view name="signin" :emailExist="emailExist" :pwFetch="pwFetch"
                  @signin="signin"/>
    <router-view name="signup"
                  @signup="signup"/>
    <router-view name="create" v-bind:propsdata="msg" :posts="posts" :getCurrentTime="getCurrentTime"
                  @postRegister="postRegister" />
    <router-view name="view" @delPost="delPost" @updateProps="updateProps" @fetchProps="fetchProps"
                  @updateEdit="updateEdit" @addComment="addComment" @editComment="editComment"
                  @delComment="delComment"
                  :propsPost="propsForView" :getCurrentTime="getCurrentTime" :currentUser="currentUser"
                  ></router-view>
    <router-view name="edit" :msg="msg" :propsPost="propsForEdit"
                  @editPost="editPost" @fetchEdit="fetchEdit"></router-view>
    <router-view></router-view>
    <button type="button" @click="clearLocalstorage">clear localStorage</button>
    <br/>this.users : {{users}}
    <br/> this.currentUser : {{currentUser}}
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import PostCreatePage from '@/pages/PostCreatePage'
import PostListPage from '@/pages/PostListPage';
import axios from 'axios';
import api from '@/api'

export default {
  name: 'App',
  components: {
    'PostCreatePage': PostCreatePage,
    'PostListPage': PostListPage,
    'AppHeader': AppHeader,
  },
  created(){
    console.log("App => created called!");
    this.fetchPosts();
  },
  data (){
    return {
      msg: 'Hello World', posts: [], propsForView: {}, propsForEdit: {},
      users: JSON.parse(localStorage.getItem('users')),

    }
  },
  beforeRouteLeave(to, from, next){
    console.log("App -> beforeRouteLeave called!");
  },
  methods: {
    postRegister: function(payload){
      var {title, content, time, author, postID} = payload;
      localStorage.setItem(title, JSON.stringify(payload));
      this.posts.unshift(payload);
    },
    fetchPosts: function(){
      if(localStorage.length > 0){
        for (var i = 0; i < localStorage.length; i++ ) {
          if(localStorage.getItem(localStorage.key(i)) != "WARN" && localStorage.key(i) != "users" ){
            this.posts.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
          }
        }
      }
      if(this.posts.length >= 2){
        this.posts.sort(function(a, b){
          return a.postID > b.postID ? -1 : a.postID < b.postID ? 1 : 0;
        });
      }
    },
    delPost: function(postID){
      alert("게시물이 성공적으로 삭제되었습니다.");

      for (var i = 0; i < localStorage.length; i++ ) {
        if(localStorage.getItem(localStorage.key(i)) != "WARN" && localStorage.key(i) != "users"){
          var value = JSON.parse(localStorage.getItem(localStorage.key(i)));
          if(value.postID === postID){
            localStorage.removeItem(localStorage.key(i));
            this.posts.splice(this.posts.findIndex(element => element.postID === postID), 1);
          }
        }
      }
      console.log("after deleted : ", this.posts);
      this.$router.push('/');
    },
    editPost: function(title_content){
      console.log("App => editPost");
      var {title, content, postID} = title_content;
      var targetIndex = this.posts.findIndex(element => element.postID === postID);
      this.posts[targetIndex] = {...this.posts[targetIndex], title: title, content: content};

      for (var i = 0; i < localStorage.length; i++ ) {
        if(localStorage.getItem(localStorage.key(i)) != "WARN" && localStorage.key(i) != "users"){
          var value = JSON.parse(localStorage.getItem(localStorage.key(i)));
          if(value.postID === postID){
            localStorage.setItem(localStorage.key(i), JSON.stringify({...this.posts[targetIndex], title: title, content: content}));
            this.posts[targetIndex] = {...this.posts[targetIndex], title: title, content: content};
          }
        }
      }
      this.propsForView = {post: this.posts[targetIndex], index: parseInt(targetIndex) };
    },
    clearLocalstorage: function(){
      localStorage.clear();
    },
    getTargetByID: function(postID){
      return this.posts.findIndex(element => element.postID === postID);
    },
    updateEdit: function(postID){
      console.log("App => updateEdit called!");
      if(postID > 1000000000000){
        var targetIndex = this.getTargetByID(postID);
      } else {
        var targetIndex = postID;
      }
      this.propsForEdit = { post:this.posts[targetIndex], index:parseInt(targetIndex) };
    },
    updateProps: function(postID){
      console.log("App => updateProps");
      var targetIndex = this.posts.findIndex(element => element.postID === postID);
      this.propsForView = { post:this.posts[targetIndex], index:parseInt(targetIndex) };
    },
    fetchEdit: function(index){
      console.log("App => fetchEdit called!");
      this.propsForEdit = { post: this.posts[index], index:parseInt(index)};
    },
    fetchProps: function(index){
      console.log("App => fetchProps called!");
      this.propsForView = { post: this.posts[index], index:parseInt(index)};
    },
    addComment: function(comment, postID){
      if(!this.currentUser){
        alert("로그인이 필요합니다!");
        return false;
      }
      var targetIndex = this.posts.findIndex(element => element.postID === postID);
      var tempArr = [...this.posts[targetIndex].comments];
      tempArr.push(comment);

      for (var i = 0; i < localStorage.length; i++ ) {
        if(localStorage.getItem(localStorage.key(i)) != "WARN" && localStorage.key(i) != "users"){
          var value = JSON.parse(localStorage.getItem(localStorage.key(i)));
          if(value.postID === postID){
            localStorage.setItem(localStorage.key(i), JSON.stringify({...this.posts[targetIndex],
              comments: tempArr}));
            this.posts[targetIndex] = {...this.posts[targetIndex],
              comments: tempArr};
          }
        }
      }
      this.updateProps(postID);
    },
    editComment: function(payload){
      var {content, commentID, postID} = payload;
      var targetIndex = this.posts.findIndex(element => element.postID === postID);
      for (var i = 0; i < localStorage.length; i++ ) {
        if(localStorage.getItem(localStorage.key(i)) != "WARN" && localStorage.key(i) != "users"){
          var value = JSON.parse(localStorage.getItem(localStorage.key(i))); // 이게 posts 안에 있는 post 하나하나임.
          for(var j=0;j<value.comments.length;j++){
            var commentIndex = value.comments.findIndex(element => element.commentID === commentID);

            if(value.comments[j].commentID === commentID){
              var tempComment = [...this.posts[targetIndex]["comments"]];
              tempComment[commentIndex]["content"] = content;

              localStorage.setItem(localStorage.key(i), JSON.stringify({...this.posts[targetIndex],
                comments: [...tempComment]}));
              this.posts[targetIndex]["comments"][commentIndex]["content"] = content;
            }
          }
        }
      }
      this.updateProps(postID);
    },
    delComment: function(payload){
      console.log("App => delComment => payload : ", payload);
      var {postID, commentID} = payload;
      var targetIndex = this.posts.findIndex(element => element.postID === postID);
      for (var i = 0; i < localStorage.length; i++ ) {
        if(localStorage.getItem(localStorage.key(i)) != "WARN" && localStorage.key(i) != "users"){
          var value = JSON.parse(localStorage.getItem(localStorage.key(i))); // 이게 posts 안에 있는 post 하나하나임.
          for(var j=0;j<value.comments.length;j++){
            var commentIndex = value.comments.findIndex(element => element.commentID === commentID);

            if(value.comments[j].commentID === commentID){
              var tempComment = [...this.posts[targetIndex]["comments"]];
              tempComment.splice(commentIndex, 1);

              localStorage.setItem(localStorage.key(i), JSON.stringify({...this.posts[targetIndex],
                comments: [...tempComment]}));
              this.posts[targetIndex]["comments"].splice(commentIndex, 1);
            }
          }
        }
      }
      this.updateProps(postID);
    },
    getCurrentTime: function(){
      var current = new Date();
      console.log("current : ", current);
      var curYear = current.getFullYear();
      var curMonth = current.getMonth() + 1;
      var curDate = current.getDate();
      var curHour = current.getHours();

      var curMin = current.getMinutes();
      if(curDate < 10){
        curDate = `0${curDate}`;
      }
      if( curMin < 10){
        curMin = `0${curMin}`;
      }
      if(curHour < 10) {curHour = `0${curHour}`};

      var curTime = `${curYear}-${curMonth}-${curDate} ${curHour}:${curMin}`;
      console.log("curTime : ", curTime);
      return curTime;
    },
    signup: function(userInfo){
      var {name, email, password, userID, authorized} = userInfo;
      var tempUsers = {...this.users};
      tempUsers[userID] = userInfo;

      localStorage.setItem('users', JSON.stringify(tempUsers));
      this.users = {...tempUsers};
      console.log("App => this.users : ", this.users);
    },
    signin: function(loginInfo){
      console.log("App -> signin called");
      var {email, password} = loginInfo;
      for(var user in this.users){
        if(this.users[user]["email"] === email && this.users[user]["password"] === password){
          var targetID = user;
        }
      }
      var tempObj = {...this.users[targetID], authorized:true};
      console.log("App -> tempObj : ", tempObj);
      var tempUsers = {...this.users};
      tempUsers[targetID] = tempObj;
      console.log("App -> tempUsers : ", tempUsers);
      localStorage.setItem('users', JSON.stringify(tempUsers));
      this.users = {...tempUsers};
      console.log("App -> this.,users : ", this.users);
    },
    signout: function(){
      alert("로그아웃 되었습니다.");
      for(var user in this.users){
        if(this.users[user]["authorized"] === true){
          var targetID = user;
        }
      }
      var tempObj = {...this.users[targetID], authorized:false};
      var tempUsers = {...this.users};
      tempUsers[targetID] = tempObj;
      localStorage.setItem('users', JSON.stringify(tempUsers));
      this.users = {...tempUsers};
      console.log("App -> this.,users : ", this.users);
      // this.$router.push({name: 'main'});
      console.log("App -> signout -> router : ", this.$router);
      //내가 하고싶은 것 : 메인 페이지에서 로그아웃하면 메인 페이지로가고, 나머지 것들은 다 postviewpage 로 가게 하고 싶다.
      // create 페이지에서 로그아웃하면 메인페이지로 가게 하고 싶다
    },
    emailExist: function(email){
      console.log("App => emailExist called!");
      console.log("App -> emailExist => param : ", email);
      for(var user in this.users){
        console.log("App -=> emailExist => user : ", user);
        console.log("App => emailExist -> email in users : ", this.users[parseInt(user)]["email"]);
        if(this.trim(this.users[parseInt(user)]["email"]) === this.trim(email)){
          return true;
        }
      }
      return false;
    },
    pwFetch: function(email){
      console.log("App => pwFetch called!");
      for(var user in this.users){
        if(this.trim(this.users[parseInt(user)]["email"]) === this.trim(email)){
          var result = this.trim(this.users[parseInt(user)]["password"]);
        }
      }
      return result;
    },
    trim: function(stringToTrim) {
      return stringToTrim.replace(/^\s+|\s+$/g,"");
    },
  },
  computed: {
    // editPost로 PostID를 받으면 computed로 findIndex를 통해 자동으로 배열의 index를 계산해서 props로 넘겨주고 싶다
    currentUser() {
      let result = null;
      for(var user in this.users){
        if(this.users[user]["authorized"] === true){
          result = this.users[user]["name"];
        }
      }
      return result;
    },
  }
}
</script>

<style>
@import '/index.css';

</style>
