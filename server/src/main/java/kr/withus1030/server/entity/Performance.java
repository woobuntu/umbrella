package kr.withus1030.server.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "performance")
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "timestamp")
    private Date timestamp;

    public Performance() {
    }

    public Performance(String title, Date timestamp) {
        this.title = title;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Performance{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}
