package service.serviceimpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import dao.UserDao;
import dao.daoimpl.UserDaoimpl;
import domain.User;
import service.UserService;

import java.util.HashMap;

public class UserServiceimpl implements UserService {
    private UserDao userDao = new UserDaoimpl();
    @Override
    public String register(User user) {
        User user1 = userDao.find(user.getUsername());
        if(user1 != null){
            return "注册失败，该用户已存在";
        }
        else{
            Boolean add = userDao.add(user);
            if(add){
                return "注册成功";
            }else{
                return "注册失败";
            }
        }

    }

    @Override
    public String login(String username,String password) {
        User user1 = userDao.find(username);
        if(user1 == null){
            return "登录失败，用户不存在";
        }
        else{
            if(user1.getPassword().equals(password)){
                return "登录成功";
            }
            else{
                return "登录失败，密码错误";
            }
        }
    }

    @Override
    public HashMap<String, String> getdata(String username) throws JsonProcessingException {
        User user1 = userDao.find(username);
        if(user1!=null){
            HashMap<String,String> map = new HashMap();
            map.put("userdata",user1.getData());
            map.put("username",user1.getUsername());
            map.put("userimage",user1.getUserimage());
            return map;
        }
        return null;
    }

    @Override
    public String setuserdata(String username, String userdata) {
          boolean b = userDao.setuserdata(username,userdata);
          if(b){
              return "更新成功";
          }
          else{
              return "更新失败";
          }
    }
}
