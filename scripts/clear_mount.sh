CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$( dirname "$CURRENT_DIR")"

rm -rf $ROOT_DIR/mysql/db
mkdir $ROOT_DIR/mysql/db

echo "Docker mount cleared"