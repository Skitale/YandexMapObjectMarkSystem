package sys.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sys.dao.ObjectMarkRepository;
import sys.models.ObjectMark;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

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

    public byte[] createPdfFileOfAllMarks(){
        try {
            String FONT_LOCATION = "./fonts/tahoma.ttf";
            Document document = new Document();
            PdfWriter.getInstance(document, new FileOutputStream("pdfFile.pdf"));
            Iterable<ObjectMark> objectMarkIterable = getAllMarkObjects();
            BaseFont baseFont = BaseFont.createFont(FONT_LOCATION, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font font = new Font(baseFont, 10, Font.NORMAL);
            document.open();
            document.add(new Chunk("List of markers"));
            int i = 1;
            for (ObjectMark objectMark : objectMarkIterable) {
                document.addSubject(objectMark.getIconContent());
                document.add(new Paragraph(i++));
                document.add(new Paragraph("Brief info: " + objectMark.getIconContent(), font));
                document.add(new Paragraph("Latitude: " + objectMark.getLatitude(), font));
                document.add(new Paragraph("Longitude: " + objectMark.getLongitude(), font));
                document.add(new Paragraph("Detailed info: " + objectMark.getBalloonContentBody(), font));
                document.add(new Paragraph("Preset: " + objectMark.getPreset(), font));
                document.add(new Paragraph("  "));
            }
            document.close();

            File file = new File("pdfFile.pdf");
            byte[] bytesPdf = new byte[(int) file.length()];

            FileInputStream fis = new FileInputStream(file);
            fis.read(bytesPdf);
            fis.close();

            return bytesPdf;
        } catch (DocumentException e){
            e.printStackTrace();
        } catch (IOException e){
            e.printStackTrace();
        }
        return null;
    }
}
