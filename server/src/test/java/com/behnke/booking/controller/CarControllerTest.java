package com.behnke.booking.controller;

import com.behnke.booking.jpa.domain.Car;
import com.behnke.booking.service.CarService;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
class CarControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    CarService carService;

    @Test
    public void createCar() throws Exception {
        JSONObject carJson = new JSONObject();
        carJson.put("active", false);
        carJson.put("color", "blue");
        carJson.put("licensePlate", "MXX-124");
        carJson.put("model", "Golf");
        carJson.put("validTill", "2020-12-01");
        carJson.put("vin", "some-value");

        Car car = new Car();
        car.setActive(false);
        car.setColor("blue");
        car.setLicensePlate("MXX-124");
        car.setModel("Golf");
        car.setValidTill(LocalDate.of(2020, 12, 1));
        car.setVin("some-value");

        mvc.perform(post("/api/v1/cars").content(carJson.toString())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
        verify(carService, times(1)).saveCar(car);
    }
}
