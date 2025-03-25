package hagimetaceinture.server;

import java.util.Collection;

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
    private Collection<Vehicule> vehicules;

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

	public boolean isCotisant() {
		return cotisant;
	}

	public void setCotisant(boolean cotisant) {
		this.cotisant = cotisant;
	}

    public Collection<Vehicule> getVehicules() {
        return vehicules;
    }

    public void setVehicules(Collection<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }

}
