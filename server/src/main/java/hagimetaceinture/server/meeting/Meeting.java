package hagimetaceinture.server.meeting;

import java.sql.Date;
import java.util.Collection;

import hagimetaceinture.server.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMeeting;
    
    private Date date;
    
    private String title;

    /**Les membres conviés à la réunion. */
    @OneToMany 
    private Collection<Member> guests;

    public Meeting() {
    }

    public long getIdMeeting() {
        return idMeeting;
    }

    public void setIdMeeting(long idMeeting) {
        this.idMeeting = idMeeting;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Collection<Member> getGuests() {
        return guests;
    }

    public void setGuests(Collection<Member> guests) {
        this.guests = guests;
    }

    @Override
    public String toString() {
        return "Meeting [idMeeting=" + idMeeting + ", date=" + date + ", title=" + title + ", guests=" + guests + "]";
    }

}
