package com.behnke.booking.jpa.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Car extends AbstractPersistable {

    @NotNull
    @Column(unique = true)
    private String licensePlate;

    @NotNull
    private String vin;

    @NotNull
    private String model;

    @NotNull
    private Boolean active;

    @NotNull
    private String color;

    @NotNull
    @Future
    private LocalDate validTill;
}
