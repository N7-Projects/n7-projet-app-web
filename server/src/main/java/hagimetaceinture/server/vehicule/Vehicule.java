package hagimetaceinture.server.vehicule;

import java.sql.Date;

import hagimetaceinture.server.member.Member;
import hagimetaceinture.server.vehiculetype.VehiculeType;
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
    private VehiculeType vehiculeType;

    private String branch;

    private String model;

    private String licensePlate;

    @ManyToOne
    private Member owner;

    private Date firstLicensePlate;

	public Vehicule() {
    }

    public long getIdVehicule() {
		return idVehicule;
	}

	public void setIdVehicule(long idVehicule) {
		this.idVehicule = idVehicule;
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

	public Date getFirstLicensePlate() {
		return firstLicensePlate;
	}

	public void setFirstLicensePlate(Date firstLicensePlate) {
		this.firstLicensePlate = firstLicensePlate;
	}

    public VehiculeType getVehiculeType() {
        return vehiculeType;
    }

    public void setVehiculeType(VehiculeType vehiculeType) {
        this.vehiculeType = vehiculeType;
    }

    @Override
    public String toString() {
        return "Vehicule [idVehicule=" + idVehicule + ", vehiculeType=" + vehiculeType + ", branch=" + branch
                + ", model=" + model + ", licensePlate=" + licensePlate + ", owner=" + owner + ", firstLicensePlate="
                + firstLicensePlate + "]";
    }

    public Member getOwner() {
        return owner;
    }

    public void setOwner(Member owner) {
        this.owner = owner;
    }

}
