package hagimetaceinture.server;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Sponsor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idSponsor;

    private int investCapital;

    private Date fundationDate;

    public Sponsor() {
    }

    public long getIdSponsor() {
        return idSponsor;
    }

    public void setIdSponsor(long idSponsor) {
        this.idSponsor = idSponsor;
    }

    public int getInvestCapital() {
        return investCapital;
    }

    public void setInvestCapital(int investCapital) {
        this.investCapital = investCapital;
    }

    public Date getFundationDate() {
        return fundationDate;
    }

    public void setFundationDate(Date fundationDate) {
        this.fundationDate = fundationDate;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (idSponsor ^ (idSponsor >>> 32));
        result = prime * result + investCapital;
        result = prime * result + ((fundationDate == null) ? 0 : fundationDate.hashCode());
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
        Sponsor other = (Sponsor) obj;
        if (idSponsor != other.idSponsor)
            return false;
        if (investCapital != other.investCapital)
            return false;
        if (fundationDate == null) {
            if (other.fundationDate != null)
                return false;
        } else if (!fundationDate.equals(other.fundationDate))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Sponsor [idSponsor=" + idSponsor + ", investCapital=" + investCapital + ", fundationDate="
                + fundationDate + "]";
    }


}
