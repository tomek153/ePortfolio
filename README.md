# ePortfolio  
Praca inżynierska.  

## Narzędzia  
- Docker
- Intellij Idea
- Visual Studio
- Data Grip
- Postman

## Backend  
Aplikacja działa na `localhost:8080`  

### Wymagania  
- Java 11  
- Apache Maven  

### Budowanie i start aplikacji:  
Budowanie: `mvn clean install`  
Start: `cd target && java -jar eportfolio-0.0.1-SNAPSHOT.jar`  

## Frontend  
Aplikacja działa na `localhost:3000`

### Wymagania  
- Node.js  

### Pobranie zależności i start aplikacji  
Pobranie zależności: `npm install`  
Start: `npm start`  

## Baza danych  
Aplikazja dziala na porcie `5432`  

### Wymagania  
- Docker:  
Instalacja: [Link](https://docs.docker.com/install/)  
- Docker Compose:  
Instalacja: [Link](https://docs.docker.com/compose/install/)  

### Tworzenie i uruchomianie bazy
Aby utworzyć baze:
- Przejdź do katalogu bazy danych `cd ePortfolio-database`,  
- Nadaj uprawnienia dla skryptów `chmod +x create-db.sh docker-compose.sh postgres-up.sh sql-exec.sh clear-db.sh`,  
- Utwórz kontener Postgres `postgres-up.sh`,  
- Utwórz baze wraz z tabelami `create-db.sh`.  

Kiedy baza raz została utworzona wystarczy aby ja uruchomić wystarczy wywołać skrypt `postgres-up.sh`.  

Aby wyczyścić zawartość bazy danych wykonaj `./clear-db.sh`.  
