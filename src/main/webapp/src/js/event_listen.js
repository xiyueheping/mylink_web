
/**
 * 与事件处理有关的函数 调用所有功能模块，为主入口模块提供服务
 *
 * 模块变量：所有功能模块实例对象
 * 功能函数：onloadevent onclickevent moveinout keydown youjian
 * 基本函数：无
 */

//导入背景图片模块
import { m_setbg } from "./setbg.js"
//导入雪花效果模块
import { m_snow } from "./snow.js"
//导入日期天气模块
import { m_cityweather } from "./city_weather.js"

//导入搜索引擎模块
import { m_search } from "./search.js"
//导入网址数据处理模块
import { m_http } from "./http.js"

//导入翻译模块
import { m_trans } from "./trans.js"

//导入数据层管理模块
import { m_data } from "./data.js"

//导入设置模块
import { m_shezhi } from "./shezhi.js"
var module_event = function() {

    //主onload事件注册
    this.onloadevent = function () {
           //调整页面高度
           document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';
           
           
           var flag = m_data.loaddata();    //从服务器加载数据到数据层对象
           console.log(flag);
           //如果从服务器获取数据失败，后面的函数都不用执行了
           if(!flag){
               return;
           }

           m_setbg.loadbg();     //加载背景图片
           
           

           m_cityweather.showcityweather();    //加载地点天气信息进行渲染

           //间歇调用，每隔一个小时重新刷新一次天气日期信息
           setInterval(function(){
               m_cityweather.showcityweather();
           },1000*60*60)
           

           m_search.setsearch();               //加载页面执行设置搜索引擎函数
           m_search.search_qiehuan();          //注册与搜索引擎有关的事件
           m_http.http_chushihua();            //初始化本地网址数据 进行渲染
           m_snow.snow();                      //执行雪花效果
           
           //添加网址框的显示与隐藏控制
           $("#none_btn_showaddwindow").click(function(){
            $("#foot").slideToggle("slow");
           });



    }
    //由切换背景弹窗中图片元素注册的点击事件
    this.clkimg = function(imgindex){
        m_setbg.clkimg(imgindex);
    }
    
    //由网址标题html元素注册的点击事件
    this.httptitle_click = function (event) {
        // console.log(event.target.style.color);
        //如果点击的标题不是当前页面分类执行httptitleclick函数
        if(event.target.style.color == 'black'){
            m_http.httptitleclick(event.target.innerText);
            this.moveinout(); // 重新注册移入移出事件
        }
    }
    //由网址删除按钮注册的点击事件
    this.http_del = function (event) {
        // alert(event.target.parentNode.name);
        // 把网址name值做为参数传进去
        m_http.http_del(event.target.parentNode.name);
        this.moveinout(); // 重新注册移入移出事件
        return false;

    }
    //由添加网址分类标题按钮注册的点击事件
    this.addtitle = function () {
        m_http.addtitle();
    }

    //由网址图标注册的加载成功事件
    this.imgonload = function (event) {
        //显示当前图片并隐藏备用样式
        event.target.style.display= 'inline-block';
        event.target.nextElementSibling.style.display= 'none';
    }

    //由网址编辑框确认修改按钮响应函数
    this.http_querenxiugai = function () {
        //如果修改成功重新注册移入移出事件
        if(m_http.http_querenxiugai()===true){
            this.moveinout();//重新注册移入移出事件
        }
        return false;
    }
    //处理所有的点击事件
    this.onclickevent = function () {

         var moveinout = this.moveinout;//把移入移出事件处理函数保存到当前变量

        //点击天气详情按钮响应事件
        document.getElementById('top_xiangqing').onclick = m_cityweather.showtianqi;
    
        //点击翻译按钮响应事件
        document.getElementById('top_translate').onclick = m_trans.showtrans;
   
        //点击右上方设置按钮响应事件
        document.getElementById('top_shezhi').onclick = m_shezhi.openrightmenu;
        
        //点击右侧滑动菜单内部关闭按钮响应事件
        document.getElementById('close_rightmenu').onclick = m_shezhi.closerightmenu;
        
        //点击主题背景按钮响应事件
        document.getElementById('btn_bgimage').onclick = m_setbg.showsetbgwindow;

        //点击关闭切换背景窗口按钮响应事件
        document.getElementById('setbg_close').onclick = m_setbg.closesetbgwindow; 
        
        //点击切换背景窗口中save按钮响应事件
        document.getElementById('querensetbg').onclick = m_setbg.querensetbg; 

        //点击导出数据按钮响应事件
        document.getElementById('btn_outputdata').onclick = m_data.outputdata;

        //点击关闭导出数据窗口按钮响应事件
        document.getElementById('output_close').onclick = m_data.closeoutputwindow;
        
        //点击导入数据按钮响应事件
        document.getElementById('btn_inputdata').onclick = m_data.openinputwindow;
        
        //点击确认导入按钮响应事件
        document.getElementById('quereninput').onclick = m_data.doinputdata;

        //点击关闭导入数据窗口按钮响应事件
        document.getElementById('input_close').onclick = m_data.closeinputwindow;
       
        //点击阴影部分关闭已打开弹窗
        document.getElementById('window_bg').onclick = function(event){
            //如果天气详情弹窗已打开 就关闭它
            if(document.getElementById('none_tianqixiangqing').style.display!=='none'){
                m_cityweather.closexiangqing();
            }
            
            //如果翻译弹窗已打开 就关闭它
            if(document.getElementById('none_trans').style.display!=='none'){
                m_trans.close();
            }
            //如果右侧菜单已打开 就关闭它
            if(document.getElementById("rightmenu").style.display!='none'){
                m_shezhi.closerightmenu();
            }
            //如果导出数据窗口已打开 就关闭它
            if(document.getElementById('none_output').style.display!='none'){
                m_data.closeoutputwindow();
            }
            //如果导入数据窗口已打开 就关闭它
            if(document.getElementById('none_input').style.display!='none'){
                m_data.closeinputwindow();
            }

            event.stopPropagation();
        }


        //点击翻译窗口关闭按钮响应事件
        document.getElementById('trans_close').onclick = m_trans.close;
        //点击天气详情窗口关闭按钮响应事件
        document.getElementById('tianqixiangqing_close').onclick = m_cityweather.closexiangqing;
        //点击网址编辑窗口关闭按钮响应事件
        document.getElementById('none_edit_close').onclick = function(){
            document.getElementById('none_httpedit').style.display = 'none';
        }

        //点击底部添加网址按钮
        document.getElementById('foot_addhttp').onclick = function(){
            m_http.http_add();
            moveinout(); // 重新注册移入移出事件
        }

        //点击右键菜单编辑标题响应函数
        document.getElementById('none_edittitle').onclick = function(event){
            //获取当前页面网址分类标题并做为参数传入
             var type = document.getElementById('none_menu_fenlei').title;
             m_http.edittitle(type);
        }
        //点击右键菜单删除标题响应函数
        document.getElementById('none_deltitle').onclick = function(event){
            //获取当前页面网址分类标题并做为参数传入
            var type = document.getElementById('none_menu_fenlei').title;
            m_http.deltitle(type);
            moveinout();
        }
        //点击右键菜单上移标题响应函数
        document.getElementById('none_upmovetitle').onclick = function(event){
            //获取当前页面网址分类标题并做为参数传入
            var type = document.getElementById('none_menu_fenlei').title;
            m_http.moveuptitle(type);

        }
        //点击右键菜单下移标题响应函数
        document.getElementById('none_downmovetitle').onclick = function(event){
            //获取当前页面网址分类标题并做为参数传入
            var type = document.getElementById('none_menu_fenlei').title;
            m_http.movedowntitle(type);

        }

        //点击右键菜单编辑网址按钮
        document.getElementById('youjian_http_edit').onclick = function(event){
             var name = document.getElementById('none_menu_a').title;
             m_http.http_edit(name);
             event.stopPropagation(); //阻止冒泡，防止第一次点击就关闭窗口
        }
        //点击右键菜单删除网址按钮
        document.getElementById('youjian_http_del').onclick = function(event){
            var name = document.getElementById('none_menu_a').title;
            // 把网址name值做为参数传进去
            m_http.http_del(name);
            moveinout(); // 重新注册移入移出事件

        }
        //点击右键菜单上移网址按钮
        document.getElementById('youjian_http_top_move').onclick = function(event) {
            var name = document.getElementById('none_menu_a').title;
            // 把网址name值做为参数传进去
            m_http.http_moveup(name);
            moveinout(); // 重新注册移入移出事件

        }
        //点击右键菜单下移网址按钮
        document.getElementById('youjian_http_bottom_move').onclick = function(event) {
            var name = document.getElementById('none_menu_a').title;
            // 把网址name值做为参数传进去
            m_http.http_movedown(name);
            moveinout(); // 重新注册移入移出事件

        }

    }
     //整屏滚动切换
    this.scroll = function () {

        var moveinout = this.moveinout;

        //监听鼠标滚动事件
        var timer = null;
        $(document).on("mousewheel DOMMouseScroll", function(e) {
           
            //如果有窗口打开，存在阴影 禁止滚动
            if(document.getElementById('window_bg').style.display!='none'){
                return;
            }

            var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
                (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox

            if (delta > 0) {

                // 只执行100毫秒之内触发的最后一个事件
                if(timer != null){
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {

                   m_http.scollup();
                   moveinout(); // 重新注册移入移出事件


                },100);
            }
            else if (delta < 0) {

                if(timer != null){
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                 m_http.scolldown();
                 moveinout(); // 重新注册移入移出事件

                },100);

            }
        });

    }
    //响应主体内容框中所有图标的鼠标移入移出事件
     this.moveinout = function () {
        var arr = document.querySelectorAll('#content a');

        for(var i = 0;i<arr.length;i++){
            arr[i].onmouseenter = function (event) {

                this.children[3].style.display = 'inline-block';
            }
            arr[i].onmouseleave = function (event) {
                this.children[3].style.display = 'none';
            }
        }


     }

     // 响 应 回 车 事 件
     this.keydown = function(){
          var moveinout = this.moveinout;//把移入移出事件处理函数保存到当前变量
          //在网址框中点击回车响应添加网址函数
          document.getElementById('foot_input_name').onkeydown = function(event) {
                   
                   if((event.keyCode||event.which)==13){
                       m_http.http_add();
                       moveinout(); // 重新注册移入移出事件
                   }
              }
          document.getElementById('foot_input_href').onkeydown = function(event) {
                   
                   if((event.keyCode||event.which)==13){
                       m_http.http_add();
                       moveinout(); // 重新注册移入移出事件
                   }
              }


          //在翻译文本框点击回车后进行翻译
          document.getElementById('trans_from').onkeydown = function (event) {
              if((event.keyCode||event.which)==13){
                  m_trans.gettrans();
              }
          }

        }

     //注册鼠标右键事件处理程序
     this.youjian = function(){

                    //点击鼠标右键响应函数
                     window.oncontextmenu = function(e){

                           //对右键菜单进行定位
                           if(e.clientX+100<=innerWidth){
                               var x = e.clientX - 2;
                           }
                           else{
                               var x = e.clientX - 98;
                           }
                           if(e.clientY+140<=innerHeight){
                               var y = e.clientY - 2;
                           }
                           else{
                               var y = e.clientY - 138;
                           }
                    
                           //如果点击的是分类标题 显示对应操作分类标题菜单
                           if(e.target.className == 'httptitle'){
                                document.getElementById('none_menu_fenlei').title = e.target.innerText; //在title属性中记录当前右键哪个分类
                                document.getElementById('none_menu_fenlei').style.left=x+'px';
                                document.getElementById('none_menu_fenlei').style.top=y+'px';
                                document.getElementById('none_menu_fenlei').style.display='block';
                    
                                // console.log('---右键点击了分类');
                               //取消默认的浏览器自带右键
                                e.preventDefault();
                                return;
                    
                           }


                           //如果点击的是网址图标或网址名称或网址本身或网址图标替代样式
                           else if(e.target.className == 'httpimg'
                               ||e.target.className == 'httpname'
                               ||e.target.className == 'httpabox'
                               ||e.target.className == 'http_del'
                               ||e.target.className == 'httpimg2'){

                               //把当前点击的网址名称记录在菜单的title属性中
                               if(e.target.className == 'httpabox'){
                                   // console.log('---右键点击了网址')
                                   // console.log(e.target.name);
                                   document.getElementById('none_menu_a').title = e.target.name;
                               }
                               else{
                                   // console.log('---右键点击了网址')
                                   // console.log(e.target.parentNode.name);
                                   document.getElementById('none_menu_a').title = e.target.parentNode.name;
                               }

                                
                                document.getElementById('none_menu_a').style.left=x+'px';
                                document.getElementById('none_menu_a').style.top=y+'px';
                                document.getElementById('none_menu_a').style.display='block';
                                // console.log('---右键点击了超链接');
                           
                                //取消默认的浏览器自带右键
                                e.preventDefault();
                                return;
                           }

                         //如果点击的是其他对象则只取消默认的浏览器自带右键
                         e.preventDefault();
                          return;
                           
                        
                        }

                    
                       /****************触发事件隐藏右键菜单函数**********************/
                         document.getElementById('none_menu_fenlei').onclick = function(){
                           document.getElementById('none_menu_fenlei').style.display='none';
                         }
                         document.getElementById('none_menu_fenlei').onmouseleave = function(){
                           document.getElementById('none_menu_fenlei').style.display='none';
                         }
                         document.getElementById('none_menu_a').onclick = function(){
                           document.getElementById('none_menu_a').style.display='none';
                         }
                         document.getElementById('none_menu_a').onmouseleave = function(){
                           document.getElementById('none_menu_a').style.display='none';
                         }


        }
}

var m_event = new module_event();
export { m_event }