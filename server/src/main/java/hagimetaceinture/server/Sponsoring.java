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

	public long getIdEcurie() {
		return idEcurie;
	}

	public void setIdEcurie(long idEcurie) {
		this.idEcurie = idEcurie;
	}

	public long getIdSponsor() {
		return idSponsor;
	}

	public void setIdSponsor(long idSponsor) {
		this.idSponsor = idSponsor;
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

    @Override
    public String toString() {
        return "Sponsoring [idSponsoring=" + idSponsoring + ", idEcurie=" + idEcurie + ", idSponsor=" + idSponsor
                + ", startingDate=" + startingDate + ", endingDate=" + endingDate + ", invest=" + invest + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (idSponsoring ^ (idSponsoring >>> 32));
        result = prime * result + (int) (idEcurie ^ (idEcurie >>> 32));
        result = prime * result + (int) (idSponsor ^ (idSponsor >>> 32));
        result = prime * result + ((startingDate == null) ? 0 : startingDate.hashCode());
        result = prime * result + ((endingDate == null) ? 0 : endingDate.hashCode());
        result = prime * result + Float.floatToIntBits(invest);
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
        Sponsoring other = (Sponsoring) obj;
        if (idSponsoring != other.idSponsoring)
            return false;
        if (idEcurie != other.idEcurie)
            return false;
        if (idSponsor != other.idSponsor)
            return false;
        if (startingDate == null) {
            if (other.startingDate != null)
                return false;
        } else if (!startingDate.equals(other.startingDate))
            return false;
        if (endingDate == null) {
            if (other.endingDate != null)
                return false;
        } else if (!endingDate.equals(other.endingDate))
            return false;
        if (Float.floatToIntBits(invest) != Float.floatToIntBits(other.invest))
            return false;
        return true;
    }

}
