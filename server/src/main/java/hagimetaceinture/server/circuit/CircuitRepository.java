package hagimetaceinture.server.circuit;

import org.springframework.data.jpa.repository.JpaRepository;

import hagimetaceinture.server.race.Race;

public interface CircuitRepository extends JpaRepository<Race, Long> {

}