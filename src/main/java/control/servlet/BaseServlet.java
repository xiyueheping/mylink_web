package control.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class BaseServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("base servlet 开始执行");
        //获取请求路径
        String uri = req.getRequestURI();
        //从请求路径中截取方法名
        String methodname = uri.substring(uri.lastIndexOf('/') + 1);
        //获取子类的字节码文件对象  哪个子类调用我，我获取到的就是哪个子类
        Class<? extends BaseServlet> subclass = this.getClass();
        //利用反射机制调用子类对应方法执行  完成请求路径分发功能
        try {
            Method method = subclass.getMethod(methodname, HttpServletRequest.class, HttpServletResponse.class);
            method.invoke(this,req,resp);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
    }
}
