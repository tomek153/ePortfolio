if [ ! -f "$1" ]; then
	echo "ERR: Specify an SQL file as an argument!"
	exit 1
fi
QUERY=$(cat $1)

if [ "$1" = "sql/drop_database.sql" ] || [ "$1" = "sql/create_database.sql" ] || [ "$1" = "sql/create_user.sql" ] || [ "$1" = "sql/drop_role.sql" ]
then
	set -e
	set -x
	docker exec -ti eportfolio_postgres_1 psql -U postgres -c "$QUERY"
else
	set -e
	set -x
	docker exec -ti eportfolio_postgres_1 psql -U eportfolio_user -w -d eportfolio_db -c "$QUERY"
fi
