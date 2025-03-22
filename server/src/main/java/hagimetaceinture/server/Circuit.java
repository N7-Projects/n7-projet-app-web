package hagimetaceinture.server;

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
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (idCircuit ^ (idCircuit >>> 32));
        result = prime * result + nbVirage;
        long temp;
        temp = Double.doubleToLongBits(distance);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(meilleurTemps);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Circuit other = (Circuit) obj;
        if (idCircuit != other.idCircuit)
            return false;
        if (nbVirage != other.nbVirage)
            return false;
        if (Double.doubleToLongBits(distance) != Double.doubleToLongBits(other.distance))
            return false;
        if (Double.doubleToLongBits(meilleurTemps) != Double.doubleToLongBits(other.meilleurTemps))
            return false;
        return true;
    }
    @Override
    public String toString() {
        return "Circuit n ° " + idCircuit + ": " + nom + " à " + lieu;
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
    
    

}
