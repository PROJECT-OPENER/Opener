FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/chatting-service-0.0.1-SNAPSHOT.jar ChattingService.jar
ENTRYPOINT ["java", "-jar", "ChattingService.jar"]