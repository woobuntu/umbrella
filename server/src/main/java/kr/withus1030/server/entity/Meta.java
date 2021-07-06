package kr.withus1030.server.entity;

import javax.persistence.*;

@Entity
@Table(name="meta")
public class Meta {

    @Id
    @Column(name="name")
    private String name;

    @Column(name="type")
    private String type;

    public Meta() {
    }

    public Meta(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Meta{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
