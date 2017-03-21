
define(['jquery','echarts','template','cookie','overlay'],function($,echarts,template){
	// console.log(123)
	// NProgress.start();

	// NProgress.done();

	// 控制左侧导航二级菜单的显示和隐藏
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// 没有登录的时候跳转到登录页面
	var pathname = location.pathname;

	var flag = $.cookie("PHPSESSID");
	if(!flag && pathname.indexOf('login') == -1){
		// 没有登录
		location.href = '/login';
	}


// 实现登录功能
	$("#loginForm").submit(function(){

            var formData = $(this).serialize();
            $.ajax({
                type:'post',
                url:"/api/login",
                data:formData,
                dataType:'json',
                success:function(data){
                    
                    if(data.code == 200){
                        console.log(data.result);
                        var logInfo = JSON.stringify(data.result);
                        // console.log(logInfo);
                        $.cookie('logInfo',logInfo,{path:'/'});
                        location.href= '/index/index';
                    }
                   
                },
                error:function(data){
                    console.log(data.responseText);
                    alert('输入错误');
                }

            });
            return false;
        });

	

    // 退出功能
    $("#logoutId").click(function(){
    	$.ajax({
    		type : 'post',
    		url : '/api/logout',
    		dataType : 'json',
    		success : function(data){
    			if(data.code == 200){
    				location.href = "/login";
    			}
    		}
    	});
    });


    // 头像

	var obj = JSON.parse($.cookie('logInfo'));
    var tpl = '<div class="avatar img-circle">'+
                  '<img src="{{tc_avatar}}">'+
               '</div>'+
               '<h4>{{tc_name}}</h4>';
    var render = template.compile(tpl);
    var html = render(obj);
    $('.aside .profile').html(html);



})
	