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
}

var m_shezhi = new module_shezhi();
export { m_shezhi }