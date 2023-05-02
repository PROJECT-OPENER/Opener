FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/shadowing-service-0.0.1-SNAPSHOT.jar ShadowingService.jar
ENTRYPOINT ["java", "-jar", "ShadowingService.jar"]