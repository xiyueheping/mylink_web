package control.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import domain.User;
import service.UserService;
import service.serviceimpl.UserServiceimpl;
import util.MylinkData;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Random;

/**
 * 登录 注册 登录验证码 注册验证码 获取用户数据
 */
@WebServlet(urlPatterns = {"/user/*"})
public class UserServlet extends BaseServlet {
    private UserService userService = new UserServiceimpl();
    //响应注册请求
    public void register(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        System.out.println("处理用户注册请求");

        req.setCharacterEncoding("utf-8");
        //响应消息编码方式
        resp.setCharacterEncoding("utf-8");
        //告诉浏览器使用何种方式解码响应数据
        resp.setHeader("content-type","application/json;charset=utf-8");

        //封装响应信息的map对象
        HashMap<String,String> map = new HashMap<>();

        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String checkcoderegister = req.getParameter("checkcoderegister");


        System.out.println(username);
        System.out.println(password);
        System.out.println(checkcoderegister);

        //如果验证码不正确 直接响应注册失败，如果验证码正确再继续验证账号密码
        if(!(checkcoderegister.equalsIgnoreCase((String) req.getSession().getAttribute("checkcoderegister")))){
            req.getSession().removeAttribute("checkcoderegister"); //验证失败之后清除session中验证码信息
            map.put("msg","注册失败，验证码错误");
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(map);
            resp.getWriter().write(json); //响应登录信息
            return;
        }
        req.getSession().removeAttribute("checkcoderegister"); //开始注册前清除session中验证码信息
        //否则调用注册功能 ----------------------------------------------------------------------
        User user = new User(username,password,"1.png",MylinkData.getdefaultdata());
        String s = userService.register(user);
        map.put("msg",s);
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(map);
        resp.getWriter().write(json); //响应登录信息
    }
    //响应登录请求
    public void login(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        req.setCharacterEncoding("utf-8");
        //响应消息编码方式
        resp.setCharacterEncoding("utf-8");
        //告诉浏览器使用何种方式解码响应数据
        resp.setHeader("content-type","application/json;charset=utf-8");
        //封装响应信息的map对象
        HashMap<String,String> map = new HashMap<>();

        System.out.println("接收到login请求");
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String checkcodelogin = req.getParameter("checkcodelogin");

        System.out.println(username);
        //如果验证码不正确 直接响应登录失败，如果验证码正确再继续验证账号密码
        if(!(checkcodelogin.equalsIgnoreCase((String) req.getSession().getAttribute("checkcodelogin")))){
            req.getSession().removeAttribute("checkcodelogin"); //验证失败之后清除session中验证码信息
            map.put("msg","登录失败，验证码错误");
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(map);
            resp.getWriter().write(json); //响应登录信息
            return;
        }
        req.getSession().removeAttribute("checkcodelogin"); //验证成功之后清除session中验证码信息
        String s = userService.login(username,password);
        //如果登录成功在session中保存用户信息
        if(s.equals("登录成功")){
            req.getSession().setAttribute("username",username);  //登录成功把用户name存入session
            Cookie cookie1 = new Cookie("username",username); //向前端cookie中保存用户名信息
            cookie1.setPath("/"); //设置为根路径表示同一个服务器下所有资源共享此cookie
            resp.addCookie(cookie1);
        }
        map.put("msg",s);
        //创建一个jackson的核心对象
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(map);
        System.out.println(json);
        resp.getWriter().write(json); //响应登录信息
    }
    //获取用户网址数据
    public void getdata(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        req.setCharacterEncoding("utf-8");
        //响应消息编码方式
        resp.setCharacterEncoding("utf-8");
        //告诉浏览器使用何种方式解码响应数据
        resp.setHeader("content-type","application/json;charset=utf-8");
        //封装响应信息的map对象
        HashMap<String,String> map = new HashMap<>();

        String username = "";

        //获取前端的cookie信息
        Cookie[] cookies =  req.getCookies();
        if(cookies != null){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("username")){
                    username = cookie.getValue();
                    System.out.println(username);
                }
            }
        }
        //判断前端cookie中的用户名与后端session中的用户名是否相同
        if(!username.equals(req.getSession().getAttribute("username"))){
            map.put("msg","登录态验证失败");
            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(map);
            resp.getWriter().write(json); //响应登录信息
            return;
        }
        //查询用户数据
        HashMap<String, String> mapdata = userService.getdata(username);
        map.put("msg","验证成功");
        map.put("username",mapdata.get("username"));
        map.put("userimage",mapdata.get("userimage"));
        map.put("userdata",mapdata.get("userdata"));


        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(map);
        resp.getWriter().write(json); //响应登录信息
    }

    //响应注册验证码
    public void checkcoderegister(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("处理注册验证码请求");

        //告诉浏览器使用何种方式解码响应数据
        resp.setHeader("content-type","image/jpeg;charset=utf-8");
        System.out.println("接收到checkcode请求");
        //获取验证码图片
        int width = 120;
        int height = 50;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        //填充背景色
        Graphics g = image.getGraphics(); //画笔对象
        g.setColor(Color.pink); //设置画笔颜色
        g.fillRect(0,0,width,height);
        //生成随机字符并绘制到图片上
        String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        String checknum = "";
        Random random = new Random();
        g.setColor(Color.BLUE);
        for(int i=1;i<=4;i++){
            int index = random.nextInt(str.length());
            char ch = str.charAt(index);
            checknum = checknum + ch;
            g.drawString(ch+"",width/5*i,height/2);
        }
        //随机画干扰线
        g.setColor(Color.CYAN);
        for(int i=0;i<5;i++){
            int x1 = random.nextInt(width);
            int x2 = random.nextInt(width);
            int y1 = random.nextInt(height);
            int y2 = random.nextInt(height);
            g.drawLine(x1,x2,y1,y2);
        }
        System.out.println("生成登录验证码为："+checknum);
        req.getSession().setAttribute("checkcoderegister",checknum);
        //获取字节输出流
        ServletOutputStream outputStream = resp.getOutputStream();
        //将图片返回到前端
        ImageIO.write(image,"jpg",outputStream);
    }

    //登录验证码
    public void checkcodelogin(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("处理登录验证码请求");
        //告诉浏览器使用何种方式解码响应数据
        resp.setHeader("content-type","image/jpeg;charset=utf-8");
        System.out.println("接收到checkcode请求");
        //获取验证码图片
        int width = 100;
        int height = 50;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        //填充背景色
        Graphics g = image.getGraphics(); //画笔对象
        g.setColor(Color.pink); //设置画笔颜色
        g.fillRect(0,0,width,height);
        //生成随机字符并绘制到图片上
        String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        String checknum = "";
        Random random = new Random();
        g.setColor(Color.BLUE);
        for(int i=1;i<=4;i++){
            int index = random.nextInt(str.length());
            char ch = str.charAt(index);
            checknum = checknum + ch;
            g.drawString(ch+"",width/5*i,height/2);
        }
        //随机画干扰线
        g.setColor(Color.CYAN);
        for(int i=0;i<5;i++){
            int x1 = random.nextInt(width);
            int x2 = random.nextInt(width);
            int y1 = random.nextInt(height);
            int y2 = random.nextInt(height);
            g.drawLine(x1,x2,y1,y2);
        }
        System.out.println("生成登录验证码为："+checknum);
        req.getSession().setAttribute("checkcodelogin",checknum);
        //获取字节输出流
        ServletOutputStream outputStream = resp.getOutputStream();
        //将图片返回到前端
        ImageIO.write(image,"jpg",outputStream);
    }
}
