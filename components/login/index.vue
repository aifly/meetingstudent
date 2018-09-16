<template>
	<div  class="wm-login-ui lt-full">
		<div class="wm-login-title" :class="{'hide':meetnotexists}">{{meetname}}</div>

		<div v-if='loginType === 0' >
			<div class="wm-login-form" v-if='!meetnotexists'>
				<div>
					<img :src="imgs.loginPerson" alt=""><input placeholder="请输入用户名" v-model="username"/>
				</div>
				<div>
					<img :src="imgs.loginLock" alt=""><input type="password" v-model="password" placeholder="请输入密码"/>
				</div>
				<div class="wm-login-error">{{loginError}}</div>
			</div>
			<div class="wm-login-btn" v-if='!meetnotexists' v-tap='[login]' :class="{'active':isPress}" @touchstart=' isPress = true' @touchend=' isPress = false'>
				确定
			</div>
		</div>
		<div v-else >
			<div class="wm-login-form" v-if='!meetnotexists'>
				<div>
					<img :src="imgs.loginPerson" alt=""><input placeholder="请输入手机号" v-model="mobile"/>
				</div>
				<div>
					<img :src="imgs.loginLock" alt=""><input v-model="code" placeholder="请输入验证码"/>
					<div class="wm-login-getcode" :class="{'active':isPressGetcode}" @touchstart=' isPressGetcode = true' @touchend=' isPressGetcode = false'>获取验证码</div>
				</div>
				<div class="wm-login-error">{{loginError}}</div>
			</div>
			<div class="wm-login-btn" v-if='!meetnotexists' v-tap='[login1]' :class="{'active':isPress}" @touchstart=' isPress = true' @touchend=' isPress = false'>
				确定
			</div>
		</div>

		<div class="wm-login-type" v-tap='[toggleLoginType]' v-if='!meetnotexists'>
			{{loginType === 0 ?'使用短信验证码登录':'使用账号密码登录'}}
		</div>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	import Vue from "vue";
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				username:'',
				loginType:0,
				mobile:'',
				code:'',
				isPress:false,
				meetname:'',
				meetnotexists:false,
				isPressGetcode:false,
				password:'',
				loginError:'',
				showLoading:false,
				showError:false,
				errorMsg:'',
				viewH:document.documentElement.clientHeight
			}
		},
		components:{
		},
		
		methods:{
			toggleLoginType(){
				this.loginType = this.loginType === 0 ? 1 : 0;
			},
			toastError(msg =  '用户名不能为空'){
				this.loginError = msg;
 				setTimeout(()=>{
 					this.loginError = '';
 				},2000)
			},
			login1(){
				
			},
			login(){
				var _this = this;
				if(!this.username){
					this.toastError();
 					return;
				}
				if(!this.password){
					this.toastError('密码不能为空');
 					return;
				}
				this.showLoading = true;
				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/zmitistudent/login/',
					data:{
						username:_this.username,
						userpwd:_this.password,
						meetid:s.meetid
					},
					success(data){
						console.log(data)
						if(data.getret === 0){
							var param = data;
							delete param.getret;
							delete param.getmsg;
							var p = param.list;
							
							
							window.localStorage.setItem('adminlogin',JSON.stringify(p));
							if(_this.checked){
								window.localStorage.setItem('wm_adminusername',_this.username);
								window.localStorage.setItem('wm_adminpassword',_this.password);
							}else{
								window.localStorage.setItem('wm_adminusername','');
								window.localStorage.setItem('wm_adminpassword','');
							}
							window.location.hash = '#/index/';
							
							window.location.reload();
							_this.isLogined = true;
							
						}else{
							_this.toastError(data.getmsg);
						}
					}
				})
				
			},
			checkCache(){
				var username = window.localStorage.getItem('wm_adminusername'),
					password = window.localStorage.getItem('wm_adminpassword');
				
				if(username && password){
					this.username = username;
					this.password = password;
					this.checked = true;
				}
			}
		
			
		},
		mounted(){
			this.meetid = this.$route.params.meetid;
		
			
			this.checkCache();
			var s = this;
			var ua = navigator.userAgent.toLowerCase();
			this.isNotChrome = !ua.match(/chrome\/([\d.]+)/)

			symbinUtil.ajax({
				url:window.config.baseUrl+'/zmitistudent/getmeetinfo',
				data:{
					meetid:s.meetid
				},
				success(data){
					if(data.getret === 0){
						if(data.list.length){
							s.meetname =  data.list[0].meetname
						}else{
							s.meetname = '会议不存在';
							s.meetnotexists = true;
						}
					}
					else{
						s.meetname = '会议不存在';
						s.meetnotexists = true;
					}
				}
			})

		}
	}
</script>
 <style>
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
 </style>