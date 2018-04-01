package sys.services;

import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfWriter;
import sys.models.ObjectMark;

public interface ObjectMarkService {

    Iterable<ObjectMark> getAllMarkObjects(Long userId);

    ObjectMark createMarkObject(ObjectMark objectMark, Long userId);

    void deleteMarkObject(Long id);

    void updateMarkObject(ObjectMark objectMark);

    byte[] createPdfFileOfAllMarks(Long userId);
}
