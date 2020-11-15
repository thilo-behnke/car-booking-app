package com.behnke.booking.service;

import com.behnke.booking.jpa.domain.Car;
import com.behnke.booking.jpa.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarValidationService carValidationService;

    private final CarRepository carRepository;

    public Car saveCar(Car car) {
        Assert.notNull(car, "Car must not be null");

        List<String> validationErrors = carValidationService.validateCar(car);
        if(!validationErrors.isEmpty()) {
            throw new IllegalArgumentException(String.join("; ", validationErrors));
        }

        return carRepository.saveAndFlush(car);

    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Optional<Car> findById(Long id) {
        Assert.notNull(id, "Id must not be null");
        return carRepository.findById(id);
    }

    public Optional<Car> findByLicensePlate(String licensePlate) {
        Assert.hasLength(licensePlate, "License plate must not be empty");
        return carRepository.findByLicensePlate(licensePlate);
    }
}
