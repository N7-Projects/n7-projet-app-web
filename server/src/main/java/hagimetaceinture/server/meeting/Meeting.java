package hagimetaceinture.server.meeting;

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

  private String title;

  /** Les membres conviés à la réunion. */
  @OneToMany
  private Collection<Member> guests;

  public Meeting() {
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

  public Date getMeetingDate() {
    return this.getDate();
  }

  public void setMeetingDate(Date date) {
    this.setDate(date);
  }

  public void setGuests(Collection<Member> guests) {
    this.guests = guests;
  }

  @Override
  public String toString() {
    return "Meeting [idMeeting=" + getId() + ", date=" + getDate() + ", title=" +
        title + ", guests=" + guests + "]";
  }

}
