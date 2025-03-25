package hagimetaceinture.server;

import java.sql.Date;
import java.util.Collection;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idCourse;

    /** Plusieurs course peuvent se passer sur un même circuit. */
    @ManyToOne
    private Circuit circuit;

    private Date date;
    
    /**Une course est spécialisé dans un certains type de vehicule */
    @OneToOne
    private TypeVehicule typeVehicule;

    @ManyToMany 
    private Collection<Membre> participants;

    public Course() {
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

    public Collection<Membre> getParticipants() {
        return participants;
    }

    public void setParticipants(Collection<Membre> participants) {
        this.participants = participants;
    }

    public Circuit getCircuit() {
        return circuit;
    }

    public void setCircuit(Circuit circuit) {
        this.circuit = circuit;
    }

    public TypeVehicule getTypeVehicule() {
        return typeVehicule;
    }

    public void setTypeVehicule(TypeVehicule typeVehicule) {
        this.typeVehicule = typeVehicule;
    }

    @Override
    public String toString() {
        return "Course [idCourse=" + idCourse + ", circuit=" + circuit + ", date=" + date + ", typeVehicule="
                + typeVehicule + ", participants=" + participants + "]";
    }


}
