<template>
	<div  class="wm-course-ui lt-full">
		<div id='map' style="display:none;"></div>

		<div class="wm-course-list-wrap lt-full" ref='page'>
			<ul>
				<li v-for="(course,i) in courseList" :key="i">
					<div class="wm-course-ico">
						<img :src="imgs[i%2===0 ? 'book1':'book2']" alt="">
					</div>
					<div class="wm-course-content">
						<h1>{{course.title}}</h1>
						<div class="wm-course-teacher">
							<div>老师：{{course.realname}}</div>
							<div>教室：{{course.classroom}}</div>
						</div>
						<div class="wm-course-time">
							时间：{{course.lessonstarttime}} - {{course.lessonendtime}}
						</div>
						<div class="wm-course-action">
							<div>请假</div>
							<div>签到</div>
						</div>
					</div>

				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	import IScroll from 'iscroll';
	import Vue from "vue";

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				viewH:document.documentElement.clientHeight,
				courseList:[
					/* {
						syllabusid:'1',
						meetid:1,
						meetname:'会议',
						title:'数学',
						content:'课程说明 ',
						teacherid:1,
						teachername:'凡老师',
						lessondate:'2018-09-12',
						classroom:'5号楼1209',
						latitude:'',
						longitude:"",
						comment:'',
					} */
				]
			}
		},
		components:{
		},
		
		methods:{
			
			showCityInfo() {
				//实例化城市查询类


				return;

			var	map = new AMap.Map('map', {
					resizeEnable : true
				});
				map.plugin('AMap.Geolocation', function() {
					var geolocation = new AMap.Geolocation({
						enableHighAccuracy : true, //是否使用高精度定位，默认:true
						timeout : 10000, //超过10秒后停止定位，默认：无穷大
						buttonOffset : new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
						zoomToAccuracy : true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
						buttonPosition : 'RB'
					});
					map.addControl(geolocation);
					geolocation.getCurrentPosition();
					AMap.event.addListener(geolocation, 'complete', (data)=>{
						
						console.log(data)
					});
					//返回定位信息
					AMap.event.addListener(geolocation, 'error', data=>{
						alert('定位失败，请确定您的浏览器已经开启了定位。')
						
					});
					//返回定位出错信息
				});

				var p1 = [116.434027, 39.941037];
				var p2 = [116.461665, 39.941564];
				// 返回 p1 到 p2 间的地面距离，单位：米
				var dis = AMap.GeometryUtil.distance(p1, p2);
			
				console.log(dis);
				
				return;
				
				var citysearch = new AMap.CitySearch();
				//自动获取用户IP，返回当前城市
				citysearch.getLocalCity(function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						if (result && result.city && result.bounds) {
							var cityinfo = result.city;
							var citybounds = result.bounds;
							console.log(result);
							//地图显示当前城市
							//map.setBounds(citybounds);
						}
					} else {
						console.log(result.info)
					}
				});
			},
			initScroll(){
				this.scroll = new IScroll(this.$refs['page'],{

				});
			},
			getCourseList(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/zmitistudent/getcourselist',
					data:{
						meetid:s.$route.params.meetid
					},
					success(data){
						if(data.getret ===0 ){
							console.log(data);
							s.courseList = data.list;
						}
					}
				})
			}

		},
		mounted(){
			window.ss = this;
			this.showCityInfo();
			this.getCourseList();
			
			this.initScroll();

			setTimeout(() => {
				this.scroll.refresh();
			}, 100);


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
 