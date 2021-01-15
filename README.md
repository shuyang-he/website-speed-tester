# website-speed-tester
Website speed tester are two independently running programs: the client program and the server program. 
**Server** will listen on a port and **Client** will communicate with Server via that port. 
Server will perform HTTP GET request on a bunch of URLs submitted by the client 'X' times and calculates the average, min and max time taken to fetch the URLs. Server can perform these operations in the background and return a handle to the client. 
The client can poll for status using handle. Server can accept multiple requests from multiple clients and run them all in parallel.
