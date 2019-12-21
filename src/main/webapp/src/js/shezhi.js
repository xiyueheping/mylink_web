import { m_data } from "./data";
import { m_setbg } from "./setbg";

/**
 * 设置功能的模块
 * 主要处理与右侧滑动菜单有关的功能
 */
var module_shezhi = function() {
    //由事件层调用 打开右侧滑动菜单
    this.openrightmenu = function(){

        document.getElementById("rightmenu").style.display = "block";
        $("#window_bg").fadeIn(300); //显示阴影
        $("#rightmenu").animate({
             width:'200px'
        },300);
    }

    //由事件层调用 关闭右侧菜单
    this.closerightmenu = function(){
        //在关闭右侧菜单之前，如果导入导出和切换背景窗口有打开的先关闭
        if(document.getElementById('none_input').style.display!='none'){
            m_data.closeinputwindow();
        }
        if(document.getElementById('none_output').style.display!='none'){
            m_data.closeoutputwindow();
        }
        if(document.getElementById('none_setbg').style.display!='none'){
            m_setbg.closesetbgwindow();
        }


        $("#window_bg").fadeOut(300); //隐藏阴影
        $("#rightmenu").animate({
            width:'0px'
     },300,function(){
        document.getElementById("rightmenu").style.display = "none";
     });
    }

    //由事件层调用 退出登录
    this.logout = function(){
        var webpath = "http://localhost:8080/mylink_web/";

        $.ajax({
            url: webpath + "user/logout", //请求的地址
            type: 'GET', //请求的方式'GET'或'POST'
            data:{
            }, 
            dataType: 'json',//设置返回内容的数据类型
            async:false, //同步请求
            timeout: 8000,//设置超时，请求超过了这个时间值就会结束请求
            error: function(xhr,errorText,errorType){//响应失败时执行的错误处理函数
                alert("服务器异常");
                 },
            success:function(response,stutas,xhr){//响应成功后执行的回调函数
                   console.log(response);
                   if(response.msg == "登录态验证失败"){
                       document.write("<h3><a href='./login.html'>暂未登录，请先登录</a></h3>");
                       return false;
                   }
                   if(response.msg == "退出登录成功"){
                       alert(response.msg);
                       window.open("./login.html","_self");
                   }
                }
            })
    }
}

var m_shezhi = new module_shezhi();
export { m_shezhi }