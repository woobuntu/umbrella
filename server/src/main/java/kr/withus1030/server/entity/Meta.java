package kr.withus1030.server.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@Table(name="meta")
public class Meta {

    @Id
    @Column(name="name")
    private String name;

    @Column(name="type")
    private String type;

    @OneToOne(mappedBy = "meta", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Account account;

    @OneToOne(mappedBy = "meta", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Contact contact;

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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    @Override
    public String toString() {
        return "Meta{" +
                "name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", account=" + account +
                ", contact=" + contact +
                '}';
    }
}
