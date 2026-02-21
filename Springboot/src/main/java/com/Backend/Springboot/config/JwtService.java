package com.Backend.Springboot.config;

import com.Backend.Springboot.Entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {


    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access_token_expiration}")
    private int accessTokenExpiration;

    @Value("${jwt.refresh_token_expiration}")
    private int refreshTokenExpiration;


    private String generateToken(User user,int expirationSec)
    {
        System.out.println(" current time:" +new Date() + "\n currenttimemillis: "+System.currentTimeMillis()+ "\nadded: "+1000 * expirationSec + "\nso expiry: " +new Date(System.currentTimeMillis() + (1000 * expirationSec)));
        return Jwts.builder()
                .subject(Long.toString(user.getId()))
                .claim("username",user.getUsername())
                .claim("email",user.getEmail())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + (1000 * expirationSec)))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    public String generateAccessToken(User user)
    {
        return generateToken(user,accessTokenExpiration);
    }

    public String generateRefreshToken(User user)
    {
        return generateToken(user,refreshTokenExpiration);
    }

    public Claims getClaims(String token)
    {
        return Jwts.parser().verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes())).build().parseSignedClaims(token).getPayload();
    }

    public Long getIdFromToken(String token)
    {
        return Long.valueOf(getClaims(token).getSubject());
    }

    public String getUserNameFromToken (String token){
        return getClaims(token).get("username",String.class);
    }
    public String getEmailFromToken (String token){
        return getClaims(token).get("email",String.class);
    }

    public Boolean isValid(String token)
    {
        return getClaims(token).getExpiration().after(new Date());
    }
}
