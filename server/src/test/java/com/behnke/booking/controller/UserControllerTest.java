package com.behnke.booking.controller;

import com.behnke.booking.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    UserService userService;

    @Test
    public void getUsers__withoutNameParams() throws Exception {
        mvc.perform(get("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(userService, times(1)).findAll();
        verify(userService, never()).findByName(Mockito.anyString(), Mockito.anyString());
    }

    @Test
    public void getUsers__withNameParams() throws Exception {
        mvc.perform(get("/api/v1/users").param("first_name", "Thilo").param("last_name", "Behnke")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(userService, never()).findAll();
        verify(userService, times(1)).findByName("Thilo", "Behnke");
    }
}
