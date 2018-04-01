package sys.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import sys.models.User;

public interface UserDao extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findById(Long id);
}