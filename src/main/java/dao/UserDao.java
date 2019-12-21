package dao;

import domain.User;

public interface UserDao {
    //添加用户信息
    public Boolean add(User user);

    //根据name查询用户信息
    public User find(String username);

    //根据name更新userdata
    public boolean setuserdata(String username, String userdata);
}
