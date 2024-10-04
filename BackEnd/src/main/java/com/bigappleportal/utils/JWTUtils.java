package com.bigappleportal.utils;

import com.bigappleportal.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JWTUtils {

    //Token expiration time sey to 7 days
    private static final long EXPIRATION_TIME = 1000L * 60 * 60 * 24 * 7; // 7 days

    //Secret key for signing the JWT
    private static SecretKey Key;

    //Constructor to initialize the JWT
    public JWTUtils() {
        //Base encoded secret key
        String secreteString = "72648391765489013246754823697R843756R932489TR548T76394R2837R7461T482763729109847652368947891236475846R5";
        //Decode the secret key into byte array
        byte[] keyBytes = Base64.getDecoder().decode(secreteString.getBytes(StandardCharsets.UTF_8));
        //Crate a secretkey object from the byte array
        this.Key = new SecretKeySpec(keyBytes, "HmacSHA256");

    }

    //Generate a JWT token for a given user
    public static String generateToken(User user) {
        return Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Key)
                .compact();
    }

    //Extract the username from the JWT token
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    //Generic method to extract claims from the token
    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
        return claimsTFunction.apply(Jwts.parser().verifyWith(Key).build().parseSignedClaims(token).getPayload());
    }

    //Validate the token against the user details
    public boolean isValidToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    //Check is the token has expired
    private boolean isTokenExpired(String token) {
        return extractClaims(token, Claims::getExpiration).before(new Date());
    }
}



