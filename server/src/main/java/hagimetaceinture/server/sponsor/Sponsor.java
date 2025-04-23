package hagimetaceinture.server.sponsor;

import java.sql.Date;

import hagimetaceinture.server.event.Event;
import jakarta.persistence.Entity;

@Entity
public class Sponsor extends Event {

  private String name;

  private int investedCapital;

  public Sponsor() {
  }

  public int getInvestedCapital() {
    return investedCapital;
  }

  public void setInvestedCapital(int investedCapital) {
    this.investedCapital = investedCapital;
  }

  public Date getFundationDate() {
    return getDate();
  }

  public void setFundationDate(Date fundationDate) {
    setDate(fundationDate);
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + (int) (getId() ^ (getId() >>> 32));
    result = prime * result + investedCapital;
    result = prime * result + ((getDate() == null) ? 0 : getDate().hashCode());
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
    if (getId() != other.getId())
      return false;
    if (investedCapital != other.investedCapital)
      return false;
    if (getDate() == null) {
      if (other.getDate() != null)
        return false;
    } else if (!getDate().equals(other.getDate()))
      return false;
    return true;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Sponsor [idSponsor=" + getId() + ", name=" + name + ", investedCapital=" + investedCapital
        + ", fundationDate=" + getDate() + "]";
  }

}
