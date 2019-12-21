package util;
import java.io.*;

public class MylinkData {
    public static String getdefaultdata() {

        FileReader re = null;
        StringBuffer stringBuffer = new StringBuffer("");
        try {
            String path = Thread.currentThread().getContextClassLoader().getResource("mylink-data.json").getPath();
            re = new FileReader(path);
            BufferedReader in = new BufferedReader(re);
            String line = in.readLine();
            while(line!=null){
                stringBuffer.append(line);
                line = in.readLine();
            }
            in.close();
        } catch (Exception e) {
            System.out.println("抛异常了，json文件读取失败");
            e.printStackTrace();
        }

        return stringBuffer.toString();
    }

    public static void main(String[] args) {
        String s1 =  MylinkData.class.getResource("").getPath();
        String s2 = MylinkData.class.getClassLoader().getResource("").getPath();
        String s3 = Thread.currentThread().getContextClassLoader().getResource("").getPath();
        System.out.println(s1);
        System.out.println(s2);
        System.out.println(s3);
    }
}
