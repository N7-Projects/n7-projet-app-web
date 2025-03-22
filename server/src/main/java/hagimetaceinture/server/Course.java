package hagimetaceinture.server;

import jakarta.annotation.Generated;
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
    private long idCircuit;

    private Date date;
    
    /**Une course est spécialisé dans un certains type de vehicule */
    @OneToOne
    private long idTypeVehicule;

    @ManyToMany 
    private long Parcipant;

    public Course() {
    }

    public long getIdCourse() {
        return idCourse;
    }

    public void setIdCourse(long idCourse) {
        this.idCourse = idCourse;
    }

    public long getIdCircuit() {
        return idCircuit;
    }

    public void setIdCircuit(long idCircuit) {
        this.idCircuit = idCircuit;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getIdTypeVehicule() {
        return idTypeVehicule;
    }

    public void setIdTypeVehicule(long idTypeVehicule) {
        this.idTypeVehicule = idTypeVehicule;
    }

    public long getParcipant() {
        return Parcipant;
    }

    public void setParcipant(long parcipant) {
        Parcipant = parcipant;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (idCourse ^ (idCourse >>> 32));
        result = prime * result + (int) (idCircuit ^ (idCircuit >>> 32));
        result = prime * result + ((date == null) ? 0 : date.hashCode());
        result = prime * result + (int) (idTypeVehicule ^ (idTypeVehicule >>> 32));
        result = prime * result + (int) (Parcipant ^ (Parcipant >>> 32));
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
        Course other = (Course) obj;
        if (idCourse != other.idCourse)
            return false;
        if (idCircuit != other.idCircuit)
            return false;
        if (date == null) {
            if (other.date != null)
                return false;
        } else if (!date.equals(other.date))
            return false;
        if (idTypeVehicule != other.idTypeVehicule)
            return false;
        if (Parcipant != other.Parcipant)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Course [idCourse=" + idCourse + ", idCircuit=" + idCircuit + ", date=" + date + ", idTypeVehicule="
                + idTypeVehicule + ", Parcipant=" + Parcipant + "]";
    }


}
