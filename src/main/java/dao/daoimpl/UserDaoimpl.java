package dao.daoimpl;

import dao.UserDao;
import domain.User;
import org.springframework.jdbc.core.JdbcTemplate;
import util.DButil;

import java.util.Map;


public class UserDaoimpl implements UserDao {
    private JdbcTemplate template = new JdbcTemplate(DButil.getDataSource());
    @Override
    //添加用户信息
    public Boolean add(User user) {
        String sql = "insert into user (username,password,userimage,data) values(?,?,?,?)";
        int i = template.update(sql, user.getUsername(),user.getPassword(),user.getUserimage(),user.getData());
        return i>0;
    }

    @Override
    //根据name查询用户信息
    public User find(String username) {
        String sql = "select * from user where username=?";
        Map<String, Object> map;
        try{
            map = template.queryForMap(sql, username);
            String username2 = (String) map.get("username");
            String password = (String) map.get("password");
            String userimage = (String) map.get("userimage");
            String data = (String) map.get("data");
            User s = new User(username2,password,userimage,data);
            return s;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    //根据name更新用户信息
    public boolean setuserdata(String username, String userdata) {
        String sql = "update user set data=? where username=?";
        int i = template.update(sql, userdata,username);
        return i>0;
    }
}
