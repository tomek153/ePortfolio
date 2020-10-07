set -x

./sql-exec.sh sql/drop_database.sql && \
./sql-exec.sh sql/drop_role.sql
