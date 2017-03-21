/**
 * Created by zou90 on 2017/3/21.
 */

define(['jquery','nprogress'],function($,nprogress){
    // 控制全局遮罩
    $(document).ajaxStart(function(){
        $('.overlayer').show();
    });
    $(document).ajaxStop(function(){
        $('.overlayer').hide();
    });

    // 进度条功能
    nprogress.start();
    nprogress.done();
})