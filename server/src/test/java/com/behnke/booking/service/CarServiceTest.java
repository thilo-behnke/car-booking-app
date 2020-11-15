package com.behnke.booking.service;

import com.behnke.booking.jpa.domain.Car;
import com.behnke.booking.jpa.repository.CarRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = { CarService.class, CarValidationService.class })
@ExtendWith(SpringExtension.class)
class CarServiceTest {

    @Autowired
    CarService carService;

    @MockBean
    CarRepository carRepository;

    Car car;

    @AfterEach
    public void cleanup() {
        car = null;
    }

    @Test
    public void createCar() {
        createValidCar();
        carService.saveCar(car);
        verify(carRepository, times(1)).saveAndFlush(car);
    }

    @Test
    public void createCar__nullConstraintViolation() {
        createCarWithNullFields();
        assertThrows(IllegalArgumentException.class, () -> carService.saveCar(car));
        verify(carRepository, never()).saveAndFlush(Mockito.any());
    }

    @Test
    public void createCar__validTillPresentDateViolation() {
        createCarWithPresentValidTillDate();
        assertThrows(IllegalArgumentException.class, () -> carService.saveCar(car));
        verify(carRepository, never()).saveAndFlush(Mockito.any());
    }

    @Test
    public void createCar__validTillPastDateViolation() {
        createCarWithPastValidTillDate();
        assertThrows(IllegalArgumentException.class, () -> carService.saveCar(car));
        verify(carRepository, never()).saveAndFlush(Mockito.any());
    }

    private void createCarWithNullFields() {
        car = new Car();
        car.setVin("test");
        car.setLicensePlate("test");
    }

    private void createValidCar() {
        car = new Car();
        car.setVin("test");
        car.setLicensePlate("test");
        car.setColor("test");
        car.setModel("test");
        car.setActive(true);
        car.setValidTill(LocalDate.now().plusDays(1));
    }

    private void createCarWithPastValidTillDate() {
        car = new Car();
        car.setVin("test");
        car.setLicensePlate("test");
        car.setColor("test");
        car.setModel("test");
        car.setActive(true);
        car.setValidTill(LocalDate.now().minusDays(1));
    }

    private void createCarWithPresentValidTillDate() {
        car = new Car();
        car.setVin("test");
        car.setLicensePlate("test");
        car.setColor("test");
        car.setModel("test");
        car.setActive(true);
        car.setValidTill(LocalDate.now());
    }
}
