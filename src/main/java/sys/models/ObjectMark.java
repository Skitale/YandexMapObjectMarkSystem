package sys.models;

import javax.persistence.*;
import java.math.BigDecimal;
/**
 * Simple Java Bean domain object that represents a mark of object on a map.
 *
 * @author Alexander Tolich
 * @version 1.0
 */
@Entity
@Table(name = "objectmark")
public class ObjectMark {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String textMark;

    @Column(nullable = false, precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 10, scale = 6)
    private BigDecimal longitude;

    @Column
    private String pathIconMark;

    public ObjectMark() {
    }

    public ObjectMark(String textMark, BigDecimal latitude, BigDecimal longitude, String pathIconMark) {
        this.textMark = textMark;
        this.latitude = latitude;
        this.longitude = longitude;
        this.pathIconMark = pathIconMark;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTextMark() {
        return textMark;
    }

    public void setTextMark(String textMark) {
        this.textMark = textMark;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getPathIconMark() {
        return pathIconMark;
    }

    public void setPathIconMark(String pathIconMark) {
        this.pathIconMark = pathIconMark;
    }

    @Override
    public String toString() {
        return "ObjectMark{" +
                "id=" + id +
                ", textMark='" + textMark + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", pathIconMark='" + pathIconMark + '\'' +
                '}';
    }
}
