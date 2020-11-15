package com.behnke.booking.config;

import com.behnke.booking.controller.dto.SystemMessageDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final ObjectMapper objectMapper;

    @Bean
    public ErrorAttributes errorAttributes() {
        return new DefaultErrorAttributes() {

            @Override
            public Map<String, Object> getErrorAttributes(WebRequest request, boolean includeStackTrace) {
                Map<String, Object> errorAttributes = super.getErrorAttributes(request, includeStackTrace);
                SystemMessageDto systemMessageDto = SystemMessageDto.builder()
                        .error((String) errorAttributes.get("error"))
                        .message((String) errorAttributes.get("message"))
                        .build();
                //noinspection unchecked
                return objectMapper.convertValue(systemMessageDto, Map.class);
            }
        };
    }
}
