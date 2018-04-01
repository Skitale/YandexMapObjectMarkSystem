package sys.services;

/**
 * Created by TrueNess on 29.08.2017.
 */
public interface SecurityService {
    String findLoggedInUsername();

    void autoLogin(String username, String password);
}
