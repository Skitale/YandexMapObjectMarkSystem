package sys.models;

import com.fasterxml.jackson.annotation.JsonProperty;

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
    @JsonProperty("id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String iconContent;

    @Column
    private String balloonContentBody;

    @Column(nullable = false, precision = 20, scale = 16)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 20, scale = 16)
    private BigDecimal longitude;

    @Column
    private String preset;

    public ObjectMark() {
    }

    public ObjectMark(String iconContent, String balloonContentBody, BigDecimal latitude, BigDecimal longitude, String preset) {
        this.iconContent = iconContent;
        this.balloonContentBody = balloonContentBody;
        this.latitude = latitude;
        this.longitude = longitude;
        this.preset = preset;
    }

    public String getBalloonContentBody() {
        return balloonContentBody;
    }

    public void setBalloonContentBody(String balloonContentBody) {
        this.balloonContentBody = balloonContentBody;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getIconContent() {
        return iconContent;
    }

    public void setIconContent(String iconContent) {
        this.iconContent = iconContent;
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

    public String getPreset() {
        return preset;
    }

    public void setPreset(String pathIconMark) {
        this.preset = pathIconMark;
    }

    @Override
    public String toString() {
        return "ObjectMark{" +
                "id=" + id +
                ", iconContent='" + iconContent + '\'' +
                ", balloonContentBody='" + balloonContentBody + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", preset='" + preset + '\'' +
                '}';
    }

}
