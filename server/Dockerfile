FROM openjdk:12-alpine as build-stage

COPY . /server
WORKDIR /server
RUN ./gradlew build

FROM openjdk:12-alpine as production-stage

COPY --from=build-stage /server/build/libs/car-booking-app-*.jar /server.jar
EXPOSE 8080
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "/server.jar"]
