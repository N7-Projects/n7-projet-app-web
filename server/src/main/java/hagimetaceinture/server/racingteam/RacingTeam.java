package hagimetaceinture.server.racingteam;

import java.util.Collection;

import hagimetaceinture.server.member.Member;
import hagimetaceinture.server.sponsor.Sponsor;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity
public class RacingTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRacingTeam;

    private String nom;

    private int classement;

	/**Les Membres qui soutiennent l'écurie. */
    @ManyToMany
    private Collection<Member> membres;

	/**Les Sponsors de l'ecurie. */
    @ManyToMany
    private Collection<Sponsor> sponsors;

	public RacingTeam() {
	}

	public long getIdRacingTeam() {
		return idRacingTeam;
	}

	public void setIdRacingTeam(long idRacingTeam) {
		this.idRacingTeam = idRacingTeam;
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

    public Collection<Member> getMembres() {
        return membres;
    }

    public void setMembres(Collection<Member> membres) {
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
        return "RacingTeam [idRacingTeam=" + idRacingTeam + ", nom=" + nom + ", classement=" + classement + ", membres=" + membres
                + ", sponsors=" + sponsors + "]";
    }

    
}
