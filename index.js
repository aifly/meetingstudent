import Vue from "vue";
import Obserable from './components/lib/obserable';
import Main from './components/main/index';
import Login from './components/login/index';
import Index from './components/index/index';
import User from './components/user/index';
import Course from './components/course/index';
import MeetList from './components/meetlist/index';
import NewsList from './components/newslist/index';
import News from './components/news/index';
//import Collection from './components/collection/index';
import VueRouter from 'vue-router'
import './components/css/index.css';
///import 'iview/dist/styles/iview.css';
import symbinUtil from './components/lib/util';
import vueTap from 'vue-js-tap';
Vue.use(vueTap);

Vue.use(VueRouter)
var obserable = new Obserable();

Vue.obserable = obserable;
const router = new VueRouter({
	routes: [
		//{path: '*', name: 'error', component: FError },
		
		{
			path: '/login/:meetid?/',
			name: 'login',
			component: Login,
			props: true
		}, {
			path: '/',
			name: 'login',
			component: Login,
			props: true
		}, {
			path: '/index/:meetid?',
			name: 'index',
			component: Index,
			props: true
		}, {
			path: '/course/:meetid',
			name: 'course',
			component: Course,
			props: true
		},{
			path: '/meetlist/',
			name: 'meetlist',
			component: MeetList,
			props:true
		},{
			path: '/newslist/:meetid/',
			name: 'newslist',
			component: NewsList,
			props:true
		},{
			path: '/news/:newsid/',
			name: 'news',
			component: News,
			props:true
		}, {
			path: '/user/:meetid?/',
			name: 'user',
			component: User,
			title:'个人中心',
			props: true
		},
		
	]
});

var userinfo = symbinUtil.getUserInfo();
router.beforeEach((to,from,next)=>{//导航守卫。
	//console.log(to,from);
	if(to.name === 'login' || to.name === '/'){
		next();
		return;
	}
	symbinUtil.ajax({
		url: window.config.baseUrl +'/zmitistudent/judgelogin',
		data:{
			userid: userinfo.userid,
			accesstoken: userinfo.accesstoken
		},
		error(){
			next();
		},
		success(data){
			if(data.getret !== 0){
				router.push({name:'login'});
			}
			next();
		}
	})
})

new Vue({
	router,
	data: {
		obserable,
		imgs,
		viewH: document.documentElement.clientHeight,
	},
	el: '#app',
	template: `<div id="app1">
      <Main :obserable='obserable'></Main>
    </div>`,
	methods: {},
	components: {
		Main
	},
	mounted() {
		this.$router.obserable = obserable;
		

	}
}).$mount('#app1')