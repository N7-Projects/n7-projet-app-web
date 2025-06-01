package hagimetaceinture.server.member;

import java.util.ArrayList;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import hagimetaceinture.server.racingteam.RacingTeam;
import hagimetaceinture.server.vehicule.Vehicule;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idMembre;

    private String name;

    private String firstName;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("owner") // empêche l'affichage récursif de Vehicule.vowner (ne sérialize pas owner)
    private Collection<Vehicule> vehicules;

    @ManyToMany(mappedBy = "membres", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({ "membres", "sponsors", "classement" })
    private Collection<RacingTeam> teams;

    public Collection<RacingTeam> getTeams() {
        return teams;
    }

    public void setTeams(Collection<RacingTeam> teams) {
        this.teams = teams;
    }

    // @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

    private boolean subscriber;

    public Member() {
    }

    public long getIdMembre() {
        return idMembre;
    }

    public void setIdMembre(long idMembre) {
        this.idMembre = idMembre;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstname) {
        this.firstName = firstname;
    }

    public boolean isSubscriber() {
        return subscriber;
    }

    public void setSubscriber(boolean subscriber) {
        this.subscriber = subscriber;
    }

    public Collection<Vehicule> getVehicules() {
        return vehicules;
    }

    public void setVehicules(Collection<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }

    public void addVehicule(Vehicule vehicule) {
        if (vehicules == null) {
            vehicules = new ArrayList<>();
        }
        vehicules.add(vehicule);
        vehicule.setOwner(this);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Membre [idMembre=" + getIdMembre() + ", firstname=" + firstName + ", name=" + name
                + ", vehicules=" + getVehicules() + ", subscriber=" + subscriber + "] \n";
    }

}
