package hagimetaceinture.server.member;

import org.springframework.data.jpa.repository.JpaRepository;

import hagimetaceinture.server.race.Race;

public interface MemberRepository extends JpaRepository<Member, Long> {

}