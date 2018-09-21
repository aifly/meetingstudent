<template>
	<div class="wm-user-ui lt-full">
		<div class="wm-user-wrap" ref='page'>
			<ul>
				<li class="wm-user-item" v-for='(user,i) in userItemList' :key="i">
					<div>{{user.label}}</div>
					<div class="zmiti-text-overflow">{{formUser[user.model] || user.placeholder}} <span></span> </div>
				</li>
			</ul>
		</div>
		<div class='wm-user-modify-page' v-if='currentModelIndex>-1'>
			<input v-model="userItemList[currentModelIndex].model"/>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import IScroll from 'iscroll';
	
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
				usernameError:"",
				passError:"",
				repassError:"",
				mobileError:"",

				currentModelIndex:-1,

				provinceList:[
					 
				],
				userItemList:[
					{
						 label:"真实姓名",
						 placeholder:"请填写真实姓名",
						 model:"studentmame"
					 },
					 {
						 label:"手机号",
						 placeholder:"请填写手机号",
						 model:"mobile"
					 },
					 {
						 label:"座机号",
						 placeholder:"请填写座机号",
						 model:"telphone"
					 },{
						 label:"邮箱",
						 placeholder:"请填写邮箱",
						 model:"email"
					 },{
						 label:"性别",
						 placeholder:"请填写性别",
						 model:"sex"
					 },{
						 label:"昵称",
						 placeholder:"请填写昵称",
						 model:"nickname"
					 },{
						 label:"单位名称",
						 placeholder:"请填写单位名称",
						 model:"companyname"
					 },{
						 label:"职务",
						 placeholder:"请填写职务",
						 model:"job"
					 },{
						 label:"地址",
						 placeholder:"请填写地址",
						 model:"cityids"
					 },{
						 label:"详细地址",
						 placeholder:"请填写详细地址",
						 model:"detailaddress"
					 }
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
			console.log(this.userinfo)
			this.getCityData();
			if(this.userinfo.isadmin){
				//window.location.hash = '/periods';
			}
			document.title = '个人中心';
			this.scroll = new IScroll(this.$refs['page'],{});

			setTimeout(() => {
				this.scroll.refresh();
			}, 100);
			
		},
		
		methods:{


			modifyPwd(){
					if(!this.showPassWord){
					this.showPassWord = true;
				}else{
					var s = this;
					if(!this.userinfo.password){
						this.passError ='密码不能为空';
						setTimeout(() => {
							this.passError ='';
						}, 2000);
						return;
					}

					if(this.userinfo.repassword !== this.userinfo.password){
						this.repassError ='两次密码不一致';
						setTimeout(() => {
							this.repassError ='';
						}, 2000);
						return;
					};

					symbinUtil.ajax({
						_this:s,
						url:window.config.baseUrl+'/wmadadmin/updateadminpwd/',
						data:{
							adminusername:s.userinfo.adminusername,
							admintoken:s.userinfo.admintoken,
							adminpwd:s.userinfo.password
						},
						success(data){
							console.log(data);
							if(data.getret === 0){
								s.$Message.success('修改密码成功,请重新登录');
								setTimeout(() => {
									window.location.hash = '#/login';
								}, 400);
							}
							else{
								s.$Message.error(data.getmsg);
							}
						}
					})
				}
			},

			getCityById(e,callback){
				
				var provinceId = e.__value.split(',')[0];
				var cityid = e.__value.split(',')[1];
				var s = this;

				
				symbinUtil.ajax({
					_this:s,
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
					_this:s,
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
			modifyUser(){
				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/updateadmininfo',
					validate:s.validate,
					data:{
						adminusername:s.userinfo.adminusername,
						admintoken:s.userinfo.admintoken,
						nickname:s.userinfo.nickname,
						adminmobile:s.userinfo.adminmobile,
						detailaddress:s.userinfo.detailaddress,
						email:s.userinfo.email,
					/* 	provinceid:s.userinfo.cityids[0],
						cityid:s.userinfo.cityids[1],
						areaid:s.userinfo.cityids[2], */
						companyname:s.userinfo.companyname
					},success(data){
						console.log(data);
						 if(data.getret === 0){
							s.$Message.success(data.getmsg);
							data.list.admintoken = s.userinfo.admintoken;
							data.list.accesstoken = s.userinfo.accesstoken;
							window.localStorage.setItem('login',JSON.stringify(data.list));
							///window.location.hash =  '/login';
						}else{
							s.$Message.error('修改密码失败');
						} 
					}

				})
			},
			 
		}
	}
</script>
 