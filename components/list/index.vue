<template>
	<div class="wm-list-ui lt-full">
		<div class="wm-list-wrap" ref='page' :style="{height:viewH+'px'}">
			<ul>
				<li class="wm-list-item" v-for='(meet,i) in list' :key="i">
					<div>{{meet[name]}}</div>
					<div class="zmiti-text-overflow"> <span></span> </div>
					<router-link v-tap='[getMeet,i]' :to='to + meet[id]'></router-link>
				</li>
				<li style="height:60px;background:#f5f9ff"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	import IScroll from 'iscroll';
	document.title = '会议列表';
	export default {
		props:['obserable','list','to','name','id'],
		name:'zmitiindex',
		data(){
			return{
				visible:false,
				imgs:window.imgs,
				showPassWord:false,
				isLoading:false,
				userError:"",
				companyError:"",
				viewH:window.innerHeight,
				usernameError:"",
				passError:"",
				repassError:"",
				mobileError:"",

				meetList:[
					 
				],
				userinfo:{}
			}
		},
		components:{
		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

			this.validate = validate;
		},
		mounted(){
			this.userinfo = symbinUtil.getUserInfo();
			if(this.userinfo.isadmin){
				//window.location.hash = '/periods';
			}
			this.scorll = new IScroll(this.$refs['page'],{
				preventDefault:false
				
			});
		},
		
		methods:{

			getMeet(index){

				if(this.to === '/index/'){
					Vue.obserable.on('getMeetInfo',()=>{
						return this.list[index];
					});
					window.localStorage.setItem('meetinfo',JSON.stringify(this.list[index]));
				}



				this.$router.push({path:this.to+this.list[index][this.id]});
			}
		}
	}
</script>
 