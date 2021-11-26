FROM openjdk:12-jdk-alpine
COPY . /app

#FROM gradle:4.7.0-jdk8-alpine AS build
#COPY --chown=gradle:gradle . /home/gradle
#WORKDIR /home/gradle
#RUN gradle build --no-daemon
#
#FROM openjdk:8-jre-slim
#
#EXPOSE 8080

#RUN mkdir /app
#
#COPY --from=build ./gradle/wrapper/gradle-wrapper.jar /app/application.jar
#
#ENTRYPOINT ["java", "-jar","/app/application.jar"]
