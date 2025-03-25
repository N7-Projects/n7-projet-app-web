package hagimetaceinture.server;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class TypeVehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idTypeVehicule;
    
    private String name;
    
    private int nbWeel;

    private double maxVitesse;

    private double maxWeight;

    public TypeVehicule() {
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

    public int getNbWeel() {
        return nbWeel;
    }

    public void setNbWeel(int nbWeel) {
        this.nbWeel = nbWeel;
    }

    public double getMaxVitesse() {
        return maxVitesse;
    }

    public void setMaxVitesse(double maxVitesse) {
        this.maxVitesse = maxVitesse;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (idTypeVehicule ^ (idTypeVehicule >>> 32));
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + nbWeel;
        long temp;
        temp = Double.doubleToLongBits(maxVitesse);
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
        TypeVehicule other = (TypeVehicule) obj;
        if (idTypeVehicule != other.idTypeVehicule)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (nbWeel != other.nbWeel)
            return false;
        if (Double.doubleToLongBits(maxVitesse) != Double.doubleToLongBits(other.maxVitesse))
            return false;
        return true;
    }

    public double getMaxWeight() {
        return maxWeight;
    }

    public void setMaxWeight(double maxWeight) {
        this.maxWeight = maxWeight;
    }

    @Override
    public String toString() {
        return "TypeVehicule [idTypeVehicule=" + idTypeVehicule + ", name=" + name + ", nbWeel=" + nbWeel
                + ", maxVitesse=" + maxVitesse + ", maxWeight=" + maxWeight + "]";
    }

    
}
