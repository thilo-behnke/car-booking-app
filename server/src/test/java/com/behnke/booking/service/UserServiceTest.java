package com.behnke.booking.service;

import com.behnke.booking.jpa.domain.User;
import com.behnke.booking.jpa.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = { UserService.class })
@ExtendWith(SpringExtension.class)
class UserServiceTest {

    @Autowired
    UserService userService;

    @MockBean
    UserRepository userRepository;

    User user;

    @BeforeEach
    public void setup() {
        createDummyUser();
    }

    @AfterEach
    public void cleanup() {
        reset(userRepository);
    }

    @Test
    public void findByName__fullName() {
        String firstName = user.getFirstName();
        String lastName = user.getLastName();
        userService.findByName(firstName, lastName);
        verify(userRepository, times(1)).findByFirstNameContainingAndLastNameContainingIgnoreCase(firstName, lastName);
        verify(userRepository, never()).findByFirstNameContainingIgnoreCase(Mockito.anyString());
        verify(userRepository, never()).findByLastNameContainingIgnoreCase(Mockito.anyString());
    }

    @Test
    public void findByName__firstName() {
        String firstName = user.getFirstName();
        userService.findByName(firstName, null);
        verify(userRepository, never()).findByFirstNameContainingAndLastNameContainingIgnoreCase(Mockito.anyString(), Mockito.anyString());
        verify(userRepository, times(1)).findByFirstNameContainingIgnoreCase(firstName);
        verify(userRepository, never()).findByLastNameContainingIgnoreCase(Mockito.anyString());
    }

    @Test
    public void findByName__lastName() {
        String lastName = user.getLastName();
        userService.findByName(null, lastName);
        verify(userRepository, never()).findByFirstNameContainingAndLastNameContainingIgnoreCase(Mockito.anyString(), Mockito.anyString());
        verify(userRepository, never()).findByFirstNameContainingIgnoreCase(Mockito.anyString());
        verify(userRepository, times(1)).findByLastNameContainingIgnoreCase(lastName);
    }

    @Test
    public void findByName__bothNull() {
        List<User> result = userService.findByName(null, null);
        assertTrue(result.isEmpty());
        verify(userRepository, never()).findByFirstNameContainingAndLastNameContainingIgnoreCase(Mockito.anyString(), Mockito.anyString());
        verify(userRepository, never()).findByFirstNameContainingIgnoreCase(Mockito.anyString());
        verify(userRepository, never()).findByLastNameContainingIgnoreCase(Mockito.anyString());
    }

    private void createDummyUser() {
        user = new User();
        user.setId(1L);
        user.setFirstName("Max");
        user.setLastName("Mustermann");
        user.setBirthday(LocalDate.of(1991, 3, 28));
    }
}
