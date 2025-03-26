package hagimetaceinture.server.race;

import java.sql.Date;
import java.util.Collection;

import hagimetaceinture.server.circuit.Circuit;
import hagimetaceinture.server.member.Member;
import hagimetaceinture.server.vehiculetype.VehiculeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Race {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCourse;

    /** Plusieurs course peuvent se passer sur un même circuit. */
    @ManyToOne
    private Circuit circuit;

    private Date date;
    
    /**Une course est spécialisé dans un certains type de vehicule */
    @OneToOne
    private VehiculeType vehiculeType;

    @ManyToMany 
    private Collection<Member> participants;

    public Race() {
    }

    public long getIdCourse() {
        return idCourse;
    }

    public void setIdCourse(long idCourse) {
        this.idCourse = idCourse;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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
        return "Course [idCourse=" + idCourse + ", circuit=" + circuit + ", date=" + date + ", vehiculeType="
                + vehiculeType + ", participants=" + participants + "]";
    }


}
