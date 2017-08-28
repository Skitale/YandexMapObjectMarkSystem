package sys.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
@CrossOrigin(/*origins = {"http://localhost:4200", "http://192.168.1.65:8080"},*/ allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.PUT, RequestMethod.DELETE})
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

    @RequestMapping(value = "/create", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ObjectMark createMarkObject(@RequestBody ObjectMark objectMark){
        return objectMarkService.createMarkObject(objectMark);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteMarkObject(@PathVariable Long id){
        objectMarkService.deleteMarkObject(id);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(value = HttpStatus.OK)
    public void updateMarkObject(@RequestBody ObjectMark objectMark){
        objectMarkService.updateMarkObject(objectMark);
    }

    @RequestMapping(value = "/getPdf", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> getPfdFileOfAllMark(){
        byte[] content = objectMarkService.createPdfFileOfAllMarks();
        if(content == null) {
            return new ResponseEntity<byte[]>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        HttpHeaders httpHeaders = new HttpHeaders();
        String fileName = "pdfFile.pdf";
        httpHeaders.setContentType(MediaType.APPLICATION_PDF);
        httpHeaders.setContentDispositionFormData(fileName,fileName);
        httpHeaders.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        return new ResponseEntity<byte[]>(content, httpHeaders, HttpStatus.OK);
    }


}
