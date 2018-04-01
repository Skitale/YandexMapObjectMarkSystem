package sys.dao;

import org.springframework.data.repository.CrudRepository;
import sys.models.ObjectMark;

import java.util.List;


public interface ObjectMarkRepository extends CrudRepository<ObjectMark, Long> {
    List<ObjectMark> findAllByUserId(Long userId);

}
