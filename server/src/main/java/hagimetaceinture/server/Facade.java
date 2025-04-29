package hagimetaceinture.server;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import hagimetaceinture.server.circuit.Circuit;
import hagimetaceinture.server.circuit.CircuitRepository;
import hagimetaceinture.server.event.Event;
import hagimetaceinture.server.event.EventRepository;
import hagimetaceinture.server.forumtopic.ForumTopic;
import hagimetaceinture.server.forumtopic.ForumTopicRepository;
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
import org.springframework.web.bind.annotation.RequestParam;

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
    @Autowired
    ForumTopicRepository forumTopicRepository;
    @Autowired
    MessageRepository messageRepository;

    /**
     * Adds test circuits. TODO: Remove this code.
     */
    @PostConstruct
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

        // ajout d'un membre
        Member member = new Member();
        member.setFirstname("Guillaume");
        member.setName("Sablayrolles");
        member.addVehicule(vehicule);
        memberRepo.save(member);

        // ajout d'un sponsor
        Sponsor sponsor = new Sponsor();
        sponsor.setName("BlackRock");
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

    @PostMapping("api/circuits/{circuitId}/edit")
    public void editCircuit(@PathVariable String circuitId) {
        // long id = Long.parseLong(circuitId);
        // Circuit c = circuitRepo.findById(id).get();
    }

    @PostMapping("api/circuits/new")
    public Circuit newCircuit(@RequestBody Circuit newCircuit) {
        System.out.println("Added new circuit " + newCircuit);
        return circuitRepo.save(newCircuit);
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
    public RacingTeam getMethodName(@PathVariable String teamId) {
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

    // Member CRUD
    @GetMapping("/api/members")
    public Collection<Member> getMembers() {
        return memberRepo.findAll();
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

}
