<template>
	<div class="wm-recurit-ui lt-full" >
		<header class="wm-recurit-header">
			<h1>征集管理</h1>
			<div><Icon type="ios-create-outline" />发布新的征集</div>
		</header>
		<div class="wm-recurit-list wm-scroll">
			<ul>
				<li v-for='(item,i) in resourceList' :key="i">
					<header>
						<div>{{item.resourcecnname}}</div>
						<div class="wm-recurit-action">
							<Button size='small' :to="'/collection/'+item.resourceid+'/0'">详情</Button>
							<Button size='small'>编辑</Button>
							<Button size='small' :to="'/collection/'+item.resourceid+'/1'">评选</Button>
							<Button size='small' type='error'>删除</Button>
						</div>
					</header>
					<div class="wm-recurit-item">
						路径 ：{{item.dirid}}
					</div>
					<div class="wm-recurit-item">
						起止时间： {{item.starttime}} - {{item.endtime}}
					</div>
					<div class="wm-recurit-item zmiti-text-overflow" :title='item.resourcedesc'>
						说明：{{item.resourcedesc}}
					</div>
				</li>
			</ul>
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
				viewH:document.documentElement.clientHeight,
				page:1,
				pagenum:20,
				resourceList:[],

			}
		},
		components:{
			
		},
		watch:{
		
		},
		mounted() {
			
			var t = setInterval(()=>{
				var dataList = Vue.obserable.trigger({
					type:'getResource'
				});
				if(dataList){
					clearInterval(t);
					var arr = [];
					for(var i = 0 ; i<10;i++){
						arr = arr.concat(dataList);
					}
					this.resourceList =  arr;
				
				}
			},30);
		},
		methods:{

			
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
 