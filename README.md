# URL Shortener - [abbrev.io](http://www.abbrev.io)
A Node, Express, and MongoDB URL Shortener which uses [Hashids](http://hashids.org/) to generate unique URLs

To run locally:
```
Run Mongo Database, then run commands:
use url_shortener
db.counters.insert({ _id: 'url_count', seq: 1 })

Set config.db.host and config.db.name in config.js to match local environment

npm local
```

To run in production:
```
Setup MongoDB and get MongoDB URI
Set Node environment variable MONGOLAB_URI to the MongoDB URI
npm start
```
