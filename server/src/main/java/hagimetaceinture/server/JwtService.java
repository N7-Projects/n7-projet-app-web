package hagimetaceinture.server;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.crypto.SecretKey;
import java.util.Date;

@Configuration
public class JwtService {

  private static final String SECRET = "very_secure_key_very_secure_key_very_secure_key_very_secure_key_very_secure_key";
  private static final long EXPIRATION_MS = 3600_000; // 1 hour

  private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

  public String generateToken(String email) {
    Date now = new Date();
    Date expiry = new Date(now.getTime() + EXPIRATION_MS);

    return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(now)
        .setExpiration(expiry)
        .signWith(key)
        .compact();
  }

  public String extractEmail(String token) {
    return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody()
        .getSubject();
  }

  public boolean isTokenValid(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (Exception e) {
      return false;
    }
  }
}
