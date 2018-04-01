package sys.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.persistence.Id;
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
    private String name;

    @Column
    private String address;

    @Column(nullable = false, precision = 20, scale = 16)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 20, scale = 16)
    private BigDecimal longitude;

    @Column
    @org.springframework.data.annotation.Transient
    private String pathToIcon;

    @org.springframework.data.annotation.Transient
    @Column
    private Long userId;

    public ObjectMark() {
    }

    public ObjectMark(String name, String balloonContentBody, BigDecimal latitude, BigDecimal longitude, String preset, Long userId) {
        this.name = name;
        this.address = balloonContentBody;
        this.latitude = latitude;
        this.longitude = longitude;
        this.pathToIcon = preset;
        this.userId = userId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getPathToIcon() {
        return pathToIcon;
    }

    public void setPathToIcon(String pathIconMark) {
        this.pathToIcon = pathIconMark;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "ObjectMarkService{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", pathToIcon='" + pathToIcon + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
