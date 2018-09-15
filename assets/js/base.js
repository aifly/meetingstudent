var imgs = {
	banner :"./assets/images/banner.jpg",
	notice :"./assets/images/notice.gif",
	loginPerson :"./assets/images/login-person.png",
	loginLock :"./assets/images/login-lock.png",
 
	open :"./assets/images/open.png",
	tip :"./assets/images/tip.png",
	search :"./assets/images/search.png",
	back :"./assets/images/back.png",
	reset :"./assets/images/reset.png",
	guidang :"./assets/images/guidang.png",
	loginBg:"./assets/images/login-bg.jpg",
	adminLoginBg:'./assets/images/adminlogin.png',
	raterLoginBg:'./assets/images/raterlogin.png',

	man:'./assets/images/man.png',
	book1:'./assets/images/book1.png',
	book2:'./assets/images/book2.png',
	group:'./assets/images/group.png',
	scoreIco:'./assets/images/score-ico.png',
	logout:'./assets/images/logout.png',
	file:'./assets/images/file.png',
	uncheck:'./assets/images/uncheck.png',
	uncheck1:'./assets/images/uncheck1.png',
	pass:'./assets/images/pass.png',
	pass1:'./assets/images/pass1.png',
	brower:'./assets/images/brower.png',
	pass2:'./assets/images/pass2.png',
	user:'./assets/images/user.png',
	shangbao:'./assets/images/shangbao.png',
	setting:'./assets/images/setting.png',
	qiuzhu:'./assets/images/qiuzhu.png',
	jiaoliu:'./assets/images/jiaoliu.png',
	xuzhi:'./assets/images/xuzhi.png',
	tongxunlu:'./assets/images/tongxunlu.png',
	kecheng:'./assets/images/kecheng.png',
	ziliao:'./assets/images/ziliao.png',
	

	//smile:'./assets/images/smile.png',
	titleBg:'./assets/images/title-bg.png',
	ruleIco:'./assets/images/rule-ico.png',
	imgIco:'./assets/images/img-ico.png',
	h5Ico:'./assets/images/h5.png',
	videoIco:'./assets/images/video-ico.png',
	audioIco:'./assets/images/audio-ico.png',
	dongmanIco:'./assets/images/dongman-ico.png',


};
window.PointerEvent = void 0;
document.addEventListener('touchmove',(e)=>{e.preventDefault()},{
	passive:true
})

/* Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonthgetMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
 */

 window.menus = [
	 [{
	 	name: "培训须知",
	 	img: imgs.xuzhi,
	 	defaultImg: imgs.xuzhi,
	 	img1: imgs.xuzhi1,
	 	width: '65px',
	 	href: "http://www.wenming.cn/specials/wmcj/2018term/xz/"
	 }, {
	 	name: "课程安排",
	 	img: imgs.kecheng,
	 	defaultImg: imgs.kecheng,
	 	width: '54px',
	 	href: "http://www.wenming.cn/specials/wmcj/2018term/kcap/"
	 }, {
	 	name: "新闻中心",
	 	img: imgs.gonggao,
	 	defaultImg: imgs.gonggao,
	 	img1: imgs.gonggao1,
	 	width: '65px',
	 	href: 'http://www.wenming.cn/specials/wmcj/2018term/news/'
	 }],[
		  {
		  	name: "我的房间",
		  	img: imgs.zhusu,
		  	defaultImg: imgs.zhusu,
		  	img1: imgs.zhusu1,
		  	width: '68px'
		  }, {
		  	name: "专家授课",
		  	img: imgs.zuowei,
		  	defaultImg: imgs.zuowei,
		  	img1: imgs.zuowei1,
		  	width: '70px',
		  	href: 'http://www.wenming.cn/specials/wmcj/2018term/zj/'
		  }, {
		  	name: "我的同学",
		  	img: imgs.tongxunlu,
		  	defaultImg: imgs.tongxunlu,
		  	img1: imgs.zuowei1,
		  	width: '60px'
		  },
	 ] ,[
		 {
		 	name: "经验交流",
		 	img: imgs.jiaoliu,
		 	defaultImg: imgs.jiaoliu,
		 	img1: imgs.jiaoliu1,
		 	width: '50px',
		 	href: 'http://www.wenming.cn/specials/wmcj/2018term/jyjl/'
		 }, {
		 	name: "文件汇编",
		 	img: imgs.ziliao,
		 	defaultImg: imgs.ziliao,
		 	img1: imgs.ziliao1,
		 	width: '60px',
		 	href: 'http://www.wenming.cn/specials/wmcj/2018term/wjhb/'
		 }, {
		 	name: "我要求助",
		 	img: imgs.qiuzhu,
		 	defaultImg: imgs.qiuzhu,
		 	img1: imgs.sousuo1,
		 	width: '55px'
		 }
	 ]];


(function () {
	var imgExtensions = 'gif,jpg,jpeg,bmp,png,tiff,tif'.split(','),
		videoExtensions = 'mp4,webm,ogg,aac,wma,vnd.dlna.adts,mp3'.split(','),
		textExtensions = ' xlsx, pdf, doc, ppt, xlsx, doc, docx, pdf, txt, ppt, pptx, xls, rar, css, scss,vb, zip'.split(',');
	var allExtensions = imgExtensions.concat(videoExtensions).concat(textExtensions);
	window.config = {
		baseUrl: 'http://10.137.0.3/v1',
		accepts: [{
			id: 0,
			name: '图片',
			type: 'Image',
			extensions: imgExtensions.join(',')
		}, {
			id: 1,
			name: '视频',
			type:'video',
			extensions: videoExtensions.join(',')
		}, {
			id: 2,
			name: '文本',
			type:'text',
			extensions: textExtensions.join(',')
		}, {
			id: 3,
			name: '全部',
			type:'all',
			extensions: allExtensions.join(',')
		}]
	}

	if (window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('zmiti.com') > -1) {
		window.config.baseUrl = "https://api.symbin.cn/v1";
	}

})();


