package hagimetaceinture.server.sponsoring;

import java.time.Duration;
import java.util.Date;

import hagimetaceinture.server.event.Event;
import hagimetaceinture.server.racingteam.RacingTeam;
import hagimetaceinture.server.sponsor.Sponsor;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class Sponsoring extends Event {

	@OneToOne
	private RacingTeam racingTeam;

	@OneToOne
	private Sponsor sponsor;

	private Date startingDate;

	private Date endingDate;

	private float investment;

	public Sponsoring() {
	}

	public Date getStartingDate() {
		return startingDate;
	}

	public void setStartingDate(Date startingDate) {
		this.startingDate = startingDate;
	}

	public Date getEndingDate() {
		return endingDate;
	}

	public void setEndingDate(Date endingDate) {
		this.endingDate = endingDate;
	}

	public float getInvestment() {
		return investment;
	}

	public void setInvestment(float investment) {
		this.investment = investment;
	}

	public RacingTeam getRacingTeam() {
		return racingTeam;
	}

	public void setRacingTeam(RacingTeam racingTeam) {
		this.racingTeam = racingTeam;
	}

	public Sponsor getSponsor() {
		return sponsor;
	}

	public void setSponsor(Sponsor sponsor) {
		this.sponsor = sponsor;
	}

	@Override
	public String toString() {
		return "Sponsoring [idSponsoring=" + getId() + ", racingTeam=" + racingTeam + ", sponsor=" + sponsor
				+ ", startingDate=" + startingDate + ", endingDate=" + endingDate + ", investment=" + investment + "]";
	}

	@Override
	public java.util.Date getDate() {
		return startingDate;
	}

	@Override

	public Duration getDuration() {
		return Duration.ofMillis(endingDate.getTime() - startingDate.getTime());
	}

}
