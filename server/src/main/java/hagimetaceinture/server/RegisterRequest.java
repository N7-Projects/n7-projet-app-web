package hagimetaceinture.server;

public class RegisterRequest {
  private String email;
  private String password;

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  private String name;
  private String firstName;

  public String getName() {
    return name;
  }

  public String getFirstName() {
    return firstName;

  }

  private long idMembre;
  private boolean hasId = false;

  public boolean isHasId() {
    return hasId;
  }

  public long getIdMembre() {
    return idMembre;
  }

}
