<template>
	<div class="wm-news-ui lt-full" ref='page'>
		<div>
			<h2 class="wm-news-title">{{newsInfo.title}}</h2>
			<div class="wm-news-time">
				<span>{{newsInfo.updatetime}} - </span>
				<span>浏览：{{newsInfo.visits}}</span>
			</div>
			<div class="wm-news-content" v-html='newsInfo.content'></div>

			<div  v-if='newsInfo.encryptfile' class="wm-encryptfile-item" >
				<canvas ref='canvas' :width='width' :height='height' v-for='(file,i) in newsInfo.encryptfile.split(",")'></canvas>
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	import IScroll from 'iscroll';
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
				width:window.innerWidth - 40,
				height:0,
				companyError:"",
				viewH:window.innerHeight,
				usernameError:"",
				passError:"",
				repassError:"",
				mobileError:"",

				newsInfo:{},
				

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
			this.scroll = new IScroll(this.$refs['page'],{
				scrollbars:true
			});
		},

		watch:{
			height(val){
				if(val>0){
					var canvases = this.$refs['canvas'];
					var s = this;
					var name = this.userinfo.studentname;
					var fileList = this.newsInfo.encryptfile.split(',');
					canvases.forEach((canvas,i)=>{
						var context = canvas.getContext('2d');

						var img = new Image();
						img.onload = function(){
							context.drawImage(this,0,0,s.width,s.height);
							context.save();
							context.font="70px Verdana";
							context.translate(s.width/2,s.height/2);
							context.rotate(-20*Math.PI/180);
							context.globalAlpha=0.2;
							context.fillText(name,0,0);
							context.fillText(name,-(s.width)/4,-s.height/3);
							context.fillText(name,(s.width)/20,s.height/3);

							context.restore();

							s.scroll.refresh();

						}
						img.src = fileList[i];

					})
				}
			}
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
					data:{
						newsid:s.$route.params.newsid
					},
					success(data){
						console.log(data);
						if(data.getret === 0){
							s.newsInfo = data.list;
							if(s.newsInfo.encryptfile){

								var fileList = s.newsInfo.encryptfile.split(',');
								var img = new Image();
								img.onload = function(){
									s.height = this.height/ this.width * s.width;

								}
								img.src = fileList[0];
							}

							 
						}
					}
				})
			}
			
		}
	}
</script>
 