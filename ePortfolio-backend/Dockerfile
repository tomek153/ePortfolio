FROM openjdk:11

COPY ./target/eportfolio-0.0.1-SNAPSHOT.jar /project/eportfolio-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom", "-Dblabla", "-jar","/project/eportfolio-0.0.1-SNAPSHOT.jar"]
