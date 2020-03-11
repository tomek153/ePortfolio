set -x

./sql-exec.sh sql/create_database.sql &&\
./sql-exec.sh sql/create_user.sql &&\
./sql-exec.sh sql/create_tables.sql
