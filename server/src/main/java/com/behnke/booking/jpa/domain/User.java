package com.behnke.booking.jpa.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import java.time.LocalDate;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class User extends AbstractPersistable {

    private String firstName;

    private String lastName;

    private String email;

    private LocalDate birthday;

}
