package com.behnke.booking.controller;

import com.behnke.booking.jpa.domain.User;
import com.behnke.booking.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getUsers(@RequestParam("first_name") Optional<String> firstName, @RequestParam("last_name") Optional<String> lastName) {
        if(firstName.isEmpty() && lastName.isEmpty()) {
            log.debug("Getting all users");
            return userService.findAll();
        }

        String firstNameVal = firstName.orElse(null);
        String lastNameVal = lastName.orElse(null);
        log.debug(String.format("Getting all users filtered by firstName = %s and lastName = %s", firstNameVal, lastNameVal));
        return userService.findByName(firstNameVal, lastNameVal);
    }

    @GetMapping(value = "/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        Optional<User> optionalUser = userService.findById(id);
        return optionalUser.orElseThrow(
                () -> new NoSuchElementException("No user found with id " + id)
        );
    }
}
