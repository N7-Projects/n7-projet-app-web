package hagimetaceinture.server.member;

import java.util.Collection;

import hagimetaceinture.server.vehicule.Vehicule;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Member {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMembre;
    
    private String name;
    
    private String firstname;

    @OneToMany
    private Collection<Vehicule> vehicules;

    private boolean subscriber;

	public Member() {
    }

    public long getIdMembre() {
		return idMembre;
	}

	public void setIdMembre(long idMembre) {
		this.idMembre = idMembre;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public boolean isSubscriber() {
		return subscriber;
	}

	public void setSubscriber(boolean subscriber) {
		this.subscriber = subscriber;
	}

    public Collection<Vehicule> getVehicules() {
        return vehicules;
    }

    public void setVehicules(Collection<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }

}
