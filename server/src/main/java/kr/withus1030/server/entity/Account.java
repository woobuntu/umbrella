package kr.withus1030.server.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="account")
public class Account implements Serializable {
// serializable을 implements하지 않을 시 Composite-id class must implement Serializable 에러 발생

    @Id
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "name")
    private Meta meta;

    @Column(name = "bank")
    private String bank;

    @Column(name = "number")
    private String number;

    @Column(name = "holder")
    private String holder;

    @Column(name = "consent_guidance")
    private String consentGuidance;

    @Column(name = "deduction_guidance")
    private String deductionGuidance;

    public Account() {
    }

    public Account(Meta meta, String bank, String number, String holder, String consentGuidance, String deductionGuidance) {
        this.meta = meta;
        this.bank = bank;
        this.number = number;
        this.holder = holder;
        this.consentGuidance = consentGuidance;
        this.deductionGuidance = deductionGuidance;
    }

    public Meta getMeta() {
        return meta;
    }

    public void setMeta(Meta meta) {
        this.meta = meta;
    }

    public String getBank() {
        return bank;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getHolder() {
        return holder;
    }

    public void setHolder(String holder) {
        this.holder = holder;
    }

    public String getConsentGuidance() {
        return consentGuidance;
    }

    public void setConsentGuidance(String consentGuidance) {
        this.consentGuidance = consentGuidance;
    }

    public String getDeductionGuidance() {
        return deductionGuidance;
    }

    public void setDeductionGuidance(String deductionGuidance) {
        this.deductionGuidance = deductionGuidance;
    }

    @Override
    public String toString() {
        return "Account{" +
                "meta=" + meta +
                ", bank='" + bank + '\'' +
                ", number='" + number + '\'' +
                ", holder='" + holder + '\'' +
                ", consentGuidance='" + consentGuidance + '\'' +
                ", deductionGuidance='" + deductionGuidance + '\'' +
                '}';
    }
}
