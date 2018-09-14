import Vue from "vue";
import Obserable from './components/lib/obserable';
import Main from './components/main/index';
//import Collection from './components/collection/index';
import VueRouter from 'vue-router'
import './components/css/index.css';
///import 'iview/dist/styles/iview.css';

Vue.use(VueRouter)
var obserable = new Obserable();

Vue.obserable = obserable;
const router = new VueRouter({
	routes: [
		//{path: '*', name: 'error', component: FError },
		
		{
			path: '/login/',
			name: 'login',
			component: Login,
			props: true
		}, {
			path: '/',
			name: 'login',
			component: Login,
			props: true
		},
		
	]
});

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