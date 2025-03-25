package hagimetaceinture.server;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Circuit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCircuit;

    private int nbVirage;
    
    private double distance;
    
    private double meilleurTemps;
    
    private String nom;
    
    private String lieu;
    
    private int nbSpectateur;

    private Date fundationDate;


    public Circuit() {
    }

    public long getIdCircuit() {
        return idCircuit;
    }

    public int getNbVirage() {
        return nbVirage;
    }

    public double getDistance() {
        return distance;
    }

    public double getMeilleurTemps() {
        return meilleurTemps;
    }

    public void setIdCircuit(long idCircuit) {
        this.idCircuit = idCircuit;
    }

    public void setNbVirage(int nbVirage) {
        this.nbVirage = nbVirage;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public void setMeilleurTemps(double meilleurTemps) {
        this.meilleurTemps = meilleurTemps;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public int getNbSpectateur() {
        return nbSpectateur;
    }

    public void setNbSpectateur(int nbSpectateur) {
        this.nbSpectateur = nbSpectateur;
    }

    public Date getFundationDate() {
        return fundationDate;
    }

    public void setFundationDate(Date fundationDate) {
        this.fundationDate = fundationDate;
    }

    @Override
    public String toString() {
        return "Circuit [idCircuit=" + idCircuit + ", nbVirage=" + nbVirage + ", distance=" + distance
                + ", meilleurTemps=" + meilleurTemps + ", nom=" + nom + ", lieu=" + lieu + ", nbSpectateur="
                + nbSpectateur + ", fundationDate=" + fundationDate + "]";
    }

}
