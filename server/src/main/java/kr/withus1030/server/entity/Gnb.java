package kr.withus1030.server.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "gnb")
public class Gnb {

    @Id
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "gnb", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Lnb> lnbs;

    public Gnb() {
    }

    public Gnb(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Lnb> getLnbs() {
        return lnbs;
    }

    public void setLnbs(List<Lnb> lnbs) {
        this.lnbs = lnbs;
    }

    @Override
    public String toString() {
        return "Gnb{" +
                "name='" + name + '\'' +
                '}';
    }

    public void addLnb(Lnb newLnb){

        if(lnbs == null){
            lnbs = new ArrayList<>();
        }

        lnbs.add(newLnb);

        newLnb.setGnb(this);
    }
}
