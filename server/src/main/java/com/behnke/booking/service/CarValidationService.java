package com.behnke.booking.service;

import com.behnke.booking.jpa.domain.Car;
import org.springframework.stereotype.Service;

import javax.validation.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CarValidationService {
    public List<String> validateCar(Car car) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<Car>> violations = validator.validate(car);
        // TODO: Ok for now, however does not return information about the field violating the constraint.
        return violations.stream().map(violation -> String.format("Constraint violation for property %s: %s", violation.getPropertyPath(), violation.getMessage())).collect(Collectors.toList());
    }
}
