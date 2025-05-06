package hagimetaceinture.server;

public class LoginInformation {
  private long memberId;

  public long getMemberId() {
    return memberId;
  }

  public void setMemberId(long memberId) {
    this.memberId = memberId;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  private String token;

  public LoginInformation(long idMembre, String token) {
    this.memberId = idMembre;
    this.token = token;
  }

}
