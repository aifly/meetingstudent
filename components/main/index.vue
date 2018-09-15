<template>
    <div class="layout">
        <div v-if='$route.name !== "login" && $route.name !== "register"'>
             <router-view></router-view>
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import './index.css';
    import Vue from 'vue';
    import symbinUtil from '../lib/util';
    import sysbinVerification from '../lib/verification';

	export default {
		props:[],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
                viewH:document.documentElement.clientHeight,
                viewW:window.innerWidth,
                tabIndex:0,
                userinfo:{},
                
                resourceList:[],
                menus:[]
			}
		},
		components:{
		},
        beforeCreate(){
            this.validateData = sysbinVerification.validate(this);
        },
        watch:{
           $route(e){
               //console.log(e)
           }
        },
		mounted(){
            window.s = this;
            var obserable = Vue.obserable;
            
            var userinfo = symbinUtil.getUserInfo();

            this.userinfo = userinfo; 
            
          
          
        },
       
		methods:{
 
            
            
           
        }
	}
</script>
 

 <style >
     
 </style>