package hagimetaceinture.server;

import java.util.Collection;

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

	/**Les Membres qui soutiennent l'écurie. */
    @ManyToMany
    private Collection<Membre> membres;

	/**Les Sponsors de l'ecurie. */
    @ManyToMany
    private Collection<Sponsor> sponsors;

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

    public Collection<Membre> getMembres() {
        return membres;
    }

    public void setMembres(Collection<Membre> membres) {
        this.membres = membres;
    }

    public Collection<Sponsor> getSponsors() {
        return sponsors;
    }

    public void setSponsors(Collection<Sponsor> sponsors) {
        this.sponsors = sponsors;
    }

    @Override
    public String toString() {
        return "Ecurie [idEcurie=" + idEcurie + ", nom=" + nom + ", classement=" + classement + ", membres=" + membres
                + ", sponsors=" + sponsors + "]";
    }

    
}
