package hagimetaceinture.server.meeting;

import java.sql.Date;
import java.util.Collection;
import hagimetaceinture.server.event.Event;
import hagimetaceinture.server.member.Member;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Meeting extends Event {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private Date date;

  private String title;

  /** Les membres conviés à la réunion. */
  @OneToMany
  private Collection<Member> guests;

  public Meeting() {
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
    return "Meeting [idMeeting=" + getId() + ", date=" + date + ", title=" +
        title + ", guests=" + guests + "]";
  }

}
