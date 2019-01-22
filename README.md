# Visual Traceroute
This is a simple visual traceroute app written in javascript that runs in
the browser. The traceroute part written using nodejs runs as a local web
server that uses a web socket to stream locational info related to each hop
reached during the traceroute. To obtain locational info about each hop the
ip-api.com web service is queried using the hops IP address. This hop 
info is then sent to the browser where it is displayed on a table as well as
drawn on a map.
