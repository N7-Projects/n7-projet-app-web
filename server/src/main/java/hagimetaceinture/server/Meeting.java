package hagimetaceinture.server;

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

    @OneToMany 
    private long guest;

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

    public long getGuest() {
        return guest;
    }

    public void setGuest(long guest) {
        this.guest = guest;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (idMeeting ^ (idMeeting >>> 32));
        result = prime * result + ((date == null) ? 0 : date.hashCode());
        result = prime * result + ((title == null) ? 0 : title.hashCode());
        result = prime * result + (int) (guest ^ (guest >>> 32));
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
        Meeting other = (Meeting) obj;
        if (idMeeting != other.idMeeting)
            return false;
        if (date == null) {
            if (other.date != null)
                return false;
        } else if (!date.equals(other.date))
            return false;
        if (title == null) {
            if (other.title != null)
                return false;
        } else if (!title.equals(other.title))
            return false;
        if (guest != other.guest)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Meeting [idMeeting=" + idMeeting + ", date=" + date + ", title=" + title + ", guest=" + guest + "]";
    } 

    

}
