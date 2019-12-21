package control.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import service.UserService;
import service.serviceimpl.UserServiceimpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;


/**
 * 更新userdata 更新用户名 更新密码 更新用户头像
 */
@WebServlet(urlPatterns = {"/update/*"})
public class UpdateServlet extends BaseServlet {
    private UserService userService = new UserServiceimpl();
    public void setuserdata(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        System.out.println("处理更新userdata请求");

//        req.setCharacterEncoding("utf-8");
        //响应消息编码方式
        resp.setCharacterEncoding("utf-8");
        //告诉浏览器使用何种方式解码响应数据
        resp.setHeader("content-type","application/json;charset=utf-8");
        //封装响应信息的map对象
        HashMap<String,String> map = new HashMap<>();
        //从cookie中获取username
        String username1 = null;
        Cookie[] cookies =  req.getCookies();
        if(cookies != null){
            for(Cookie cookie : cookies){
                if("username".equals(cookie.getName())){
                    username1 = cookie.getValue();
                }
            }
        }
        //从session中获取username
        String username2 = (String) req.getSession().getAttribute("username");
        if(username1 == null || username2 == null){
            resp.getWriter().write("{\"msg\":\"登录态验证失败\"}");
        }
        if(!username1.equals(username2)){
            resp.getWriter().write("{\"msg\":\"登录态验证失败\"}");
        }
        //调用业务层功能更新userdata
        String userdata = req.getParameter("userdata");
        userdata = new String(userdata.getBytes("iso-8859-1"), "utf-8");
        System.out.println(userdata);
        String s = userService.setuserdata(username1, userdata);
        map.put("msg",s);
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(map);
        resp.getWriter().write(json);
    }
}
