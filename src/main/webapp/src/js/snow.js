var module_snow = function(){
          /*******************网 页 雪 花 特 效****/
          this.snow = function(){
                 if(navigator.userAgent.indexOf("MSIE 6.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0||navigator.userAgent.indexOf("MSIE 8.0")>0)
                 {
                   return
                 }
                 var f=20;
                 var v=0.7;
                 var g=0;
                 var n=0.8;
                 var m=0;
                 var d=document.getElementById("snowFallTop");
                 var x=document.getElementById("snowFallLeft");
                 var e=document.getElementById("snowFallRight");
                 var q=d.clientWidth;
                 var o=d.clientHeight;
                 d.width=q;
                 d.height=o;
                 b();
                 var l=d.getContext("2d");
                 var t=x.getContext("2d");
                 var k=e.getContext("2d");
                 /***********改变雪花颜色****************/
                 l.fillStyle="#ffffff";
                 t.fillStyle="#ffffff";
                 k.fillStyle="#ffffff";
                 g=o*v;
                 m=(o-g)*n;
             
                 var h=function(){
                   this.x=0;
                   this.y=0;
                   this.velocityX=0;
                   this.velocityY=0;
                   this.radius=0;
                   this.transparency=0;
                   this.clientWidth=0;
                   this.clientHeight=0;
                   this.reset()
                 };
                 h.prototype.reset=function(){
                   this.x=Math.random()*this.clientWidth;
                   this.y=Math.random()*-this.clientHeight;
                   this.velocityX=0.5-Math.random();
                   this.velocityY=(1+Math.random())*3;
                   this.radius=(1+Math.random())*2;
                   this.transparency=(0.5+Math.random())*0.5};
                   var u=[],c,a=[],w=[],p=[];
                   for(var r=0;r<f;r+=1){
                       a.push(i(new h(),d));
                       w.push(i(new h(),x));
                       p.push(i(new h(),e))
             
                               }
                     function i(z,y){
                       z.clientWidth=y.width;z.clientHeight=y.height;z.reset();
                       return z
                     }
                       function j(){
                         l.clearRect(0,0,d.width,d.height);
                         t.clearRect(0,0,x.width,x.height);
                         k.clearRect(0,0,e.width,e.height);
                         s(l,a);s(t,w);s(k,p);requestAnimFrame(j)
                                   }
                       function s(B,y){
                         var z=null;
                         for(var A=0;A<f;A+=1){
                           z=y[A];
                           z.x+=z.velocityX;
                           z.y+=z.velocityY;
                           B.globalAlpha=z.transparency;
                           B.beginPath();
                           B.arc(z.x,z.y,z.radius,0,Math.PI*2,false);
                           B.closePath();
                           B.fill();
                           if(z.y>z.clientHeight){
                             z.reset()
                              }
                             }
                         }
                         function b(){
                           // d.style.left=((document.body.clientWidth-1220)/2)+"px";
                           //
                           // if(document.body.clientWidth-1220>20){
                           //   x.width=(document.body.clientWidth-1220)/2;
                           //   x.height=742;x.style.width=x.width+"px";
                           //   e.width=(document.body.clientWidth-1220)/2;
                           //   e.height=742;e.style.width=x.width+"px"
                           //
                           // }
             
                         }
             
                         window.requestAnimFrame=(function(){
             
                           return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(y){
                             window.setTimeout(y,1000/60)
                           }
                         })
                         ();
                             requestAnimFrame(j);
                             window.addEventListener("resize",function(){b();
                               l.fillStyle="#fff";t.fillStyle="#fff";
                               k.fillStyle="#fff"},false
                               )
                       }


                       
}

//导出此对象的一个实例
var m_snow = new module_snow();
export { m_snow }