# ePortfolio  
Praca inżynierska.  

## Uwagi po MERGE z dnia 28.01.2021
Zmerge-owano nowy frontend (by tomek) + fragment API (by michal) 

Pamiętaj!!! aby przed pierwszym uruchomieniem:
- ustawić passy do swojej (najlepiej pustej) lokalnej bazy danych w pliku 'application.yml' (backend) 
- w katalogu resources/db.migration/ w pliku V1-Tables.sql (backend) zmienić ścieżki do plików CSV, aby odpowiadały twoim folderom (jak ktoś znajdzie rozwiązanie aby dało się podawać je jako relatywne - to hotfix byłby super)

Lista metod API dostępnych obecnie w aplikacji znajduje się w pliku api-methods.odt

## Kolorystyka
W projekcie korzystamy z 3 podstawowych kolorów (z logo):
- niebieski: `#31b4cb`
- żółty: `#ede576`
- czerwony: `#eb4a4a`

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
Aplikacja dziala na porcie `5432`  

### Wymagania  
- Docker:  
Instalacja: [Link](https://docs.docker.com/install/)  
- Docker Compose:  
Instalacja: [Link](https://docs.docker.com/compose/install/)  

### Tworzenie i uruchomianie bazy
Aby utworzyć bazę:
- Przejdź do katalogu bazy danych `cd ePortfolio-database`,  
- Nadaj uprawnienia dla skryptów `chmod +x create-db.sh docker-compose.sh postgres-up.sh sql-exec.sh clear-db.sh`,  
- Utwórz kontener Postgres `./postgres-up.sh`,  
- Utwórz baze wraz z tabelami `./create-db.sh`.  

Kiedy baza raz została utworzona, aby ją uruchomić wystarczy wywołać skrypt `./postgres-up.sh` lub `docker container start eportfolio_postgres_1`.  

Aby wyczyścić zawartość bazy danych wykonaj `./clear-db.sh`.  
