package com.behnke.booking.controller;

import com.behnke.booking.controller.dto.SystemMessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
@Slf4j
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<SystemMessageDto> notFoundError(Exception e) {
        log.error("Error: ", e);

        return new ResponseEntity<>(new SystemMessageDto(
                HttpStatus.NOT_FOUND,
                "not_found",
                e.getLocalizedMessage()
        ), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<SystemMessageDto> illegalArgument(Exception e) {
        log.error("Error: ", e);

        return new ResponseEntity<>(new SystemMessageDto(
                HttpStatus.BAD_REQUEST,
                "invalid_input",
                e.getLocalizedMessage()
        ), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<SystemMessageDto> generalError(Exception e) {
        log.error("General error: ", e);

        return new ResponseEntity<>(new SystemMessageDto(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "internal_error",
                e.getLocalizedMessage()
        ), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
