<template>
	<div class="wm-newslist-ui lt-full">
		新闻详情新闻详情
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	document.title = '新闻详情';
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

				newsList:[
					 
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
			
			this.getNewsList();
		},
		
		methods:{

			getMeet(index){
				/*Vue.obserable.on('getMeetInfo',()=>{
					return this.meetList[index];
				});
				window.localStorage.setItem('meetinfo',JSON.stringify(this.meetList[index]));
				this.$router.push({path:'/index/'+this.meetList[index].meetid})*/
			},

			getNewsList(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/zmitistudent/getnewsinfo',
					data:{newsid:s.$route.params.newsid},
					success(data){
						console.log(data);
						if(data.getret === 0){
							s.newsList = data.list;
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
 