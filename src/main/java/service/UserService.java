package service;

import com.fasterxml.jackson.core.JsonProcessingException;
import domain.User;

import java.util.HashMap;

public interface UserService {
    public String register(User user);

    public String login(String username,String password);

    public HashMap<String, String> getdata(String username) throws JsonProcessingException;

    public String setuserdata(String username,String userdata);
}
