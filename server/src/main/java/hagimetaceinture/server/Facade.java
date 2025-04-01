package hagimetaceinture.server;

import java.sql.Date;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import hagimetaceinture.server.circuit.Circuit;
import hagimetaceinture.server.circuit.CircuitRepository;
import hagimetaceinture.server.event.Event;
import hagimetaceinture.server.event.EventRepository;
import hagimetaceinture.server.meeting.MeetingRepository;
import hagimetaceinture.server.member.MemberRepository;
import hagimetaceinture.server.race.RaceRepository;
import hagimetaceinture.server.racingteam.RacingTeamRepository;
import hagimetaceinture.server.sponsor.SponsorRepository;
import hagimetaceinture.server.sponsoring.SponsoringRepository;
import hagimetaceinture.server.vehicule.VehiculeRepository;
import hagimetaceinture.server.vehiculetype.VehiculeTypeRepository;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@RestController
public class Facade {
  @Autowired
  private EntityManager entityManager;
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
  @Autowired
  EventRepository eventRepository;

  /**
   * Adds test circuits. TODO: Remove this code.
   */
  @PostConstruct
  public void populate() {
    Circuit circuit = new Circuit("Monza");
    circuit.setDate(Date.valueOf("1980-01-01"));
    circuit.setDistance(5.793);
    circuit.setTurnNumber(11);
    circuit.setBestTime(1.20);
    circuit.setPlace("Italy");
    circuit.setSpectatorNumber(100000);
    circuitRepo.save(circuit);

    // check if event has been added
    System.out.println("\nList of circuits:");
    circuitRepo.findAll().forEach(System.out::println);
    System.out.println("List of events:");
    eventRepository.findAll().forEach(System.out::println);

  }

  @GetMapping("/api/circuits")
  public Collection<Circuit> getCircuits() {

    return circuitRepo.findAll();
  }

  @GetMapping("/api/circuits/{circuitId}")
  public Circuit getCircuit(@PathVariable String circuitId) {
    long id = Long.parseLong(circuitId);
    return circuitRepo.findById(id).get();
  }

  @PostMapping("pi/circuits/{circuitId}/edit")
  public void editCircuit(@PathVariable String circuitId) {
    // long id = Long.parseLong(circuitId);
    // Circuit c = circuitRepo.findById(id).get();
  }

  @GetMapping("/api/calendar")
  public Collection<Event> getCalendar() {
    return eventRepository.findAll();
  }

  @GetMapping("/api/calendar/{date}")
  public Collection<Event> getDate(@PathVariable String date) {
    Date dateD = Date.valueOf(date);
    String query = "SELECT e FROM Event e WHERE e.date = :date";
    TypedQuery<Event> q = entityManager.createQuery(query, Event.class);
    q.setParameter("date", dateD);
    return q.getResultList();
  }

}
