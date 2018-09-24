<template>
	<div class="wm-meetlist-ui lt-full">
		<List :list='meetList' to='/index/' name='meetname' id='meetid'></List>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	import List from '../list/index';
	import IScroll from 'iscroll';
	document.title = '会议列表';
	export default {
		props:['obserable'],
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
				

				formUser:{
					studentmame:'',
					nickname:'',
					mobile:'',
					telphone:'',
					email:'',
					sex:'',
					companyname:'',
					job:'',
					cityids:[],
					detailaddress:[

					]
				},
				userinfo:{}
			}
		},
		components:{
			List
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
			
			this.getMeetList();
		},
		
		methods:{

			getMeet(index){
				Vue.obserable.on('getMeetInfo',()=>{
					return this.meetList[index];
				});
				window.localStorage.setItem('meetinfo',JSON.stringify(this.meetList[index]));
				this.$router.push({path:'/index/'+this.meetList[index].meetid})
			},

			getMeetList(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/zmitistudent/getmeetlist',
					data:{},
					success(data){
						console.log(data);
						if(data.getret === 0){
							s.meetList = data.list;
							for(var i = 0 ;i<5;i++){
							//	s.meetList = s.meetList.concat(s.meetList);
							}
						}
					}
				})
			}
			
		}
	}
</script>
 