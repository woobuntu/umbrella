package kr.withus1030.server.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "lnb")
public class Lnb {

    @Id
    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "gnb_name")
    @JsonBackReference
    private Gnb gnb;

    @Column(name = "path")
    private String path;

    public Lnb() {
    }

    public Lnb(String name, Gnb gnb, String path) {
        this.name = name;
        this.gnb = gnb;
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Gnb getGnb() {
        return gnb;
    }

    public void setGnb(Gnb gnb) {
        this.gnb = gnb;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
