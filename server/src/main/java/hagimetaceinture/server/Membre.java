package hagimetaceinture.server;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Membre {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMembre;
    
    private String nom;
    
    private String prenom;

    @OneToMany
    private long idVehicule;

    private boolean cotisant;

	public Membre() {
    }

    public long getIdMembre() {
		return idMembre;
	}

	public void setIdMembre(long idMembre) {
		this.idMembre = idMembre;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public long getIdVehicule() {
		return idVehicule;
	}

	public void setIdVehicule(long idVehicule) {
		this.idVehicule = idVehicule;
	}

	public boolean isCotisant() {
		return cotisant;
	}

	public void setCotisant(boolean cotisant) {
		this.cotisant = cotisant;
	}

    @Override
    public String toString() {
        return "Membre [idMembre=" + idMembre + ", nom=" + nom + ", prenom=" + prenom + ", idVehicule=" + idVehicule
                + ", cotisant=" + cotisant + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (idMembre ^ (idMembre >>> 32));
        result = prime * result + ((nom == null) ? 0 : nom.hashCode());
        result = prime * result + ((prenom == null) ? 0 : prenom.hashCode());
        result = prime * result + (int) (idVehicule ^ (idVehicule >>> 32));
        result = prime * result + (cotisant ? 1231 : 1237);
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
        Membre other = (Membre) obj;
        if (idMembre != other.idMembre)
            return false;
        if (nom == null) {
            if (other.nom != null)
                return false;
        } else if (!nom.equals(other.nom))
            return false;
        if (prenom == null) {
            if (other.prenom != null)
                return false;
        } else if (!prenom.equals(other.prenom))
            return false;
        if (idVehicule != other.idVehicule)
            return false;
        if (cotisant != other.cotisant)
            return false;
        return true;
    }
    
}
