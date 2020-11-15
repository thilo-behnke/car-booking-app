package com.behnke.booking.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Home redirection to swagger api documentation
 */
@Slf4j
@Controller
public class HomeController {

    @GetMapping(value = "/")
    public String index() {
        log.debug("redirect root to swagger-ui.html");
        return "redirect:swagger-ui.html";
    }
}
