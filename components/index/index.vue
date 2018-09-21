<template>
	<div  class="wm-index-ui lt-full">
		<div class='wm-index-banner'>
			<img v-if='meeting.bannerurl' :src="imgs.banner" alt="">
			<div v-else>
				<h2>{{meeting.meetname}}</h2>
				<div>{{meeting.startdate + ' - ' + meeting.enddate}}</div>
			</div>
		</div>
		<div>
			<div class="wm-index-notice">
				<div><img :src="imgs.notice" alt=""></div>
				<div>为推进新时代藏学研究与一带一路建设对接，经研究决定，首届丝路藏学学术研讨会将于2018年9月24至27日（24日报到）</div>
			</div>
			<div class="wm-menu-list">
				<ul  v-for="(menu,i) in menus" :key='i'>
					<li v-for="(m,i) in menu" :key='i'> 
						<div>
							<img :style="{width:m.width}" :src="m.defaultImg" alt="">
						</div>
						<div :class="m.class">{{m.name}}</div>
						<router-link class='lt-full' :to='m.href+$route.params.meetid'></router-link>
					</li>
				</ul>
			</div>
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
				password:'',
				checked:false,
				isLogined:false,
				isMove:false,
				showLoading:false,
				showError:false,
				errorMsg:'',
				provinceList:[
				
				],
				userError:"",
				companyError:"",
				usernameError:"",
				passError:"",
				repassError:"",
				mobileError:"",
				meeting:{},
				formUser:{
					cityids:[]
				},
				menus:window.menus,
				viewH:document.documentElement.clientHeight
			}
		},
		components:{
		},
		
		methods:{
			
			checkUserName(){
				if(!this.formUser.username){
					this.toastError('请输入用户名');
					return;
				}
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/wmadvuser/isexist/",
					data:{
						username:s.formUser.username
					},
					success(data){
						
						if(data.getret === 0){

						}else{
							s.toastError(data.getmsg);
						}
					}
				})
			},
			toastError(msg =  '用户名不能为空',type='userError'){
				this[type] = msg;
				setTimeout(() => {
					this[type] = '';
				}, 2000);
			},
			 
			getCityById(e,callback){
				
				var provinceId = e.__value.split(',')[0];
				var cityid = e.__value.split(',')[1];
				var s = this;

				
				symbinUtil.ajax({
					url:window.config.baseUrl+'/share/getarealist',
					data:{
						cityid
					},
					success(data){
						if(data.getret === 0){
							console.log(data);
							s.provinceList.forEach((item,i)=>{
								if(item.value === provinceId*1){
									item.children.forEach((child,k)=>{
										if(child.value === cityid*1){
											child.children = child.children || [];
											data.list.map((d,l)=>{
												child.children.push({
													value:d.cityid,
													label:d.name,
													//loading: false
												})
											})
											
										}
									})
									callback();
									
								}
								
							});
							

						}
					}

				})
			},
			getCityData(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/share/getcitylist/',
					data:{},
					success(data){
						//console.log(data);
						if(data.getret === 0){
							data.list.map((item,i)=>{
								var children = [];
								item.children && item.children.map((child,l)=>{
									children.push({
										value:child.cityid,
										label:child.name,
										loading: false,
										children:[]
										
									})
								})
								s.provinceList.push({
									value:item.cityid,
									label:item.name,
									children,
									loading: false
								})
							})
						}
					}
				})
			},
			checkCache(){
				var username = window.localStorage.getItem('wm_username'),
					password = window.localStorage.getItem('wm_password');
				
				if(username && password){
					this.username = username;
					this.password = password;
					this.checked = true;
				}
			}
		
			

		},
		mounted(){
			/* this.checkCache();
			this.getCityData(); */
			this.meeting = Vue.obserable.trigger({
				type:'getMeetInfo'
			}) || JSON.parse(window.localStorage.getItem('meetinfo'));

			console.log(this.meeting);

			

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
 