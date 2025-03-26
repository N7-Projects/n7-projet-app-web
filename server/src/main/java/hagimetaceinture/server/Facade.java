package hagimetaceinture.server;

import java.awt.List;
import java.util.Collection;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import hagimetaceinture.server.circuit.Circuit;
import hagimetaceinture.server.circuit.CircuitRepository;
import hagimetaceinture.server.meeting.MeetingRepository;
import hagimetaceinture.server.member.MemberRepository;
import hagimetaceinture.server.race.RaceRepository;
import hagimetaceinture.server.racingteam.RacingTeamRepository;
import hagimetaceinture.server.sponsor.SponsorRepository;
import hagimetaceinture.server.sponsoring.SponsoringRepository;
import hagimetaceinture.server.vehicule.VehiculeRepository;
import hagimetaceinture.server.vehiculetype.VehiculeTypeRepository;
import jakarta.annotation.PostConstruct;

@RestController
public class Facade {
  @Autowired
  RaceRepository raceRepo;
  @Autowired
  MemberRepository memberRepo;
  @Autowired
  CircuitRepository circuitRepo;
  @Autowired
  MeetingRepository meetingRepo;
  @Autowired
  SponsorRepository sponsorRepo;
  @Autowired
  VehiculeRepository vehiculeRepo;
  @Autowired
  RacingTeamRepository racingTeamRepo;
  @Autowired
  SponsoringRepository sponsoringRepo;
  @Autowired
  VehiculeTypeRepository vehiculeTypeRepo;

  /**
   * Adds test circuits.
   */
  @PostConstruct
  public void populate() {
    circuitRepo.save(new Circuit("Test"));
  }

  @GetMapping("/circuits")
  public Collection<Circuit> getCircuits() {
    return circuitRepo.findAll();
  }

  @GetMapping("/circuits/{circuitId}")
  public Circuit getCircuit(@PathVariable String circuitId) {
    long id = Long.parseLong(circuitId);
    return circuitRepo.findById(id).get();
  }

  @PostMapping("/circuits/{circuitId}/edit")
  public void editCircuit(@PathVariable String circuitId) {
    // long id = Long.parseLong(circuitId);
    // Circuit c = circuitRepo.findById(id).get();
  }

}
