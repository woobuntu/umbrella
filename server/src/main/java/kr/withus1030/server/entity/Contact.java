package kr.withus1030.server.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name="contact")
public class Contact implements Serializable {
// serializable을 implements하지 않을 시 Composite-id class must implement Serializable 에러 발생

    @Id
    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="name")
    @JsonBackReference
    private Meta meta;

    @Column(name="address")
    private String address;

    @Column(name="mail")
    private String mail;

    @Column(name="phone")
    private String phone;

    public Contact() {
    }

    public Contact(Meta meta, String address, String mail, String phone) {
        this.meta = meta;
        this.address = address;
        this.mail = mail;
        this.phone = phone;
    }

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "meta=" + meta +
                ", address='" + address + '\'' +
                ", mail='" + mail + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
