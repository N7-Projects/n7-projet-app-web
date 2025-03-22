package hagimetaceinture.server;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class Ecurie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idEcurie;

    private String nom;

    private int classement;

    @ManyToMany 
    private long idMembre;

    @ManyToMany
    private long idSponsor;

	public Ecurie() {
	}

	public long getIdEcurie() {
		return idEcurie;
	}

	public void setIdEcurie(long idEcurie) {
		this.idEcurie = idEcurie;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public int getClassement() {
		return classement;
	}

	public void setClassement(int classement) {
		this.classement = classement;
	}

	public long getIdMembre() {
		return idMembre;
	}

	public void setIdMembre(long idMembre) {
		this.idMembre = idMembre;
	}

	public long getIdSponsor() {
		return idSponsor;
	}

	public void setIdSponsor(long idSponsor) {
		this.idSponsor = idSponsor;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (idEcurie ^ (idEcurie >>> 32));
		result = prime * result + ((nom == null) ? 0 : nom.hashCode());
		result = prime * result + classement;
		result = prime * result + (int) (idMembre ^ (idMembre >>> 32));
		result = prime * result + (int) (idSponsor ^ (idSponsor >>> 32));
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
		Ecurie other = (Ecurie) obj;
		if (idEcurie != other.idEcurie)
			return false;
		if (nom == null) {
			if (other.nom != null)
				return false;
		} else if (!nom.equals(other.nom))
			return false;
		if (classement != other.classement)
			return false;
		if (idMembre != other.idMembre)
			return false;
		if (idSponsor != other.idSponsor)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Ecurie [idEcurie=" + idEcurie + ", nom=" + nom + ", classement=" + classement + ", idMembre=" + idMembre
				+ ", idSponsor=" + idSponsor + "]";
	}

    
}
