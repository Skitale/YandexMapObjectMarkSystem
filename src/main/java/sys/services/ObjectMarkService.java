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

    public ObjectMark createMarkObject(ObjectMark objectMark){
        return objectMarkRepository.save(objectMark);
    }

    public void deleteMarkObject(Long id){
        objectMarkRepository.delete(id);
    }

    public void updateMarkObject(ObjectMark objectMark){
        ObjectMark mark = objectMarkRepository.findOne(objectMark.getId());
        mark.setLatitude(objectMark.getLatitude());
        mark.setLongitude(objectMark.getLongitude());
        mark.setIconContent(objectMark.getIconContent());
        mark.setBalloonContentBody(objectMark.getBalloonContentBody());
        mark.setPreset(objectMark.getPreset());
        objectMarkRepository.save(mark);
    }
}
