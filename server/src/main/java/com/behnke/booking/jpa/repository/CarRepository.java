package com.behnke.booking.jpa.repository;

import com.behnke.booking.jpa.domain.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * For Spring Data JPA query methods see:
 * http://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods
 */
public interface CarRepository extends JpaRepository<Car, Long> {

    Optional<Car> findByLicensePlate(String licensePlate);

}
