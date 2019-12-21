/**
 * 实现地点信息，天气预报数据的处理的模块
 *
 * 模块变量：city json_data_weather
 * 成员函数：showcityweather showtianqi closexiangqing
 * 基本函数：getweather
 */

var module_city_weather = function() {

     //当前模块的全局变量
      var json_data_weather = null; //暂存天气数据

    /**
     * 模块的成员函数，供外层事件处理模块调用
     */
    // 获取当前地点天气信息并渲染https://www.tianqiapi.com/api/?appid=89336239&appsecret=hU8TwE52&city=
      this.showcityweather = function(){
           $.ajax({
            type: 'GET',
            url: 'https://www.tianqiapi.com/api/?appid=89336239&appsecret=hU8TwE52&city=',
            dataType: 'json',
            error: function () {
                // alert('请求失败');
                document.getElementById("top_weather").innerHTML = "Failed to load...";
            },
            success: function (res) {
                // alert('请求成功')
                console.log('获取天气数据成功:'+new Date())
                console.log(res)
                json_data_weather = res;
                var arr = res.data[0].date.split("-")  //获取当前日期 年月日
                var date = arr[1]+ '月' + arr[2] + '日';
                var week = res.data[0].week; //获取当前星期
                var city = res.city;  //获取当前城市
                var wendu = res.data[0].tem1 + '~' + res.data[0].tem2 //获取今天温度
                var todayweather = res.data[0].wea + '  ' + wendu; //获取今天天气
                
            

                document.getElementById('top_date').innerHTML = date
                document.getElementById('top_week').innerHTML = week
                document.getElementById('top_city').innerHTML = city
                document.getElementById('top_weather').innerHTML = todayweather
                document.getElementById('top_xiangqing').innerHTML = '天气详情'
            }
        });
      }

      // 点击页面天气详情按钮响应此函数
      this.showtianqi = function(event) {

             //若天气数据加载错误直接return；
             if (json_data_weather == null) {
                 alert('showtianqi：天气信息加载失败');
                 return;
             }
             // console.log(json_data_weather);
             //显示天气详情窗口
             $("#none_tianqixiangqing").slideDown(300);
             $("#window_bg").fadeIn(300);
             console.log('打开了天气详情窗口');



             //根据天气详情数据渲染整个表格
             var obj = json_data_weather.data;

             var array_datedom = document.getElementsByClassName('date');
             var array_weather = document.getElementsByClassName('weather');
             var array_wendu = document.getElementsByClassName('wendu');
             var array_fengxiang = document.getElementsByClassName('fengxiang');
             var array_fengli = document.getElementsByClassName('fengli');
             for(var i = 0; i < 7; i++){
                 array_datedom[i].innerHTML = obj[i].date;
                 array_weather[i].innerHTML = obj[i].wea;
                 array_wendu[i].innerHTML = obj[i].tem1+'~'+obj[i].tem2;
                 array_fengxiang[i].innerHTML = obj[i].win[0];
                 array_fengli[i].innerHTML = obj[i].win_speed;
             }
                //阻止事件冒泡，防止第一次点击详情就关闭子窗口
                event.stopPropagation();

        }
     //点击天气详情关闭按钮响应此函数
    this.closexiangqing = function () {
        $("#window_bg").fadeOut(300);
        $("#none_tianqixiangqing").slideUp(300);
        console.log('---关闭天气详情窗口');
    }

}
var m_cityweather = new module_city_weather();
export { m_cityweather }
