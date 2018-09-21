var imgs = {
	banner :"./assets/images/banner.jpg",
	notice :"./assets/images/notice.gif",
	loginPerson :"./assets/images/login-person.png",
	loginLock :"./assets/images/login-lock.png",
 
	open :"./assets/images/open.png",
	tip :"./assets/images/tip.png",
	back :"./assets/images/back.png",
	loginBg:"./assets/images/login-bg.jpg",
	adminLoginBg:'./assets/images/adminlogin.png',
	raterLoginBg:'./assets/images/raterlogin.png',

	man:'./assets/images/man.png',
	book1:'./assets/images/book1.png',
	book2:'./assets/images/book2.png',
	logout:'./assets/images/logout.png',
	file:'./assets/images/file.png',
	user:'./assets/images/user.png',

	baodao:'./assets/images/signin-ico.png',
	course:'./assets/images/course-ico.png',
	msg:'./assets/images/info-ico.png',
	tontxunlu:'./assets/images/txl-ico.png',
	leave:'./assets/images/leave-ico.png',
	kaoping: './assets/images/kaoqin-ico.png',
	kaoqin: './assets/images/kaoqin-ico.png',
	homework:'./assets/images/homework-ico.png',
	my:'./assets/images/user-ico.png',
	titleBg:'./assets/images/title-bg.png',


};
window.PointerEvent = void 0;
/* document.addEventListener('touchmove',(e)=>{e.preventDefault()},{
	passive:true
}); */

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
	 	name: "报道",
	 	img: imgs.signin,
	 	defaultImg: imgs.signin,
	 	width: '65px',
	 	href: "/user/"
	 }, {
	 	name: "课程安排",
	 	img: imgs.course,
	 	defaultImg: imgs.course,
	 	width: '54px',
	 	href: "/course/"
	 }, {
	 	name: "信息",
	 	img: imgs.msg,
	 	defaultImg: imgs.msg,
	 	width: '65px',
	 	href: '/msg/'
	 }],[
		  {
		  	name: "通讯录",
		  	img: imgs.tontxunlu,
		  	defaultImg: imgs.tontxunlu,
		  	width: '68px'
		  }, {
		  	name: "请假",
		  	img: imgs.leave,
		  	defaultImg: imgs.leave,
		  	width: '70px',
		  	href: '/leave/'
		  }, {
		  	name: "考评",
		  	img: imgs.kaopin,
		  	defaultImg: imgs.kaopin,
			  width: '60px',
			  href: '/appraiser/'
		  },
	 ] ,[
		 {
		 	name: "考勤",
		 	img: imgs.kaoqin,
		 	defaultImg: imgs.kaoqin,
		 	width: '50px',
		 	href: '/kaoqin/'
		 }, {
		 	name: "作业",
		 	img: imgs.homework,
		 	defaultImg: imgs.homework,
		 	width: '60px',
		 	href: '/homework/'
		 }, {
		 	name: "我的",
		 	img: imgs.my,
		 	defaultImg: imgs.my,
			width: '55px',
			href:'/my/'
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

	if (window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('zmiti.com') > -1 ||window.location.href.indexOf('192.168.') > -1) {
		window.config.baseUrl = "https://api.symbin.cn/v1";
	}

})();


