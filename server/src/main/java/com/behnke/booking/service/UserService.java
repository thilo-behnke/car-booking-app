package com.behnke.booking.service;

import com.behnke.booking.jpa.domain.User;
import com.behnke.booking.jpa.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User saveUser(User user) {
        Assert.notNull(user, "User must not be null");
        return userRepository.saveAndFlush(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id) {
        Assert.notNull(id, "Id must not be null");
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        Assert.hasLength(email, "Email must not be empty");
        return userRepository.findByEmail(email);
    }

    /**
     * Find by firstName and/or lastName.
     * @param firstName nullable string.
     * @param lastName nullable string.
     * @return a list of Users for the given name, if both firstName and lastName are null returns an empty list.
     */
    public List<User> findByName(@Nullable String firstName, @Nullable String lastName) {
        if (firstName != null && lastName != null) {
            return userRepository.findByFirstNameContainingAndLastNameContainingIgnoreCase(firstName, lastName);
        } else if (firstName != null) {
            return userRepository.findByFirstNameContainingIgnoreCase(firstName);
        } else if (lastName != null) {
            return userRepository.findByLastNameContainingIgnoreCase(lastName);
        } else {
            return new ArrayList<>();
        }
    }
}
