package hagimetaceinture.server.racingteam;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RacingTeamRepository extends JpaRepository<RacingTeam, Long> {

    @Query("SELECT t FROM RacingTeam t JOIN t.membres m WHERE m.idMembre = ?1")
    Collection<RacingTeam> getMemberTeams(long memberId);
}
