package sys.services;

import sys.models.User;

/**
 * Created by TrueNess on 29.08.2017.
 */
public interface UserService {

    void save(User user);

    User findByUsername(String username);

    User findById(Long id);
}
