import dao.daoimpl.UserDaoimpl;
import domain.User;
import service.serviceimpl.UserServiceimpl;
import util.DButil;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

public class Test {
    public static void main(String[] args) throws FileNotFoundException {
        String login = new UserServiceimpl().login("4545", "4545");
        System.out.println(login);
    }
}