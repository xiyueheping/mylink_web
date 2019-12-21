import { m_http } from "./http";
import { m_setbg } from "./setbg";
import { m_search } from "./search";
import { m_shezhi } from "./shezhi";

/**
 * 关于本地数据处理功能的模块
 * 所有与本地localStorage有关的功能都要放到此模块
 */
var module_data = function() {
   //默认所有全局数据
   this.mylink_globaldata;
   
   //从服务器加载全局数据
   this.loaddata = function(){
         
        //服务器根路径
        var webpath = "http://localhost:8080/mylink_web/";
        var self = this;
        
            $.ajax({
                url: webpath + "user/getdata", //请求的地址
                type: 'GET', //请求的方式'GET'或'POST'
                data:{
                }, 
                dataType: 'json',//设置返回内容的数据类型
                async:false, //同步请求
                timeout: 8000,//设置超时，请求超过了这个时间值就会结束请求
                error: function(xhr,errorText,errorType){//响应失败时执行的错误处理函数
                    console.log("服务器异常");
                    document.write("<h3>服务器繁忙</h3>");
                     },
                success:function(response,stutas,xhr){//响应成功后执行的回调函数
                       console.log(response);
                       if(response.msg == "登录态验证失败"){
                           document.write("<h3><a href='./login.html'>请先登录</a></h3>");
                           return false;
                       }
                       var obj = JSON.parse(response.userdata);
                       console.log(obj);
                       self.mylink_globaldata = obj;
                    }
                })
        
        
        return true;
   }


   //将全局数据更新到本地
   this.savedata = function(){
       console.log("将全局数据更新到服务器");
       var str = JSON.stringify(this.mylink_globaldata);//把全局json对象转换成字符串
    //    localStorage.setItem("mylink_globaldata",str);

       //服务器根路径
       var webpath = "http://localhost:8080/mylink_web/";
       var self = this;

       try{
        $.ajax({
            url: webpath + "update/setuserdata", //请求的地址
            type: 'GET', //请求的方式'GET'或'POST'
            data:{
                userdata:str
            }, 
            dataType: 'json',//设置返回内容的数据类型
            async:false, //同步请求
            timeout: 8000,//设置超时，请求超过了这个时间值就会结束请求
            error: function(xhr,errorText,errorType){//响应失败时执行的错误处理函数
                 console.log("服务器异常");
                 return false;
                 },
            success:function(response,stutas,xhr){//响应成功后执行的回调函数
                   console.log(response);
                   if(response.msg == "登录态验证失败"){
                      //  document.write("<h3><a href='./login.html'>请先登录</a></h3>");

                      alert(response.msg);
                       return false;
                   }
                   console.log(response.msg);
                }
            })
       }catch(e){
          console.log("服务器异常");
          return false;
       }
       return true;



   }

   //由事件层调用 打开导出数据窗口 导出本地数据
   this.outputdata = function(){
       //打开导出窗口之前先判断导入窗口和主题背景窗口是否打开，如果打开先关闭它们
       if(document.getElementById('none_input').style.display!='none'){
           m_data.closeinputwindow();
       }
       if(document.getElementById('none_setbg').style.display!='none'){
           m_setbg.closesetbgwindow();
       }

       var jsonstr = JSON.stringify(m_data.mylink_globaldata);
      //  $("#window_bg").fadeIn(300);
       $("#none_output").slideDown(300);
       document.getElementById('output_data').value = jsonstr;
   }

   //由事件层调用 关闭导出数据窗口 
   this.closeoutputwindow = function(){
    //   $("#window_bg").fadeOut(300);
      $("#none_output").slideUp(300);
   }

   //由事件层调用 打开导入数据窗口
   this.openinputwindow = function(){
     //打开导入窗口之前先判断导出窗口和主题背景窗口是否打开，如果打开先关闭它们
     if(document.getElementById('none_output').style.display!='none'){
         m_data.closeoutputwindow();
     }
     if(document.getElementById('none_setbg').style.display!='none'){
         m_setbg.closesetbgwindow();
     }
    $("#none_input").slideDown(300);
   }
   //获取导入的数据重新加载相关数据并渲染页面 点击确认导入执行
   this.doinputdata = function(){
      var jsonstr = document.getElementById('input_data').value.Trim();
      if(jsonstr.length==0){
            alert('数据不能为空');
            return false;
      }
      if(!m_data.checkjsonstr(jsonstr)){    
            alert('数据有误');
            return false;
      }
      if(window.confirm("是否确认覆盖原有数据，该操作不可恢复！")){
           //将新导入数据保存到服务器
           var obj = JSON.parse(jsonstr);
           m_data.mylink_globaldata = obj;
           m_data.savedata();
           
          //重新加载数据 渲染页面
          m_data.loaddata();
          m_http.http_chushihua();
          m_setbg.loadbg();
          m_search.setsearch();
          m_data.closeinputwindow();  //关闭导入数据窗口
          m_shezhi.closerightmenu();  //关闭右侧菜单
          m_event.moveinout();        //重新注册鼠标移入移出事件
      }
      
      return false;
   }
   //由事件层调用 关闭导入数据窗口 
   this.closeinputwindow = function(){
    //    $("#window_bg").fadeOut(300);
       $("#none_input").slideUp(300);
   }

   //对导入的json字符串进行检验
   this.checkjsonstr = function(jsonstr){
        //如果导入数据不能转化为合法js对象则return false
        var jsonobj = null;
        try{
           jsonobj = JSON.parse(jsonstr);
        }catch(e){
            return false;
        }
        //如果全局对象的一级属性不存在 return false
        if(
            jsonobj.thistype===undefined
          ||jsonobj.thissearch===undefined
          ||jsonobj.imgpath===undefined
          ||jsonobj.httpdata===undefined
          ){
            return false;
          }
       return true;
   }
}

var m_data = new module_data();
export { m_data }