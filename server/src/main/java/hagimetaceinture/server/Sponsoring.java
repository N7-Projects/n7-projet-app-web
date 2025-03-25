package hagimetaceinture.server;

import java.sql.Date;

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
    private Ecurie ecurie;

    @OneToOne 
    private Sponsor sponsor;

    private Date startingDate;

    private Date endingDate;

    private float invest;

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

	public float getInvest() {
		return invest;
	}

	public void setInvest(float invest) {
		this.invest = invest;
	}

    public Ecurie getEcurie() {
        return ecurie;
    }

    public void setEcurie(Ecurie ecurie) {
        this.ecurie = ecurie;
    }

    public Sponsor getSponsor() {
        return sponsor;
    }

    public void setSponsor(Sponsor sponsor) {
        this.sponsor = sponsor;
    }

    @Override
    public String toString() {
        return "Sponsoring [idSponsoring=" + idSponsoring + ", ecurie=" + ecurie + ", sponsor=" + sponsor
                + ", startingDate=" + startingDate + ", endingDate=" + endingDate + ", invest=" + invest + "]";
    }

}
