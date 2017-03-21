
	define(["jquery","template",'util','bootstrap'],function($,template,util){
		// 左侧菜单导航 点击添加active类名（技术点：pathname）
		util.setMenu(location.pathname);
		// var pathname = location.pathname;
		// $('.navs a[href="'+ pathname +'"]').addClass('active');

		$.ajax({
			type : "get",
			url : "/api/teacher",
			datatype : "json",
			success : function(data){
				if(data.code == 200){
					// 讲师列表模板
					var html = template("teacherList",{list:data.result});
					$("#teacherCode").html(html);

					// 讲师列表查看按钮 点击事件
					$(".teacherBtns").find("a:eq(0)").click(function(){
						var tc_id = $(this).parent("td").attr("data-tcid");
						console.log(tc_id)
						$.ajax({
							type:"get",
							url:"/api/teacher/view",
							data: {tc_id : tc_id},
							dataType:"json",
							success:function(data){
								if(data.code == 200){
									// console.log(data);
									data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g," ");
									// data.result.tc_hometown = data.result.tc_hometown.split("|").join(" ");
									// 讲师查看 模态框 信息模板
									var html = template("teacherInfoId",data.result);
									$("#teacherInfoCode").html(html);
									$("#teacherModal").modal();
								}
								
							}
						});
					});

					// 讲师列表注销按钮 点击事件
					//console.log(data.result)
					$(".teacherBtns").find("a:eq(2)").click(function(){
						var tc_id = $(this).parent("td").attr("data-tcid");
						var tc_status = $(this).parent("td").attr("data-status");
						var that = this;
						$.ajax({
							type: "post",
							url:"/api/teacher/handle",
							dataType:"json",
							data:{
								tc_id:tc_id,
								tc_status:tc_status
							},
							success:function(data){
								console.log(data.result.tc_status);
								if(data.result.tc_status == 1){
									$(that).text("注 销");
								}else{
									$(that).text("启 用");
								}
								$(that).parent("td").attr("data-status",data.result.tc_status);
								console.log($(that).parent("td").attr("data-status"));
							}
						})
					});
				}
			}
		})
	})