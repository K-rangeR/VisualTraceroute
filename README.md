# Visual Traceroute
This is a simple visual traceroute app written in javascript that runs in
the browser. The traceroute part written using nodejs runs as a local web
server that uses a web socket to stream locational info related to each hop
reached during the traceroute. To obtain locational info about each hop the
ip-api.com web service is queried using the hops IP address. This hop 
info is then sent to the browser where it is displayed on a table as well as
drawn on a map.

## Dependencies
* ws - npm package for using web sockets in nodejs
* nodejs-traceroute - npm traceroute implementation package
* Leaflet - javascript map API
* jQuery 
* Bootstrap

<img width="1353" alt="screen shot 2019-01-22 at 10 03 57 am" src="https://user-images.githubusercontent.com/43307752/51548145-5d593600-1e2d-11e9-8f64-d77255b59337.png">
