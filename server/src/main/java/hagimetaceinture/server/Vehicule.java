package hagimetaceinture.server;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Vehicule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idVehicule;

    @ManyToOne
    private long idVehiculeType;

    private String branch;

    private String model;

    private String licensePlate;

    @ManyToOne
    private long owner;

    private Date firstLicensePlate;

	public Vehicule() {
    }

    public long getIdVehicule() {
		return idVehicule;
	}

	public void setIdVehicule(long idVehicule) {
		this.idVehicule = idVehicule;
	}

	public long getIdVehiculeType() {
		return idVehiculeType;
	}

	public void setIdVehiculeType(long idVehiculeType) {
		this.idVehiculeType = idVehiculeType;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getLicensePlate() {
		return licensePlate;
	}

	public void setLicensePlate(String licensePlate) {
		this.licensePlate = licensePlate;
	}

	public long getOwner() {
		return owner;
	}

	public void setOwner(long owner) {
		this.owner = owner;
	}

	public Date getFirstLicensePlate() {
		return firstLicensePlate;
	}

	public void setFirstLicensePlate(Date firstLicensePlate) {
		this.firstLicensePlate = firstLicensePlate;
	}

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (idVehicule ^ (idVehicule >>> 32));
        result = prime * result + (int) (idVehiculeType ^ (idVehiculeType >>> 32));
        result = prime * result + ((branch == null) ? 0 : branch.hashCode());
        result = prime * result + ((model == null) ? 0 : model.hashCode());
        result = prime * result + ((licensePlate == null) ? 0 : licensePlate.hashCode());
        result = prime * result + (int) (owner ^ (owner >>> 32));
        result = prime * result + ((firstLicensePlate == null) ? 0 : firstLicensePlate.hashCode());
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
        Vehicule other = (Vehicule) obj;
        if (idVehicule != other.idVehicule)
            return false;
        if (idVehiculeType != other.idVehiculeType)
            return false;
        if (branch == null) {
            if (other.branch != null)
                return false;
        } else if (!branch.equals(other.branch))
            return false;
        if (model == null) {
            if (other.model != null)
                return false;
        } else if (!model.equals(other.model))
            return false;
        if (licensePlate == null) {
            if (other.licensePlate != null)
                return false;
        } else if (!licensePlate.equals(other.licensePlate))
            return false;
        if (owner != other.owner)
            return false;
        if (firstLicensePlate == null) {
            if (other.firstLicensePlate != null)
                return false;
        } else if (!firstLicensePlate.equals(other.firstLicensePlate))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Vehicule [idVehicule=" + idVehicule + ", idVehiculeType=" + idVehiculeType + ", branch=" + branch
                + ", model=" + model + ", licensePlate=" + licensePlate + ", owner=" + owner + ", firstLicensePlate="
                + firstLicensePlate + "]";
    }


}
