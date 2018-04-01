package sys.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import sys.models.User;
import sys.services.SecurityService;
import sys.services.UserService;
import sys.validator.UserValidator;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.util.*;

/**
 * Created by TrueNess on 29.08.2017.
 */
@Controller
public class UserController {

    private final UserService userService;

    private final SecurityService securityService;

    private final UserValidator userValidator;


    @Autowired
    public UserController(UserService userService, SecurityService securityService, UserValidator userValidator) {
        this.userService = userService;
        this.securityService = securityService;
        this.userValidator = userValidator;
    }

    @CrossOrigin( allowCredentials = "true", allowedHeaders = "*", methods = RequestMethod.GET)
    @RequestMapping(value = "/getUserName", method = RequestMethod.GET)
    public @ResponseBody String getUserName(HttpServletRequest request){
        Long userId = (Long) request.getSession().getAttribute("userId");
        User u = this.userService.findById(userId);
        return u.getUsername();
    }

    @RequestMapping(value = "/registration", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public String registration(Model model) {
        model.addAttribute("userForm", new User());
        return "registration";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String registration(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) {
        System.out.println("regPOST");
        userValidator.validate(userForm, bindingResult);
        if (bindingResult.hasErrors()) {
            return "registration";
        }

        userService.save(userForm);

        securityService.autoLogin(userForm.getUsername(), userForm.getConfirmPassword());

        return "redirect:/welcome";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, String error, String logout) {
        System.out.println("logGET");

        if (error != null) {
            model.addAttribute("error", "Username or password is incorrect.");
        }

        if (logout != null) {
            model.addAttribute("message", "Logged out successfully.");
        }

        return "login";
    }

	@Deprecated
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(Model model) {
        return "redirect:/welcome";
    }

    @RequestMapping(value = {"/", "/welcome"}, method = {RequestMethod.GET, RequestMethod.POST})
    public String welcome(Model model, HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetail = (UserDetails) auth.getPrincipal();
        User u = userService.findByUsername(userDetail.getUsername());
        request.getSession().setAttribute("userId", u.getId());
        return "redirect:/index.html";
    }
}
