# URL Shortener - [abbrev.io](http://www.abbrev.io)
A Node, Express, and MongoDB URL Shortener which uses [Hashids](http://hashids.org/) to generate unique URLs

To run locally:
```
gulp clean
Set Linux environment variable MONGOLAB_URI to the MongoDB URI
gulp or ('gulp build')
```

To run in production:
```
gulp clean
Set Linux environment variable MONGOLAB_URI to the MongoDB URI
Set Linux environment variable NODE_ENV to "production"
gulp (or 'gulp dist')
```
