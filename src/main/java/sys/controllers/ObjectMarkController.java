package sys.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import sys.models.ObjectMark;
import sys.services.ObjectMarkService;

import java.util.List;

/**
 * The Contoller that receive request from {@link org.springframework.web.servlet.DispatcherServlet} in the context.
 *
 * @author Alexander Tolich
 * @version 1.0
 */
@Controller
@RequestMapping("/objectMarks")
public class ObjectMarkController {

    private final ObjectMarkService objectMarkService;

    @Autowired
    public ObjectMarkController(ObjectMarkService objectMarkService) {
        this.objectMarkService = objectMarkService;
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public @ResponseBody Iterable<ObjectMark> getAllMarkObjects(){
       return objectMarkService.getAllMarkObjects();
    }

    @CrossOrigin(origins = {"http://localhost:4200"}, allowCredentials = "true", allowedHeaders = {"*"}, methods = {RequestMethod.POST})
    @RequestMapping(value = "/addMark", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public void addMark(@RequestBody ObjectMark mark){
        objectMarkService.addMarkObject(mark);
    }


}
