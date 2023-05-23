FROM openjdk:17-ea-11-jdk-slim
VOLUME /tmp
COPY build/libs/member-service-0.0.1-SNAPSHOT.jar MemberService.jar
ENTRYPOINT ["java", "-jar", "MemberService.jar"]