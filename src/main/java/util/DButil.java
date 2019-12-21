package util;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

/**
 * 数据库访问工具类 用于获取数据库连接池对象来操作数据库
 */
public class DButil {
    //定义一个静态成员保存数据库连接对象
    private static DataSource ds;

    //在静态代码块中获取数据库连接池与JdbcTemplate对象并赋值给静态成员
    static {
        //加载配置文件
        Properties pro = new Properties();
        try {
            pro.load(DButil.class.getClassLoader().getResourceAsStream("druid.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            DButil.ds = DruidDataSourceFactory.createDataSource(pro);
            System.out.println("======初始化数据库连接池对象======");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //从静态成员获取数据库连接池对象
    public static DataSource getDataSource(){
        return DButil.ds;
    }
}