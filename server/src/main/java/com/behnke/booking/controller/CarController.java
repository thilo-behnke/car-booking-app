package com.behnke.booking.controller;

import com.behnke.booking.jpa.domain.Car;
import com.behnke.booking.service.CarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/v1/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    @GetMapping
    public List<Car> getCars() {
        log.debug("Getting all cars");
        return carService.findAll();
    }

    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return carService.saveCar(car);
    }

    @GetMapping(value = "/{id}")
    public Car getCarById(@PathVariable("id") Long id) {
        Optional<Car> optionalCar = carService.findById(id);
        return optionalCar.orElseThrow(
                () -> new NoSuchElementException("No car found with id " + id)
        );
    }

    @GetMapping(value = "/license_plate_available")
    public boolean isLicensePlateAvailable(@RequestParam("name") String licensePlateName) {
        Optional<Car> car = carService.findByLicensePlate(licensePlateName);
        return car.isEmpty();
    }
}
