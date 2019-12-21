package domain;

import java.util.Objects;

public class User {
    private int id;
    private String username;
    private String password;
    private String userimage;
    private String data;
    public User( String username, String password, String userimage, String data) {
        this.username = username;
        this.password = password;
        this.userimage = userimage;
        this.data = data;
    }
    public User(int id, String username, String password, String userimage, String data) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.userimage = userimage;
        this.data = data;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserimage() {
        return userimage;
    }

    public void setUserimage(String userimage) {
        this.userimage = userimage;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", userimage='" + userimage + '\'' +
                ", data='" + data + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &&
                Objects.equals(username, user.username) &&
                Objects.equals(password, user.password) &&
                Objects.equals(userimage, user.userimage) &&
                Objects.equals(data, user.data);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, userimage, data);
    }
}
