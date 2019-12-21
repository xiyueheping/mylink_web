
/**
 * 关于网址处理功能的模块
 *
 * 模块变量：http_data
 */

//导入数据层管理模块
import { m_data } from "./data.js"

var module_http = function() {

    //当前模块的全局变量（后期从数据层对象中加载）
    var http_data = null;
    
    //当前网址分页信息（后期从数据层对象中加载）
    var thistype = null;
    //加载页面默认执行 把数据层对象信息更新到全局对象http_data 并进行渲染
	this.http_chushihua = function(){
                    http_data = m_data.mylink_globaldata.httpdata;
                    thistype = m_data.mylink_globaldata.thistype;
                    
                    //根据更新的 http_data 网址数据渲染页面
                    this.xuanran_httptype(thistype);
                    this.xuanran_httpdata(thistype,false); //初始加载默认渲染第一个分类，不显示jQuery动画
	}

    //添加网址   先更新http_data与数据层对象 再将数据保存到本地  再根据内存http_data渲染页面
    this.http_add = function() {

                    //获取新的网址对象
                    var name= document.getElementById('foot_input_name').value.trim();
                    var href= document.getElementById('foot_input_href').value.trim();
                    var type= document.getElementById('foot_fenlei').value;
                    var new_httpobj =  {
                     	     name:name,
                     	     href:href,
                     	     type:type
                     }
                     //对网址对象格式进行验证 验证不通过直接返回
                    if (this.check_http(new_httpobj) == false) {
                    	return;
                    }
                    if(teststr(new_httpobj.name)===false){
                        alert('添加失败:网址名称只能由字母数字下划线组成');
                        return;
                    }

                    //读取出新网址所在分类
                    var http_arr = [];
                    for(var i =0;i<http_data.length;i++){
                        if(http_data[i].type==new_httpobj.type){
                                  http_arr = http_data[i];
                        }
                    }

                    /*****对网址信息比对查看是否有分类空间不足情况***/
                   var len = document.querySelectorAll('#content td').length;//获取table中所有td标签数量
                    if(http_arr.data.length>=len){
                        alert('添加失败：当前分类没有空间');
                        return;
                    }
                    /*查看是否有网址同名现象*/
                     for(var i = 0;i<http_data.length;i++){
                         for(var j = 0;j<http_data[i].data.length;j++){

                             if(new_httpobj.name == http_data[i].data[j].name){
                                 alert('添加失败：该网址名已存在');
                                 return;
                             }
                         }
                     }


                     //正式把数据添加到http_data对象中
                     for(var i =0;i<http_data.length;i++){
                         if(http_data[i].type==new_httpobj.type){
                             var obj = {
                                 name:new_httpobj.name,
                                 href:new_httpobj.href
                             }
                             http_data[i].data.push(obj);
                             break;
                         }
                     }
                     
                     //根据http_data数据更新数据层全局对象
                     m_data.mylink_globaldata.httpdata = http_data;
                     //将新的数据层全局对象保存到本地
                     m_data.savedata();
                     //重新渲染页面
                     this.xuanran_httptype(new_httpobj.type);
                     this.xuanran_httpdata(new_httpobj.type,false);

   }

    //删除网址 根据name删除 先更新http_data 再将数据保存到本地  再根据内存http_data渲染页面
    this.http_del = function(name){
                
                //根据name寻找出匹配的网址数据在http_data进行删除
                 for(var i = 0;i<http_data.length;i++){
                     for(var j = 0;j<http_data[i].data.length;j++){
                         if(name == http_data[i].data[j].name){
                             http_data[i].data.splice(j,1);
                             break;
                         }
                     }
                 }
                 // console.log('---删除成功');
                 // console.log(name);
                 var title_arr = document.getElementsByClassName('httptitle');

                 //寻找当前页面的分类
                 var type = '';
                 for(var i = 0;i<title_arr.length;i++){

                     if (title_arr[i].style.color == 'red') {
                         type = title_arr[i].innerHTML;
                     }
                 }


                 //根据http_data数据更新数据层全局对象
                 m_data.mylink_globaldata.httpdata = http_data;
                 //将新的数据层全局对象保存到本地
                 m_data.savedata();
                 //重新渲染页面
                 this.xuanran_httptype(type);
                 this.xuanran_httpdata(type,false);

                 return false;

  }
    //根据name上移网址 先更新http_data 再将数据保存到本地  再根据内存http_data渲染页面
    this.http_moveup = function (name) {
        var name = name;           //记录下网址名称
        var type = this.gettype(); //获取当前网址所在分类
        var type_index;            //保存当前分类在全局对象中的下标位置
        var name_index;            //保存当前网址在当前分类下的下标位置
       

        //寻找当前分类的下标位置
        for(var i =0;i<http_data.length;i++){
            if(http_data[i].type===type){
                // console.log('=============');
                // console.log(http_data[i]);
                type_index = i;
                // console.log(i);
                break;
            }
        }
        //寻找当前网址在当前分类下的下标位置
        for(var i = 0;i<http_data[type_index].data.length;i++){
            if(http_data[type_index].data[i].name === name){
                name_index = i;
            }
        }
        //如果该网址就在第一个位置 直接返回
        if(name_index===0){
            alert('已在顶端无法上移');
            return;
        }
        //否则可以进行移动 将当前网址与上一个网址进行交换
        var httpobj = http_data[type_index].data[name_index-1];
        http_data[type_index].data[name_index-1] = http_data[type_index].data[name_index];
        http_data[type_index].data[name_index] = httpobj;


         //根据http_data数据更新数据层全局对象
         m_data.mylink_globaldata.httpdata = http_data;
         //将新的数据层全局对象保存到本地
         m_data.savedata();
         //重新渲染页面
         this.xuanran_httptype(type);
         this.xuanran_httpdata(type,false);

    }
    //根据name下移网址 先更新http_data 再将数据保存到本地  再根据内存http_data渲染页面
    this.http_movedown = function (name) {
        var name = name;           //记录下网址名称
        var type = this.gettype(); //获取当前网址所在分类
        var type_index;            //保存当前分类在全局对象中的下标位置
        var name_index;            //保存当前网址在当前分类下的下标位置
        
        //寻找当前分类的下标位置
        for(var i =0;i<http_data.length;i++){
            if(http_data[i].type===type){
                // console.log('=============');
                // console.log(http_data[i]);
                type_index = i;
                // console.log(i);
                break;
            }
        }
        //寻找当前网址在当前分类下的下标位置
        for(var i = 0;i<http_data[type_index].data.length;i++){
            if(http_data[type_index].data[i].name === name){
                name_index = i;
            }
        }
        //如果该网址就在第一个位置 直接返回
        if(name_index===http_data[type_index].data.length-1){
            alert('已在底端无法下移');
            return;
        }

        //否则可以进行移动 将当前网址与下一个网址进行交换
        var httpobj = http_data[type_index].data[name_index+1];
        http_data[type_index].data[name_index+1] = http_data[type_index].data[name_index];
        http_data[type_index].data[name_index] = httpobj;

         //根据http_data数据更新数据层全局对象
         m_data.mylink_globaldata.httpdata = http_data;
         //将新的数据层全局对象保存到本地
         m_data.savedata();
         //重新渲染页面
         this.xuanran_httptype(type);
         this.xuanran_httpdata(type,false);

    }
    //根据name编辑网址
    this.http_edit = function (name) {

        //显示网址编辑框
        document.getElementById('none_httpedit').style.display = 'block';
        var name = name;  //保存当前网址名称
        var href = '';    //保存当前网址地址
        var type = this.gettype(); //获取当前分类
        var type_arr = [];  //获取所有分类

        for(var i=0;i<http_data.length;i++){
            type_arr.push(http_data[i].type);
        }
        //获取当前网址的链接地址
        for(var i = 0;i<http_data.length;i++){
            for(var j = 0;j<http_data[i].data.length;j++){

                if(name == http_data[i].data[j].name){
                    href = http_data[i].data[j].href;
                }
            }
        }
        //根据当前网址和分类信息 渲染编辑框
        document.getElementById('input_name_fsl').value = name;
        document.getElementById('input_href_fsl').value = href;
        var xialakuang = document.getElementById('input_type_fsl');
        xialakuang.innerHTML = '';
        for(var i = 0;i<type_arr.length;i++){
            xialakuang.insertAdjacentHTML('beforeend',`<option value ="${type_arr[i]}">${type_arr[i]}</option>`);
        }
        //设置下拉框默认内容为当前选择分类
        document.getElementById('input_type_fsl').value = type;
    }
    //点击网址编辑框确认修改按钮执行函数
    this.http_querenxiugai = function () {
        //保存修改之前的网址信息
        var beforename = document.getElementById('none_menu_a').title;
        var beforehref = '';
        var beforetype = this.gettype(); //获取当前分类
        for(var i = 0;i<http_data.length;i++){
            for(var j = 0;j<http_data[i].data.length;j++){
                if(beforename == http_data[i].data[j].name){
                    beforehref = http_data[i].data[j].href;
                }
            }
        }

        //保存修改之后的网址信息
        var aftername = document.getElementById('input_name_fsl').value.trim();
        var afterhref = document.getElementById('input_href_fsl').value.trim();
        var aftertype = document.getElementById('input_type_fsl').value;

        //如果数据没有修改 不做任何响应 直接返回
        if(beforename==aftername&&beforehref==afterhref&&beforetype==aftertype){
            alert('请填写有效数据');
            return false;
        }
        if(teststr(aftername)===false){
            alert('修改失败:网址名称只能由字母数字下划线组成');
            return false;
        }
        //对网址对象格式进行验证 验证不通过直接返回
        var afterobj = {
            name:aftername,
            href:afterhref,
            type:aftertype
        }
        if (this.check_http(afterobj) === false) {
            return false;
        }

        //判断修改后的网址名是否重复
        for(var i = 0;i<http_data.length;i++){
            for(var j = 0;j<http_data[i].data.length;j++){
                if(afterobj.name == http_data[i].data[j].name&&afterobj.name!=beforename){
                    alert('该网址名已存在');
                    return false;
                }
            }
        }

        //对全局对象进行修改
        //如果网址标题分类没有改变 直接将旧的网址数据覆盖
        if(beforetype === aftertype){
            for(var i = 0;i<http_data.length;i++){
                for(var j = 0;j<http_data[i].data.length;j++){
                    //寻找出原网址位置直接覆盖
                    if(beforename == http_data[i].data[j].name){
                        http_data[i].data[j] = afterobj;
                        // console.log('---修改网址成功');
                        // console.log(http_data);
                        break;
                    }
                }
            }
        }

        //如果网址标题分类改变了，要先删除旧的数据，再添加新的数据
        if(beforetype!=aftertype){

            //根据name寻找出旧的网址数据进行删除
            for(var i = 0;i<http_data.length;i++){
                for(var j = 0;j<http_data[i].data.length;j++){
                    if(beforename == http_data[i].data[j].name){
                        http_data[i].data.splice(j,1);
                        break;
                    }
                }
            }
            //再把新的数据添加到全局对象中
            for(var i =0;i<http_data.length;i++){
                if(http_data[i].type==afterobj.type){
                    var obj = {
                        name:afterobj.name,
                        href:afterobj.href
                    }
                    http_data[i].data.push(obj);
                    break;
                }
            }

        }
        
        //改变当前网址分页内容
        thistype = afterobj.type

        //根据http_data数据更新数据层全局对象
        m_data.mylink_globaldata.httpdata = http_data;
        //将新的数据层全局对象保存到本地
        m_data.savedata();

        //修改成功后关闭网址编辑框
        document.getElementById('none_httpedit').style.display = 'none';

        //重新渲染页面
        this.xuanran_httptype(thistype);
        this.xuanran_httpdata(thistype,false);

        
        return true;
    }
    
    //上滚鼠标
    this.scollup = function () {
        var index = null;  //获取当前分页下标
        var arr = document.getElementsByClassName('httptitle');
        for(var i = 0;i<arr.length;i++){
            if(arr[i].innerHTML == thistype){
                index = i;
            }
        }
        if(index-1 < 0 || index == null){
            return;
        }
        else{
            this.httptitleclick(arr[index-1].innerHTML);
        }

    }
    //下滚鼠标
    this.scolldown = function () {
        var index = null;  //获取当前分页下标
        var arr = document.getElementsByClassName('httptitle');
        for(var i = 0;i<arr.length;i++){
            if(arr[i].innerHTML == thistype){
                index = i;
            }
        }
        if(index+1 == arr.length ||index == null){
            return;
        }
        else{
            this.httptitleclick(arr[index+1].innerHTML);
        }

    }
    
    //点击网址标题后执行函数  将新的分页保存到内存 再保存到本地 再根据内存渲染页面
    this.httptitleclick = function (type) {
        //将所点击的分页信息更新到内存
        thistype = type; //更新当前模块分页
        m_data.mylink_globaldata.thistype = type; //更新数据层模块分页

	    //如果只是切换网址分类页 不用把数据更新到服务器
        // m_data.savedata();
        
        //重新对分类和网址进行渲染
        this.xuanran_httptype(type);
        this.xuanran_httpdata(type,true);
  }  
  
    //点击添加网址分类按钮响应函数
    this.addtitle = function () {
      var str = prompt("请输入分类名称:");
      if(str == null){
          return;
      }

      // console.log(str.trim());
      if (str.trim().length==0){
          alert('分类名称不能为空！');
          return;
      }
      if (str.trim().length>10){
          alert('分类名称过长！');
          return;
      }
        if(teststr(str.trim())===false){
            alert('添加失败:分类名称只能由字母数字下划线组成');
            return;
        }

      var type = str.trim();
      
      if(http_data.length>=13){
          alert('分类空间不足');
          return;
      }
      for(var i = 0;i<http_data.length;i++){
          if(type==http_data[i].type){
              alert('该分类名已存在');
              return;
          }
      }
      //把新的分类添加到全局对象中
      http_data.push({
          type:type,
          data:[]
      });




      //更新当前分类页信息 到内存
      thistype = type; //更新当前模块分页
      m_data.mylink_globaldata.thistype = type; //更新数据层模块分页

      //更新网址数据到内存
      m_data.mylink_globaldata.httpdata = http_data;

      // 把新的数据层全局对象保存到本地并根据内存渲染页面
      m_data.savedata();
      this.xuanran_httptype(type);
      this.xuanran_httpdata(type,true);


  }
    //点击编辑网址分类按钮响应函数
    this.edittitle = function (type) {
        var redtype = this.gettype(); //获取当前页面的分类标题
        var beforetype = type;              //保存需要编辑的标题
        var aftertype =  prompt('输入新的分类名称:',beforetype);  //保存编辑后的标题名称

        //如果编辑的分类就是当前页面分类 那就把修改后的标题名赋值给当前标题
        if (redtype == beforetype) {
            redtype = aftertype;
        }
        //对标题数据进行格式验证
        if (aftertype === null){
            return;
        }
        aftertype = aftertype.trim();
        if(aftertype == ''){
            alert('请输入完整数据');
            return;
        }
        if(aftertype == beforetype){
            alert('请输入有效数据');
            return;
        }
        if(teststr(aftertype)===false){
            alert('修改失败:分类名称只能由字母数字下划线组成');
            return;
        }

        
        //如果新的分类重名 直接return
        for(var i = 0;i<http_data.length;i++){
            if(aftertype == http_data[i].type){
                alert('该分类名称已存在');
                return;
            }
        }
        //对数据进行修改
        for(var i = 0;i<http_data.length;i++){
            if(beforetype == http_data[i].type){
                http_data[i].type = aftertype;
            }
        }
        
       //更新当前分类页信息 到内存
       thistype = redtype; //更新当前模块分页
       m_data.mylink_globaldata.thistype = redtype; //更新数据层模块分页

       //更新网址数据到内存
       m_data.mylink_globaldata.httpdata = http_data;

       // 把新的数据层全局对象保存到本地并根据内存渲染页面
       m_data.savedata();
       this.xuanran_httptype(redtype); //只渲染标题即可 因为页面网址数据不变

    }

    //点击删除网址分类按钮响应函数
    this.deltitle = function (type) {
        thistype = this.gettype(); //获取当前页面的分类标题
        var type = type;              //保存需要删除的标题
        if(!window.confirm('删除分类会删除该分页下所有网址，是否确认删除?')){
            return;
        }

        //修改http_data 删除对应分类下所有数据
        for (var i = 0;i<http_data.length;i++){
            if(type === http_data[i].type){
                http_data.splice(i,1);
                break;

            }
        }

        //如果删除的分类就是当前页面分类  那就把第一个分类做为当前页面分类进行渲染
        if(type == thistype){
            //如果数据为空就给当前分类赋值null 并更新到内存 保存到本地
            if(http_data.length==0){
                thistype = null;
                m_data.mylink_globaldata.thistype = null;
                m_data.mylink_globaldata.httpdata = http_data;

                // 把数据层全局对象保存到本地 根据内存数据对页面重新渲染
                console.log(http_data);
                m_data.savedata();
                this.xuanran_httptype(thistype);
                this.xuanran_httpdata(thistype,false);

            }
            //如果本地数据不为空 那就把第一个分类做为当前页面分类进行渲染
            else{
                thistype = http_data[0].type;
                m_data.mylink_globaldata.thistype = http_data[0].type;
                m_data.mylink_globaldata.httpdata = http_data;

                // 把数据层全局对象保存到本地 根据内存数据对页面重新渲染
                m_data.savedata();
                this.xuanran_httptype(thistype);
                this.xuanran_httpdata(thistype,false);
 
            }
        }
        //如果要删除的分类不是当前页面分类 只需要重新渲染标题数据 只需要修改本地网址数据 thistype不变
        else{
            m_data.mylink_globaldata.httpdata = http_data;

            // 把数据层全局对象保存到本地 根据内存数据对页面重新渲染
            m_data.savedata();
            this.xuanran_httptype(thistype); //只渲染标题
        }

    }

    // 工作到此-----------------------
    //点击上移网址分类按钮响应函数 传入需要移动的标题
    this.moveuptitle = function (type) {
        var redtype = this.gettype(); //获取当前页面的分类标题
        var type = type;              //保存需要移动的标题
        var type_index;               //保存当前分类的下标位置
 
        //寻找当前分类下标位置
        for (var i = 0;i<http_data.length;i++){
            if(type == http_data[i].type){
                type_index = i;
                break;
            }
        }
        //如果当前网址分类在顶端 直接返回
        if (type_index == 0){
            alert('已在顶端，无法上移');
            return;
        }
        //否则直接交换分类
        var obj = http_data[type_index-1];
        http_data[type_index-1] = http_data[type_index];
        http_data[type_index] = obj;
        
        //更新网址数据到内存
        m_data.mylink_globaldata.httpdata = http_data;

        // 把新的数据层全局对象保存到本地并根据内存渲染页面
        m_data.savedata();
        this.xuanran_httptype(redtype); //只渲染标题即可 因为页面网址数据不变
    }
    //点击下移网址分类按钮响应函数 传入需要移动的标题
    this.movedowntitle = function (type) {
        var redtype = this.gettype(); //获取当前页面的分类标题
        var type = type;              //保存需要移动的标题
        var type_index;               //保存当前分类的下标位置
        
        //寻找当前分类下标位置
        for (var i = 0;i<http_data.length;i++){
            if(type == http_data[i].type){
                type_index = i;
                break;
            }
        }
        //如果当前网址分类在顶端 直接返回
        if (type_index == http_data.length-1){
            alert('已在底端，无法下移');
            return;
        }
        //否则直接交换分类
        var obj = http_data[type_index+1];
        http_data[type_index+1] = http_data[type_index];
        http_data[type_index] = obj;

        //更新网址数据到内存
        m_data.mylink_globaldata.httpdata = http_data;

        // 把新的数据层全局对象保存到本地并根据内存渲染页面
        m_data.savedata();
        this.xuanran_httptype(redtype); //只渲染标题即可 因为页面网址数据不变
    }

     /*****基本函数，供上层函数调用******/
     //根据更新的全局对象渲染网址分类标题信息
     this.xuanran_httptype = function(type) {
        // console.log('---开始渲染网址分类标题信息');
         if(type == null){
             var none_httptitle_nav = document.getElementById('none_httptitle_nav');
             none_httptitle_nav.innerHTML = `<li><a id="alltitle">所有分类</a></li>
                                         <li><a onclick="m_event.addtitle()" id="addtitle">+</a></li>`;
             var xialakuang = document.getElementById('foot_fenlei');
             xialakuang.innerHTML = '';
             return;
         }
         
         //从全局对象中提取出所有分类标题放到一个type数组中
         var type_arr = [];
         for(var i = 0;i<http_data.length;i++){
             type_arr[i] = http_data[i].type;
         }
         // console.log(type_arr);
         if(type_arr.length>13){
             alert('分类空间已满');
             return;
         }
         //首先渲染右上角菜单分类信息
         var none_httptitle_nav = document.getElementById('none_httptitle_nav');
         none_httptitle_nav.innerHTML = `<li><a id="alltitle">所有分类</a></li>
                                         <li><a onclick="m_event.addtitle()" id="addtitle">+</a></li>`;

         var addtitle = document.getElementById('addtitle');
         for(var i = 0;i<type_arr.length;i++){
             if(type_arr[i]==type){
                 addtitle.insertAdjacentHTML('beforebegin', `<li>
                                              <a style="color: red"  onclick="m_event.httptitle_click(event)" class="httptitle">${type_arr[i]}</a></li>`);
             }
             else{
                 addtitle.insertAdjacentHTML('beforebegin', `<li>
                                              <a style="color: black"  onclick="m_event.httptitle_click(event)" class="httptitle">${type_arr[i]}</a></li>`);
             }
         }

         //渲染foot下拉框中分类信息
         var xialakuang = document.getElementById('foot_fenlei');
         xialakuang.innerHTML = '';
         for(var i = 0;i<type_arr.length;i++){
             xialakuang.insertAdjacentHTML('beforeend',`<option value ="${type_arr[i]}">${type_arr[i]}</option>`)
         }
         //设置下拉框默认内容为当前选择分类
         document.getElementById('foot_fenlei').value = type;
     }

    //根据更新的全局对象渲染网址内容信息 flag_fade为true说明渲染时显示动画效果，否则不显示
    this.xuanran_httpdata = function(type,flag_fade) {
        // console.log('---开始渲染网址内容信息');
         //如果type值为null说明网址数据为空 不渲染数据 直接return
         if(type==null){
            var table = document.getElementById('content');//渲染前将表格进行初始化
            table.style.display = 'none';
            table.innerHTML = `<tr><td></td><td></td><td></td><td></td><td></td></tr>
                               <tr><td></td><td></td><td></td><td></td><td></td></tr>
                               <tr><td></td><td></td><td></td><td></td><td></td></tr>`;
             return;
         }


        var data = null; //保存要渲染的分类和网址
        //根据type值选择要渲染的分类
        for(var i = 0;i<http_data.length;i++){
            if(http_data[i].type == type){
                data = http_data[i].data;
                break;
            }
        }
        
        // console.log(data);
        var table = document.getElementById('content');//渲染前将表格进行初始化
        table.style.display = 'none';
        table.innerHTML = `<tr><td></td><td></td><td></td><td></td><td></td></tr>
                           <tr><td></td><td></td><td></td><td></td><td></td></tr>
                           <tr><td></td><td></td><td></td><td></td><td></td></tr>`;
        var td_arr = document.querySelectorAll('#content td');//获取table中所有td标签

        //对网址可用空间进行检验
        if(data.length>td_arr.length){
            alert('当前分类网址空间已满');
            return;
        }
        for(var i = 0;i<data.length;i++){
             td_arr[i].innerHTML = `<a target="_blank" class="httpabox" title="${data[i].name}" name = "${data[i].name}"  href="${data[i].href}">
                <img class="httpimg" style="display: none"  onload="m_event.imgonload(event)" src=${this.getico(data[i].href)}>
                <div class="httpimg2" style="display: inline-block;">${data[i].name[0]}</div>
                <div class="httpname">${data[i].name}</div>
                <img style="display: none" onclick="return m_event.http_del(event)" title="删除" class="http_del" src="src/images/http_del.png">
            </a>`
        }
        if(flag_fade == true){
            //将整个table淡出显示
            $("#content").fadeIn(800);
        }else{
            document.getElementById('content').style.display = 'block';
        }
        
    }

    //获取一个url对应的图标路径
    this.getico = function (url) {

            var arr = url.split('/');
            var net = "https://"+arr[2];
            var url_ico = net + "/favicon.ico";
            return url_ico;

    }

    //网址信息验证 传入网址信息，返回验证结果
    this.check_http = function(new_httpobj){
            /****表单验证部分*****/
            if(new_httpobj.name==""||new_httpobj.href==""||new_httpobj.type==""){
                 alert("请输入完整数据");
                  return false;}
     
            //正则表达式判断网址格式
             var box=/^http:\/\/.*$|^https:\/\/.*$/
             if(!box.test(new_httpobj.href)){
                new_httpobj.href="https://"+new_httpobj.href;}
     
            //控制名称长度 若name太长直接return
             if(new_httpobj.name.length>20){
              alert('网址名称过长');
               return false;
             }
     
           return true;
     }
    //如果一个字符串只能由字母数字下划线空格组成且不是空字符串便返回true
    function teststr(str){
        var patt1=new RegExp("^[\u4e00-\u9fa50-9a-zA-Z\_ ]+$");
        return(patt1.test(str));
    }
    
    //获取当前分类标题
    this.gettype = function () {
        var arr = document.getElementsByClassName('httptitle');
        for(var i = 0;i<arr.length;i++){
            if(arr[i].style.color == 'red'){
                return arr[i].innerHTML;
            }
        }
    }
}

var m_http = new module_http();
export { m_http }