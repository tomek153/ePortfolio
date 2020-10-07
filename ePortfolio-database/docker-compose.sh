BASEDIR=`realpath \`dirname $0\``
source $BASEDIR/settings.sh

set -e

for CFG in `find docker-compose/ -iname *.yml`
do
	CONFIG_FILES_STRING="$CONFIG_FILES_STRING -f $CFG"
done

# Show executed command
set -x
docker-compose --project-name eportfolio $CONFIG_FILES_STRING $@
