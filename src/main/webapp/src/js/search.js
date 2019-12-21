/**
 * 实现搜索引擎切换功能的模块
 * 
 ***/
//导入数据层管理模块
import { m_data } from "./data.js"
function module_serch(){
     // 初始化本地存储中的搜索信息
     this.setsearch = function(){
             
               var search = m_data.mylink_globaldata.thissearch; //从数据层对象获取当前搜索引擎

               //渲染搜索按钮value值
               document.getElementById('top_from_button').value=search;

               //根据·不同搜索引擎给搜索表单设置对应的action与name
               if (window.localStorage.getItem('mylink_search')=='百度搜索') {
                   document.getElementById('top_form').action='https://www.baidu.com/s';
                   document.getElementById('top_from_search').name='wd'
               }
               else if(window.localStorage.getItem('mylink_search')=='搜狗搜索'){
                   document.getElementById('top_form').action='https://sogou.com/web';
                   document.getElementById('top_from_search').name='query'
               }
               else if(window.localStorage.getItem('mylink_search')=='谷歌搜索'){
                   document.getElementById('top_form').action='https://www.google.com.hk';
                   document.getElementById('top_from_search').name='q'
               }
               else if(window.localStorage.getItem('mylink_search')=='必应搜索'){
                   document.getElementById('top_form').action='https://cn.bing.com/search';
                   document.getElementById('top_from_search').name='wd'
               }
         }

     // 切 换 搜 索 引 擎 的 函 数  每次切换搜索引擎后修改页面信息 更新数据层信息 将数据层信息更新到本地
     this.search_qiehuan = function(){
                
               document.getElementById('top_from_button').onmouseenter = function(){ 
                           document.getElementById('none_search_nav').style.display="block";
               }
               document.getElementById('top_from_button').onmouseleave = function(){
                           document.getElementById('none_search_nav').style.display="none";
               }
               document.getElementById('none_search_nav').onmouseenter = function(){
                           document.getElementById('none_search_nav').style.display="block";
               }
               document.getElementById('none_search_nav').onmouseleave = function(){
                           document.getElementById('none_search_nav').style.display="none"; 
               }
               
               
               document.getElementById('abd').onclick = function(){
                    document.getElementById('top_from_button').value=this.innerHTML;
                    document.getElementById('none_search_nav').style.display="none";
                    document.getElementById('top_form').action='https://www.baidu.com/s';
                    document.getElementById('top_from_search').name='wd';
                    m_data.mylink_globaldata.thissearch = "百度搜索";
                    m_data.savedata();

               }
               
               document.getElementById('asg').onclick = function(){
                    document.getElementById('top_from_button').value=this.innerHTML;
                    document.getElementById('none_search_nav').style.display="none";
                    document.getElementById('top_form').action='https://sogou.com/web';
                    document.getElementById('top_from_search').name='query';
                    m_data.mylink_globaldata.thissearch = "搜狗搜索";
                    m_data.savedata();
               }
             
               document.getElementById('agg').onclick = function(){
                    document.getElementById('top_from_button').value=this.innerHTML;
                    document.getElementById('none_search_nav').style.display="none";
                    document.getElementById('top_form').action='https://www.google.com.hk';
                    document.getElementById('top_from_search').name='q';
                    m_data.mylink_globaldata.thissearch = "谷歌搜索";
                    m_data.savedata();
               }
             
               document.getElementById('aby').onclick = function(){
                   document.getElementById('top_from_button').value=this.innerHTML;
                   document.getElementById('none_search_nav').style.display="none";
                   document.getElementById('top_form').action='https://cn.bing.com/search';
                   document.getElementById('top_from_search').name='q';
                   m_data.mylink_globaldata.thissearch = "必应搜索";
                    m_data.savedata();
               }

     }



}
var m_search = new module_serch();
export { m_search }