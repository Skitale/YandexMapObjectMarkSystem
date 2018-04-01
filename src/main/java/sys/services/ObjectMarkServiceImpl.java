package sys.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
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
public class ObjectMarkServiceImpl implements ObjectMarkService {

    private final ObjectMarkRepository objectMarkRepository;

    @Autowired
    public ObjectMarkServiceImpl(ObjectMarkRepository objectMarkRepository) {
        this.objectMarkRepository = objectMarkRepository;
    }

    public Iterable<ObjectMark> getAllMarkObjects(Long userId){ return objectMarkRepository.findAllByUserId(userId); }

    @Override
    public ObjectMark createMarkObject(ObjectMark objectMark, Long userId){
        objectMark.setUserId(userId);
        return objectMarkRepository.save(objectMark);
    }

    @Override
    public void deleteMarkObject(Long id){
        objectMarkRepository.delete(id);
    }

    @Override
    public void updateMarkObject(ObjectMark objectMark){
        ObjectMark mark = objectMarkRepository.findOne(objectMark.getId());
        mark.setName(objectMark.getName());
        mark.setAddress(objectMark.getAddress());
        mark.setPathToIcon(objectMark.getPathToIcon());
        objectMarkRepository.save(mark);
    }

    @Override
    public byte[] createPdfFileOfAllMarks(Long userId){
        try {
            String FONT_LOCATION = "./fonts/tahoma.ttf";
            BaseFont baseFont = BaseFont.createFont(FONT_LOCATION, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            Font font = new Font(baseFont, 10, Font.NORMAL);
            Font catFont = new Font(baseFont, 20, Font.BOLD);

            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, new FileOutputStream("pdfFile.pdf"));
            document.open();

            Paragraph preface = new Paragraph();
            Paragraph paragraphHead = new Paragraph("Table of Marks", catFont);
            paragraphHead.setAlignment(Element.ALIGN_CENTER);
            preface.add(paragraphHead);
            preface.add(new Paragraph(" "));

            Iterable<ObjectMark> objectMarkIterable = getAllMarkObjects(userId);
            document.add(preface);

            PdfPTable pdfPTable = new PdfPTable(5);

            PdfPCell cell = new PdfPCell(new Phrase("№", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setMinimumHeight(40.0f);
            cell.setBorderWidth(2);
            pdfPTable.addCell(cell);

            cell = new PdfPCell(new Phrase("Name", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBorderWidth(2);
            pdfPTable.addCell(cell);

            cell = new PdfPCell(new Phrase("Latitude", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBorderWidth(2);
            pdfPTable.addCell(cell);

            cell = new PdfPCell(new Phrase("Longitude", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBorderWidth(2);
            pdfPTable.addCell(cell);

            cell = new PdfPCell(new Phrase("Address", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setBorderWidth(2);
            pdfPTable.addCell(cell);
            pdfPTable.setHeaderRows(1);

            int i = 1;
            for (ObjectMark objectMark : objectMarkIterable) {
                cell = new PdfPCell(new Phrase(String.valueOf(i++), font));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                cell.setMinimumHeight(40.0f);
                pdfPTable.addCell(cell);


                cell = new PdfPCell(new Phrase(objectMark.getName(), font));
                cell.setMinimumHeight(40.0f);
                pdfPTable.addCell(cell);

                cell = new PdfPCell(new Phrase(objectMark.getLatitude().toString(), font));
                cell.setMinimumHeight(40.0f);
                pdfPTable.addCell(cell);

                cell = new PdfPCell(new Phrase(objectMark.getLongitude().toString(), font));
                cell.setMinimumHeight(40.0f);
                pdfPTable.addCell(cell);

                cell = new PdfPCell(new Phrase(objectMark.getAddress(), font));
                cell.setMinimumHeight(40.0f);
                pdfPTable.addCell(cell);
            }
            document.add(pdfPTable);

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
