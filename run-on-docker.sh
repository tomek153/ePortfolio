# Budowanie pliku jar modułu logicznego
cd ePortfolio-database
./postgres-up.sh
cd ../

sleep 5

mvn clean install -f ePortfolio-backend/pom.xml

docker-compose --project-name eportfolio up -d
