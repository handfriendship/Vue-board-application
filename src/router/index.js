import Vue from 'vue'
import Router from 'vue-router'
import AppHeader from '@/components/AppHeader'
import PostListPage from '../pages/PostListPage'
import Signin from '@/pages/Signin'
import Signup from '@/pages/Signup'
import Create from '@/pages/PostCreatePage'
import PostEditPage from '@/pages/PostEditPage'
import PostViewPage from '@/pages/PostViewPage'
import App from '@/App'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      components: {
        header: AppHeader,
        list: PostListPage,
      },

    },
    {
      path: '/signin',
      name: 'Signin',
      components: {
        header: AppHeader,
        signin: Signin,
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      components: {
        header: AppHeader,
        signup: Signup,
      }
    },
    {
      path: '/post/create',
      name: 'Create',
      components: {
        header: AppHeader,
        create: Create,
      },
      props: true,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/post/:postId/edit',
      name: 'PostEditPage',
      components: {
        edit: PostEditPage,
      },
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/post/:postId',
      name: 'PostViewPage',
      components: {
        view: PostViewPage,
      }
    }
  ]
})

router.beforeEach( (to, from, next) => {
  console.log("router hook called at every single page");
  console.log("from : ", from);
  from.matched.some(record => {
    console.log("record.components : ", record.components.view);
  })
  console.log("from.matched[0].components.view.props.propsPost.post : ", typeof(from.matched[0]));
  console.log("to : ", to);
  if(to.matched.some(record => record.meta.requiresAuth)){ // 인증이 필요한 라우터인지
    console.log("in requiresAuth page");
    console.log("App : ", App);
    if(App.computed.currentUser === null){
      if(from.matched.some(element => {
        console.log("element.path : ", element.path);
        return element.path === "/post/:postId/edit";
      })){ // !from.currentUser
        alert("로그인이 필요합니다");
        next({
          name: 'Signin',
          query: {redirect: to.fullPath} // 이거 의미 ?
        })
      } else if(from.matched.some(element => {
        console.log("element.path : ", element.path);
        return element.path === "";
      })){
        alert("로그인이 필요합니다!");
        next({
          name: 'Signin'
        })
      } else {
        next();
      } // end of if(from.matched.some)
    } else {// end of if(App.computed.currentUser === null)
      next();
    }
  } else {
    next();
  }
});

export default router;
