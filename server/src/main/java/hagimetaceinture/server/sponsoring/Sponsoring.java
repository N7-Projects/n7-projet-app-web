package hagimetaceinture.server.sponsoring;

import java.time.Duration;
import java.sql.Date;

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

	private float investment;

	public Sponsoring() {
	}

	public Date getEndingDate() {
		long milliSec = getDate().getTime() + getDuration().toMillis();
		return new Date(milliSec);

	}

	public void setEndingDate(Date endingDate) {
		setDuration(Duration.ofMillis(endingDate.getTime() - getDate().getTime()));
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
				+ ", startingDate=" + getDate() + ", endingDate=" + getEndingDate() + ", investment=" + investment + "]";
	}

}
