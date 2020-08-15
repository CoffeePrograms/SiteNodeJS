module.exports =
    class Sql {
        constructor(str) {
            this.query = str;
        }
        setQuery(str) {
            this.query = str;
        }
        getQuery() {
            return this.query;
        }
    }