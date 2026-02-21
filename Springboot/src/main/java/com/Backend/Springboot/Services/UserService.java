package com.Backend.Springboot.Services;

import com.Backend.Springboot.Entities.User;
import com.Backend.Springboot.Repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@AllArgsConstructor
@Service
public class UserService {

    private UserRepository userRepository;

    public User saveUser(User user)
    {
      return   userRepository.save(user);
    }

    public Optional<User> getUser(String userName) {
        return userRepository.findByUsername(userName);
    }

    public Optional<User> getUserById(Long id)
    {
        return userRepository.findById(id);
    }
}
