#!/bin/bash
clear

if [[ -z "${ROOT_PASSWORD}" ]]; then
    echo "ROOT_PASSWORD undefined, please source environment variables"
    exit 1
fi

VOLUME_DIR=/usr/local/docker_mounts/restfulrant
if ! [ -z "$1" ]; then
    VOLUME_DIR=$1
fi

DB_NAME=$DEV_DB
if ! [ -z "$2" ]; then
    DB_NAME=$2
fi

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( dirname "$CURRENT_DIR")"

echo "importing schema from : $ROOT_DIR"

# copy schema.sql to mysql/init/db

cp $ROOT_DIR/schema.sql $ROOT_DIR/mysql/init/dev.sql
cp $ROOT_DIR/schema.sql $ROOT_DIR/mysql/init/test.sql

echo 'use dev;' | cat - $ROOT_DIR/mysql/init/dev.sql > temp && mv temp $ROOT_DIR/mysql/init/dev.sql
echo 'use test;' | cat - $ROOT_DIR/mysql/init/test.sql > temp && mv temp $ROOT_DIR/mysql/init/test.sql

echo "copied schema.sql to {dev,test}.sql"

CONTAINER_ID=restfulrant-mysql

docker run --rm -d \
--name $CONTAINER_ID \
-e MYSQL_ROOT_PASSWORD=$ROOT_PASSWORD \
-e MYSQL_DATABASE=$DEV_DB \
-v $ROOT_DIR/mysql/init:/docker-entrypoint-initdb.d/ \
-p 3306:3306 \
mysql:5.7 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

if [ `docker inspect -f {{.State.Running}} $CONTAINER_ID` ]; then
    echo "Mysql started. access via root:root@0.0.0.0:3306/$CONTAINER_ID"
    echo "Stop the DB with:"
    echo "docker stop $CONTAINER_ID"
else
    echo "could not start container"
fi

# clean up files