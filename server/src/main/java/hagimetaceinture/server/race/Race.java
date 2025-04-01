package hagimetaceinture.server.race;

import java.util.Collection;

import hagimetaceinture.server.circuit.Circuit;
import hagimetaceinture.server.event.Event;
import hagimetaceinture.server.member.Member;
import hagimetaceinture.server.vehiculetype.VehiculeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Race extends Event {

  /** Plusieurs course peuvent se passer sur un même circuit. */
  @ManyToOne
  private Circuit circuit;

  /** Une course est spécialisé dans un certains type de vehicule */
  @OneToOne
  private VehiculeType vehiculeType;

  @ManyToMany
  private Collection<Member> participants;

  public Race() {
  }

  public Collection<Member> getParticipants() {
    return participants;
  }

  public void setParticipants(Collection<Member> participants) {
    this.participants = participants;
  }

  public Circuit getCircuit() {
    return circuit;
  }

  public void setCircuit(Circuit circuit) {
    this.circuit = circuit;
  }

  public VehiculeType getVehiculeType() {
    return vehiculeType;
  }

  public void setVehiculeType(VehiculeType vehiculeType) {
    this.vehiculeType = vehiculeType;
  }

  @Override
  public String toString() {
    return "Course [idCourse=" + getId() + ", circuit=" + circuit + ", date=" + getDate() + ", vehiculeType="
        + vehiculeType + ", participants=" + participants + "]";
  }

}
