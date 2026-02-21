package com.Backend.Springboot.Controllers;


import com.Backend.Springboot.Entities.User;
import com.Backend.Springboot.Services.UserDetailsServiceImpl;
import com.Backend.Springboot.Services.UserService;
import com.Backend.Springboot.config.JwtService;
import com.Backend.Springboot.dtos.LoginRequest;
import com.Backend.Springboot.dtos.RegisterRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Value("${jwt.refresh_token_expiration}")
    private int refreshTokenExpiration;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request , HttpServletResponse response)
    {
        System.out.println("entered");
        if (userService.getUser(request.getUsername()).isPresent())
            return ResponseEntity.badRequest().body(Map.of("Username","Username already exists pick another"));

        var newPassword = passwordEncoder.encode(request.getPassword());

        User user= new User();
        user.setUsername(request.getUsername());
        user.setPassword(newPassword);
        user.setEmail(request.getEmail());


        var moddedUser = userService.saveUser(user);

        var token = jwtService.generateAccessToken(user);
        var refreshToken= jwtService.generateRefreshToken(user);

        var cookie = new Cookie("refreshToken" , refreshToken);
        cookie.setSecure(false);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(refreshTokenExpiration);
        response.addCookie(cookie);


        return ResponseEntity.ok(Map.of("token",token))   ;

    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody LoginRequest request, HttpServletResponse response)
    {

        var authentication=  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword()));

        var userName = request.getUsername();

        var user = userService.getUser(userName).orElseThrow();



        var token = jwtService.generateAccessToken(user);
        var refreshToken= jwtService.generateRefreshToken(user);

        var cookie = new Cookie("refreshToken" , refreshToken);
        cookie.setSecure(false);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(refreshTokenExpiration);
        response.addCookie(cookie);
        return ResponseEntity.ok(Map.of("token", token));


    }

    //TODO Change the ID sub in the token

    @GetMapping("/refresh")
    public  ResponseEntity<Map<String,String>> refresh(@CookieValue(value = "refreshToken") String refreshToken)
    {
        System.out.println(refreshToken);
        if (!jwtService.isValid(refreshToken))
        { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();}

        var id=     jwtService.getIdFromToken(refreshToken);
        var user=  userService.getUserById(id).orElseThrow();
        var token = jwtService.generateAccessToken(user);

        return ResponseEntity.ok(Map.of("token",token));

    }



}
