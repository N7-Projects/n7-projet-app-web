package hagimetaceinture.server;

import hagimetaceinture.server.member.Member;

public class LoginInformation {
    private Member member;
    private String token;

    public Member getMember() {
        return member;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LoginInformation(Member membre, String token) {
        this.member = membre;
        this.token = token;
    }

    public LoginInformation() {
    };

}
