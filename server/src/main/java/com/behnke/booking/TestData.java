package com.behnke.booking;

import com.behnke.booking.jpa.domain.User;
import com.behnke.booking.jpa.domain.Car;
import com.behnke.booking.service.UserService;
import com.behnke.booking.service.CarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;

@Slf4j
@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
@RequiredArgsConstructor
public class TestData {

    private final UserService userService;

    private final CarService carService;

    @PostConstruct
    public void insertTestData() {
        insertTestUsers();
        insertTestCars();
    }

    private void insertTestUsers() {
        log.debug("Inserting test users");
        if (userService.findByEmail("max@mustermann.com").isEmpty()) {
            User testUser1 = new User();
            testUser1.setEmail("max@mustermann.com");
            testUser1.setFirstName("Max");
            testUser1.setLastName("Mustermann");
            testUser1.setBirthday(LocalDate.parse("1989-12-19"));

            userService.saveUser(testUser1);
        }

        if (userService.findByEmail("marie@musterfrau.com").isEmpty()) {
            User testUser2 = new User();
            testUser2.setEmail("marie@musterfrau.com");
            testUser2.setFirstName("Marie");
            testUser2.setLastName("Musterfrau");
            testUser2.setBirthday(LocalDate.parse("1982-10-11"));

            userService.saveUser(testUser2);
        }
    }

    private void insertTestCars() {
        log.debug("Inserting test cars");
        if (carService.findByLicensePlate("IN-7777").isEmpty()) {
            Car testCar1 = new Car();
            testCar1.setLicensePlate("IN-7777");
            testCar1.setModel("Golf");
            testCar1.setColor("red");
            testCar1.setActive(true);
            testCar1.setVin("2039-9203");
            testCar1.setValidTill(LocalDate.now().plusDays(1));

            carService.saveCar(testCar1);
        }

        if (carService.findByLicensePlate("IN-8989").isEmpty()) {
            Car testCar2 = new Car();
            testCar2.setLicensePlate("IN-8989");
            testCar2.setModel("Polo");
            testCar2.setColor("black");
            testCar2.setActive(true);
            testCar2.setVin("2939-0988");
            testCar2.setValidTill(LocalDate.now().plusDays(1));

            carService.saveCar(testCar2);
        }
    }
}

