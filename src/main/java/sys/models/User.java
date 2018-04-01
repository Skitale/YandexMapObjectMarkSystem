package sys.models;

import javax.persistence.*;

/**
 * Simple Java Bean domain object that represents a User.
 *
 * @author Alexander Tolich
 * @version 1.0
 */
@Entity
@Table(name = "users")
public class User{

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column
    private String username;

    @Column
    private String password;

    @Transient
    private String confirmPassword;

    @Column
    private String role;

    public User() {}

    public User(String username, String password, String confirmPassword, String role) {
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.role = role;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", confirmPassword='" + confirmPassword + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
