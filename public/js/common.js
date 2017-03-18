
	NProgress.start();

	NProgress.done();

	// 控制左侧导航二级菜单的显示和隐藏
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	var pathname = location.pathname;

	var flag = $.cookie("PHPSESSID");
	if(!flag && location.pathname == -1){
		location.href = '/login';
	}