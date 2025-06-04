package hagimetaceinture.server;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.Duration;
import hagimetaceinture.server.circuit.Circuit;
import hagimetaceinture.server.circuit.CircuitRepository;
import hagimetaceinture.server.event.Event;
import hagimetaceinture.server.event.EventRepository;
import hagimetaceinture.server.forumtopic.ForumTopic;
import hagimetaceinture.server.forumtopic.ForumTopicRepository;
import hagimetaceinture.server.meeting.Meeting;
import hagimetaceinture.server.meeting.MeetingRepository;
import hagimetaceinture.server.member.Member;
import hagimetaceinture.server.member.MemberRepository;
import hagimetaceinture.server.message.Message;
import hagimetaceinture.server.message.MessageRepository;
import hagimetaceinture.server.race.RaceRepository;
import hagimetaceinture.server.racingteam.RacingTeam;
import hagimetaceinture.server.racingteam.RacingTeamRepository;
import hagimetaceinture.server.sponsor.Sponsor;
import hagimetaceinture.server.sponsor.SponsorRepository;
import hagimetaceinture.server.sponsoring.SponsoringRepository;
import hagimetaceinture.server.vehicule.Vehicule;
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
  private PasswordEncoder passwordEncoder;
  @Autowired
  private JwtService jwtService;
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
  @Autowired
  ForumTopicRepository forumTopicRepository;
  @Autowired
  MessageRepository messageRepository;

  /**
   * Adds test circuits. TODO: Remove this code.
   */
  // @PostConstruct
  public void populate() {
    // ajout d'un circuit
    Circuit circuit = new Circuit("Monza");
    circuit.setCreationDate(Date.valueOf("2025-04-20"));
    circuit.setDistance(5.793);
    circuit.setTurnNumber(11);
    circuit.setBestTime(1.20);
    circuit.setPlace("Italy");
    circuit.setSpectatorNumber(100000);
    circuitRepo.save(circuit);

    // ajout d'un Forum Topic
    ForumTopic ft = new ForumTopic();
    ft.setTitle("Le circuit de la Monza est-"
        + "il confortable pour les spectateurs ?");
    forumTopicRepository.save(ft);

    // check if event has been added
    System.out.println("\nList of circuits:");
    circuitRepo.findAll().forEach(System.out::println);
    System.out.println("List of events:");
    eventRepository.findAll().forEach(System.out::println);

    // ajout d'un véhicule
    Vehicule vehicule = new Vehicule();
    vehicule.setLicensePlate("WW-999-WW");
    vehicule.setModel("Porsche");
    vehicule.setFirstLicensePlate(Date.valueOf("2025-05-31"));

    // ajout d'un membre
    Member member = new Member();
    member.setFirstName("Guillaume");
    member.setName("Sablayrolles");
    member.setEmail("guigui@gmail.com");
    member.setPassword(passwordEncoder.encode("pwd"));
    member.addVehicule(vehicule);
    memberRepo.save(member);
    // ajout d'un sponsor
    Sponsor sponsor = new Sponsor();
    sponsor.setName("Hagimont Entertainment");
    sponsor.setInvestedCapital(5000);
    sponsor.setFundationDate(Date.valueOf("2025-04-25"));
    sponsorRepo.save(sponsor);

    Collection<Member> colMemb = new ArrayList<Member>();
    colMemb.add(member);
    Collection<Sponsor> colSpons = new ArrayList<Sponsor>();
    colSpons.add(sponsor);

    // ajout d'un équipe
    RacingTeam racingTeam = new RacingTeam();
    racingTeam.setNom("N7RT");
    racingTeam.setClassement(1);
    racingTeam.setMembres(colMemb);
    racingTeam.setSponsors(colSpons);
    racingTeamRepo.save(racingTeam);

    Meeting meet = new Meeting();

    meet.setTitle("Réunion trimestrielle");
    meet.setMeetingDate(Date.valueOf("2025-05-16"));
    meet.setDuration(Duration.ofDays(3));
    meetingRepo.save(meet);
  }

  // Circuits CRUD
  @GetMapping("/api/circuits")
  public Collection<Circuit> getCircuits() {

    return circuitRepo.findAll();
  }

  @GetMapping("/api/circuits/{circuitId}")
  public Circuit getCircuit(@PathVariable String circuitId) {
    long id = Long.parseLong(circuitId);
    return circuitRepo.findById(id).get();
  }

  @PutMapping("api/circuits/{circuitId}/edit")
  public Circuit editCircuit(@RequestHeader("Authorization") String authorizationHeader,
      @PathVariable String circuitId,
      @RequestBody Circuit editCircuit) {

    String token = authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring(7)
        : authorizationHeader;

    if (!jwtService.isTokenValid(token)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "Token invalide");
    }
    long id = Long.parseLong(circuitId);
    Circuit c = circuitRepo.findById(id).get();
    c.setBestTime(editCircuit.getBestTime());
    c.setCreationDate(editCircuit.getCreationDate());
    c.setDistance(editCircuit.getDistance());
    c.setDuration(editCircuit.getDuration());
    c.setName(editCircuit.getName());
    c.setPlace(editCircuit.getPlace());
    c.setSpectatorNumber(editCircuit.getSpectatorNumber());
    c.setTurnNumber(editCircuit.getTurnNumber());
    System.out.println("Editited circuit" + c);
    return circuitRepo.save(c);

  }

  @PostMapping("/api/circuits/new")
  public Circuit newCircuit(@RequestBody Circuit newCircuit) {
    System.out.println("Added new circuit " + newCircuit);
    return circuitRepo.save(newCircuit);
  }

  @DeleteMapping("/api/circuits/{circuitId}")
  public void deleteCircuit(@PathVariable String circuitId) {
    try {
      long id = Long.parseLong(circuitId);
      Circuit c = circuitRepo.findById(id).get();
      System.out.println(c.getId());
      circuitRepo.delete(c);
    } catch (NumberFormatException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "L'id : " + circuitId + " ne peut être transformé en Long.");
    } catch (NoSuchElementException e) {
      System.out.println("Pas de circuit d'id : " + circuitId);
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
          "Le circuit d'id : + " + circuitId + " n'existe pas.");
    }

  }

  // Calender CRUD

  @GetMapping("/api/calendar")
  public List<Map<String, Object>> getAllEvents() {
    List<Map<String, Object>> events = new ArrayList<>();

    raceRepo.findAll().iterator()
        .forEachRemaining((race -> events.add(mapEvent(race, "Race", race.getCircuit().getName()))));

    circuitRepo.findAll().iterator()
        .forEachRemaining(circuit -> events.add(mapEvent(circuit, "Circuit", circuit.getName())));
    meetingRepo.findAll().iterator()
        .forEachRemaining(meeting -> events.add(mapEvent(meeting, "Meeting", meeting.getTitle())));
    sponsoringRepo.findAll().iterator()
        .forEachRemaining(s -> events.add(mapEvent(s, "Sponsoring", s.getRacingTeam().getNom())));
    sponsorRepo.findAll().iterator()
        .forEachRemaining(sponsor -> events.add(mapEvent(sponsor, "Sponsor", sponsor.getName())));
    vehiculeRepo.findAll().iterator()
        .forEachRemaining(v -> events.add(mapEvent(v, "Vehicule", v.getModel())));

    return events;
  }

  private Map<String, Object> mapEvent(Event event, String type, String name) {
    Map<String, Object> map = new HashMap<>();
    map.put("id", event.getId());
    map.put("name", name);
    map.put("type", type);
    map.put("date", event.getDate());
    map.put("duration", event.getDuration()); // make sure it's ISO-8601 format e.g. PT1H30M
    return map;
  }

  @GetMapping("/api/calendar/{date}")
  public Collection<Event> getDate(@PathVariable String date) {
    Date dateD = Date.valueOf(date);
    String query = "SELECT e FROM Event e WHERE e.date = :date";
    TypedQuery<Event> q = entityManager.createQuery(query, Event.class);
    q.setParameter("date", dateD);
    return q.getResultList();
  }

  @PostMapping("/api/calendar/meeting")
  public void createMeeting(@RequestBody Meeting meeting,
      @RequestHeader("Authorization") String authorizationHeader) {
    String token = authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring(7)
        : authorizationHeader;

    if (!jwtService.isTokenValid(token)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "Token invalide");
    }
    System.out.println("Add Meeting");
    meetingRepo.save(meeting);
  }

  // Forum CRUD

  @GetMapping("/api/forum")
  public Collection<ForumTopic> getForumTopics() {
    return forumTopicRepository.findAll();
  }

  @GetMapping("/api/forum/{idForumTopic}")
  public Collection<Message> getMessageOnTopic(@PathVariable String idForumTopic) {

    // handle id parsing
    long id;
    try {
      id = Long.parseLong(idForumTopic);
    } catch (NumberFormatException e) {
      id = -1;
    }
    Collection<Message> res = new ArrayList<>();
    if (id != -1) {
      List<Message> lms = messageRepository.findAll();
      Optional<ForumTopic> oft = forumTopicRepository.findById(id);
      // whether the subject exists
      if (oft.isPresent()) {
        for (Message message : lms) {
          if (id == message.getSubject().getIdForumTopic()) {
            res.add(message);
            System.out.println("Id Message added = " + message.getIdMessage());
          }
        }
      }
    }

    return res;
  }

  @PostMapping("/api/forum/{idForumTopic}/post")
  public Message postMessageOnTopic(@RequestBody Message newMessage, @PathVariable String idForumTopic) {
    Message res = new Message();
    // precondition
    if (newMessage == null) {
      System.out.println("IGNORING: postMessageOnTopic(null)");
      return res;
    }
    if (newMessage.getText() == null) {
      System.out.println("IGNORING: postMessageOnTopic with a null text");
      return res;
    }

    if (newMessage.getText().length() == 0) {
      System.out.println("IGNORING: postMessageOnTopic with a empty text");
      return res;
    }

    newMessage.setDateOfPublication(LocalDateTime.now());

    // handler of the pathvariable
    long id;
    try {
      id = Long.parseLong(idForumTopic);
    } catch (NumberFormatException e) {
      id = -1;
      return res;
    }

    Optional<ForumTopic> ft = forumTopicRepository.findById(id);
    if (ft.isPresent()) {
      newMessage.setSubject(ft.get());
      res = messageRepository.save(newMessage);
    } else {
      System.out.println("IGNORING: postMessageOnTopic on no topic");
    }

    return res;
  }

  @GetMapping("/api/forum/{idForumTopic}/consult")
  public String getTiteTopic(@PathVariable String idForumTopic) {
    String res = "";
    long id;
    try {
      id = Long.parseLong(idForumTopic);
    } catch (NumberFormatException e) {
      id = -1;
    }

    if (id != -1) {
      Optional<ForumTopic> ft = forumTopicRepository.findById(id);
      if (ft.isPresent()) {
        res = ft.get().getTitle();
      }
    }
    return res;
  }

  @PostMapping("/api/forum/post")
  public ForumTopic postNewForumTopic(@RequestBody ForumTopic ft) {
    if (ft == null)
      return null;
    if (ft.getTitle() == null)
      return null;
    if (ft.getTitle() == "")
      return null;
    System.out.println("Preconde test passed to post : " + ft.getTitle());
    ForumTopic toSave = new ForumTopic(ft.getTitle());
    return forumTopicRepository.save(toSave);
  }

  // Racing team CRUD
  @GetMapping("/api/teams")
  public Collection<RacingTeam> getTeams() {
    return racingTeamRepo.findAll();
  }

  @GetMapping("/api/teams/{teamId}")
  public RacingTeam getOneTeam(@PathVariable String teamId) {
    // handle id parsing
    long id;
    try {
      id = Long.parseLong(teamId);
    } catch (NumberFormatException e) {
      id = -1;
    }
    if (id != -1) {
      Optional<RacingTeam> racingTeam = racingTeamRepo.findById(id);
      // whether the team exists
      if (racingTeam.isPresent()) {
        return racingTeam.get();
      }
    }

    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "L'équipe d'id : " + id + " n'existe pas");

  }

  @PutMapping("/api/teams/{teamId}/edit")
  public RacingTeam editTeam(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String teamId,
      @RequestBody RacingTeam editTeam) {
    String token = authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring(7)
        : authorizationHeader;

    if (!jwtService.isTokenValid(token)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "Token invalide");
    }

    long id = Long.parseLong(teamId);
    RacingTeam r = racingTeamRepo.findById(id).get();
    String email = jwtService.extractEmail(token);

    Optional<Member> member = memberRepo.findByEmail(email);
    if (member.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND,
          "L'adresse email " + email + " n'est liée à aucun compte");
    } else if (!member.get().getTeams().contains(r)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND,
          email + " address does not have write access to team " + r.getNom());

    }
    r.setClassement(editTeam.getClassement());
    r.setMembres(editTeam.getMembres());
    r.setNom(editTeam.getNom());
    r.setSponsors(editTeam.getSponsors());
    System.out.println("Editited team" + r);
    return racingTeamRepo.save(r);

  }

  @PostMapping("/api/teams/new")
  public RacingTeam newteam(@RequestBody RacingTeam newRacingTeam) {
    System.out.println("Added new team " + newRacingTeam);
    return racingTeamRepo.save(newRacingTeam);
  }

  @DeleteMapping("/api/teams/{teamId}")
  public void deleteTeam(@PathVariable String teamId) {
    try {
      long id = Long.parseLong(teamId);
      RacingTeam r = racingTeamRepo.findById(id).get();
      System.out.println(r.getIdRacingTeam());
      racingTeamRepo.delete(r);
    } catch (NumberFormatException e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "L'id : " + teamId + " ne peut être transformé en Long.");
    } catch (NoSuchElementException e) {
      System.out.println("Pas de circuit d'id : " + teamId);
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
          "La team d'id : + " + teamId + " n'existe pas.");
    }

  }

  @GetMapping("/api/register/homonyms/{name}/{firstName}")
  public Collection<Member> getFreeHomonyms(@PathVariable String name, @PathVariable String firstName) {

    // Get members with this name
    List<Member> members = memberRepo.findByName(name);
    return members.stream().filter(
        (m) -> m.getFirstName().equals(firstName))
        .filter(
            (m) -> m.getEmail() == null || m.getEmail().isEmpty())
        .toList();
  }

  @PostMapping("/api/register")
  public LoginInformation registerUser(@RequestBody RegisterRequest request) {
    if (memberRepo.findByEmail(request.getEmail()).isPresent()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "L'adresse email " + request.getEmail() + " est déjà liée à un compte");
    }
    if (!request.getEmail().contains("@")) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "L'adresse email " + request.getEmail() + " n'a pas la bonne forme");
    }

    Member member;
    // If an ID was provided or not
    if (request.isHasId()) {
      var memberOpt = memberRepo.findById(request.getIdMembre());

      if (memberOpt.isEmpty()) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
            "Ce membre n'existe pas");
      }
      member = memberOpt.get();
    } else {
      member = new Member();
      member.setName(request.getName());
      member.setFirstName(request.getFirstName());

    }
    String hashed = passwordEncoder.encode(request.getPassword());
    member.setEmail(request.getEmail());
    member.setPassword(hashed);
    member.setVehicules(new ArrayList<Vehicule>());
    member.setTeams(new ArrayList<RacingTeam>());

    memberRepo.save(member);
    String token = jwtService.generateToken(member.getEmail());
    return new LoginInformation(member, token);
  }

  @GetMapping("/api/connected")
  public Member isConnected(@RequestHeader("Authorization") String authorizationHeader) {
    String token = authorizationHeader.startsWith("Bearer ") ? authorizationHeader.substring(7)
        : authorizationHeader;

    if (!jwtService.isTokenValid(token)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
          "Token invalide");
    }
    String email = jwtService.extractEmail(token);

    Optional<Member> member = memberRepo.findByEmail(email);
    if (member.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND,
          "L'adresse email " + email + " n'est liée à aucun compte. (Ne devrait jamais arriver)");

    } else {
      return member.get();
    }
  }

  @PostMapping("/api/login")
  public LoginInformation loginUser(@RequestBody LoginRequest request) {
    Optional<Member> member = memberRepo.findByEmail(request.getEmail());
    if (member.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND,
          "L'adresse email " + request.getEmail() + " n'est liée à aucun compte");

    } else {
      if (passwordEncoder.matches(request.getPassword(), member.get().getPassword())) {
        String token = jwtService.generateToken(member.get().getEmail());
        return new LoginInformation(member.get(), token);
      } else {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
            "Mot de passe incorrect pour " + request.getEmail());

      }
    }
  }

  // Member CRUD
  @GetMapping("/api/members")
  public Collection<Member> getMembers() {
    return memberRepo.findAll();
  }

  @GetMapping("/api/members/{memberId}")
  @JsonIgnoreProperties("email")
  public Member getOneMember(@PathVariable String memberId) {
    long id = Long.parseLong(memberId);
    Member m = null;
    try {
      m = memberRepo.findById(id).get();
      // ! Not amrt but need to create serialization with ObjectMapper
      // ! I guess to create diff serialization between routes
      // ! Use interfaces or AbstarcClass to define new serialization
      m.setEmail(null);
    } catch (Error e) {
      throw new Error("Error in fetching member without email : " + e.getMessage());
    }
    return m;
  }

  @PostMapping("/api/members/new")
  public Member newMember(@RequestBody Member member) {
    if (member.getVehicules() == null) {
      member.setVehicules(new ArrayList<Vehicule>());
    }
    System.out.println("Added new member" + member);
    return memberRepo.save(member);

  }

  // Vehicule CRUD
  @GetMapping("/api/vehicules")
  public Collection<Vehicule> getVehicules() {
    return vehiculeRepo.findAll();
  }

  // Sponsor CRUD
  @GetMapping("/api/sponsors")
  public Collection<Sponsor> getSponsors() {
    return sponsorRepo.findAll();
  }

  @PostMapping("/api/sponsors/new")
  public Sponsor newSponsor(@RequestBody Sponsor sponsor) {
    System.out.println("Added new sponsor" + sponsor);
    return sponsorRepo.save(sponsor);
  }

}
