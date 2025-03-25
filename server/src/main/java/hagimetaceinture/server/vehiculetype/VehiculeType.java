package hagimetaceinture.server.vehiculetype;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class VehiculeType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idTypeVehicule;
    
    private String name;
    
    private int nbWheel;

    private double maxSpeed;

    private double maxWeight;

    public VehiculeType() {
    }

    public long getIdTypeVehicule() {
        return idTypeVehicule;
    }

    public void setIdTypeVehicule(long idTypeVehicule) {
        this.idTypeVehicule = idTypeVehicule;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNbWheel() {
        return nbWheel;
    }

    public void setNbWheel(int nbWheel) {
        this.nbWheel = nbWheel;
    }

    public double getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(double maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    public double getMaxWeight() {
        return maxWeight;
    }

    public void setMaxWeight(double maxWeight) {
        this.maxWeight = maxWeight;
    }

    @Override
    public String toString() {
        return "TypeVehicule [idTypeVehicule=" + idTypeVehicule + ", name=" + name + ", nbWheel=" + nbWheel
                + ", maxSpeed=" + maxSpeed + ", maxWeight=" + maxWeight + "]";
    }

    
}
