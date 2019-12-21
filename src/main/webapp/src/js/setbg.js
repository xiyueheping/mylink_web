//加载背景图片模块
//导入数据层管理模块
import { m_data } from "./data.js"
import { m_shezhi } from "./shezhi.js";

function module_setbg(){

    this.selectimgindex = -1;  //暂存当前选中的背景图片的索引

    //根据本地数据加载背景图片(页面刷新调用)
    this.loadbg = function(){
        console.log("开始加载背景图片");
        var imgpath = m_data.mylink_globaldata.imgpath; //从数据层对象获取图片路径
        var body = document.getElementsByTagName('body')[0];//读取dom元素
        //根据图片路径设置背景图片
        body.style.background = `url("./src/images/bg/${imgpath}") no-repeat`;
        body.style.backgroundSize = '100% 100%'
    }
    
    //切换背景图片  由外界点击事件调用，弹出切换背景弹窗
    this.showsetbgwindow = function(){
       //打开切换背景窗口之前先判断导出窗口和导入窗口是否打开，如果打开先关闭它们
       if(document.getElementById('none_output').style.display!='none'){
           $("#none_output").slideUp(300);
       }
       if(document.getElementById('none_input').style.display!='none'){
        $("#none_input").slideUp(300);
    }
        $("#none_setbg").slideDown(300);

        //将当前背景对应的图片设置为选中状态
        var imgpath = m_data.mylink_globaldata.imgpath; //获取当前背景图片
        var index = Number(imgpath.split('.')[0])-1;    //获取当前背景图片对应索引
        //获取对应的imgdom对象 并设置选中样式
        var imgbox = document.getElementById('bgimg_box');
        for(var i=0;i<imgbox.children.length;i++){
            if(i==index){
                imgbox.children[i].className = 'min_imgbg_select';
            }
            else{
                imgbox.children[i].className = 'min_imgbg';
            }
        }
        
    }
    //点击切换背景窗口中的图片响应功能  改变被选中图片的样式  将所点击的图片索引暂存到当前模块
    this.clkimg = function(imgindex){
        m_setbg.selectimgindex = imgindex;
        //获取对应的imgdom对象 并设置选中样式
        var imgbox = document.getElementById('bgimg_box');
        for(var i=0;i<imgbox.children.length;i++){
            if(i==imgindex){
                imgbox.children[i].className = 'min_imgbg_select';
            }
            else{
                imgbox.children[i].className = 'min_imgbg';
            }
        }
    }

    //点击save按钮 保存配置 重新加载背景图片
    this.querensetbg = function(){
        //如果为-1说明没有重新选中背景图片 保存无效
        if(m_setbg.selectimgindex == -1){
            return false;
        }
        //更新数据层数据 并将数据保存到本地
        m_data.mylink_globaldata.imgpath = (m_setbg.selectimgindex+1)+'.jpg';
        m_data.savedata();
        //重新加载背景
        m_setbg.loadbg();
        //关闭切换背景窗口
        m_setbg.closesetbgwindow();
        //关闭设置窗口
        m_shezhi.closerightmenu();
        return false;
    }
    //关闭切换背景弹窗
    this.closesetbgwindow = function(){
        $("#none_setbg").slideUp(300);
    }
}
var m_setbg = new module_setbg();
export { m_setbg }
