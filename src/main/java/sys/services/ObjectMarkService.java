package sys.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sys.dao.ObjectMarkRepository;
import sys.models.ObjectMark;

/**
 * Service class for {@link ObjectMark}
 *
 * @author Alexander Tolich
 * @version 1.0
 */
@Service
public class ObjectMarkService {

    private final ObjectMarkRepository objectMarkRepository;

    @Autowired
    public ObjectMarkService(ObjectMarkRepository objectMarkRepository) {
        this.objectMarkRepository = objectMarkRepository;
    }

    public Iterable<ObjectMark> getAllMarkObjects(){ return objectMarkRepository.findAll(); }

    public void addMarkObject(ObjectMark objectMark){
        objectMarkRepository.save(objectMark);
    }
}
