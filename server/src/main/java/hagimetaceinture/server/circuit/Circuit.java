package hagimetaceinture.server.circuit;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Circuit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long idCircuit;

  private int turnNumber;

  private double distance;

  private double bestTime;

  private String name;

  private String place;

  private int spectatorNumber;

  private Date creationDate;

  public Circuit() {
  }

  public Circuit(String name) {
    this.name = name;
  }

  public long getIdCircuit() {
    return idCircuit;
  }

  public int getTurnNumber() {
    return turnNumber;
  }

  public double getDistance() {
    return distance;
  }

  public double getBestTime() {
    return bestTime;
  }

  public void setIdCircuit(long idCircuit) {
    this.idCircuit = idCircuit;
  }

  public void setTurnNumber(int turnNumber) {
    this.turnNumber = turnNumber;
  }

  public void setDistance(double distance) {
    this.distance = distance;
  }

  public void setBestTime(double bestTime) {
    this.bestTime = bestTime;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPlace() {
    return place;
  }

  public void setPlace(String place) {
    this.place = place;
  }

  public int getSpectatorNumber() {
    return spectatorNumber;
  }

  public void setSpectatorNumber(int spectatorNumber) {
    this.spectatorNumber = spectatorNumber;
  }

  public Date getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(Date creationDate) {
    this.creationDate = creationDate;
  }

  @Override
  public String toString() {
    return "Circuit [idCircuit=" + idCircuit + ", turnNumber=" + turnNumber + ", distance=" + distance
        + ", bestTime=" + bestTime + ", name=" + name + ", place=" + place + ", spectatorNumber="
        + spectatorNumber + ", creationDate=" + creationDate + "]";
  }

}
