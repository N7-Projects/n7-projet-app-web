package hagimetaceinture.server.sponsoring;

import java.sql.Date;

import hagimetaceinture.server.racingteam.RacingTeam;
import hagimetaceinture.server.sponsor.Sponsor;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Sponsoring {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idSponsoring;
    
    @OneToOne 
    private RacingTeam racingTeam;

    @OneToOne 
    private Sponsor sponsor;

    private Date startingDate;

    private Date endingDate;

    private float investment;

	public Sponsoring() {
	}

	public long getIdSponsoring() {
		return idSponsoring;
	}

	public void setIdSponsoring(long idSponsoring) {
		this.idSponsoring = idSponsoring;
	}

	public Date getStartingDate() {
		return startingDate;
	}

	public void setStartingDate(Date startingDate) {
		this.startingDate = startingDate;
	}

	public Date getEndingDate() {
		return endingDate;
	}

	public void setEndingDate(Date endingDate) {
		this.endingDate = endingDate;
	}

	public float getInvestment() {
		return investment;
	}

	public void setInvestment(float investment) {
		this.investment = investment;
	}

    public RacingTeam getRacingTeam() {
        return racingTeam;
    }

    public void setRacingTeam(RacingTeam racingTeam) {
        this.racingTeam = racingTeam;
    }

    public Sponsor getSponsor() {
        return sponsor;
    }

    public void setSponsor(Sponsor sponsor) {
        this.sponsor = sponsor;
    }

    @Override
    public String toString() {
        return "Sponsoring [idSponsoring=" + idSponsoring + ", racingTeam=" + racingTeam + ", sponsor=" + sponsor
                + ", startingDate=" + startingDate + ", endingDate=" + endingDate + ", investment=" + investment + "]";
    }

}
