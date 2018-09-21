<template>
	<div class="wm-meetlist-ui lt-full">
		<div class="wm-meetlist-wrap" ref='page' :style="{height:viewH+'px'}">
			<ul>
				<li class="wm-meetlist-item" v-for='(meet,i) in meetList' :key="i">
					<div>{{meet.meetname}}</div>
					<div class="zmiti-text-overflow"> <span></span> </div>
					<router-link v-tap='[getMeet,i]' :to='"/index/"+meet.meetid'></router-link>
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
							setTimeout(() => {
								s.scorll.refresh();
							}, 100);
						}
					}
				})
			}
			
		}
	}
</script>
 