//导入md5.js
import { MD5 } from "./md5.js"

var module_trans = function(){

	
	//点击翻译按钮响应此函数
	this.showtrans = function(e){

            //显示翻译窗口
            $("#window_bg").fadeIn(300);
            $("#none_trans").slideDown(300);
            console.log('---打开了翻译窗口');

        //阻止事件冒泡，防止第一次点击翻译按钮就关闭翻译窗口
        e.stopPropagation();
	}
	//点击翻译窗口关闭按钮响应此函数
    this.close = function () {
	    //隐藏翻译窗口
        $("#window_bg").fadeOut(300);
        $("#none_trans").slideUp(300);
        console.log('---关闭翻译窗口');
    }
    //点击回车后 响应此函数 开始请求翻译数据并渲染
    this.gettrans = function () {
        var appid = '20190209000264918';
        var key = 'Xtr_foZD_pgeVvK2_CMK';
        var salt = (new Date).getTime();
        var query = document.getElementById('trans_from').value.Trim();
        var str1 = appid + query + salt +key;
        var sign = MD5(str1);

        //如果文本框没有内容或只有空格就不翻译了
        if(query.length == 0){
            return;
        }
        document.getElementById('trans_to').value = '正在加载中...';
        $.ajax({
            url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'get',
            dataType: 'jsonp',
            data: {
                q: query,
                appid: appid,
                salt: salt,
                from: 'auto',
                to: 'auto',
                sign: sign
            },
            success: function (data) {
                document.getElementById('trans_to').value = data.trans_result[0].dst;
                // console.log('---翻译数据请求成功:');
                // console.log(data.trans_result[0]);
            }
        });

    }
    /**
     * 基本函数 供上面函数调用
     * @returns {string}
     * @constructor
     */
    String.prototype.Trim = function(){

        return this.replace(/(^\s*)|(\s*$)/g, "");

    }
}
var m_trans = new module_trans();
export { m_trans }