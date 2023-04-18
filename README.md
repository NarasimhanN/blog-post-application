# blog-post-application
Microservices | Kubernates | NodsJS | Express | React


Description :

Contains 5 Micro Services

1. Posts
2. Comments
3. Query
4. Moderation
5. Event Bus

Post Service is to create a new Post,
Comment Service is to creata a new Comment.
Once a new comment is Created, its status is pending and is displayed in 'orange' color. The comment is sent to Moderation service where its parsed to flag illegal words. In our example keyword: 'orange'.
The Moderation service then changes the status to 'Approved' ( displayed in Green) or 'Rejected' (displayed in red)
Result is then sent to Query Service.
Displaying the blogs is by quering the Query Service.

The above is a simple flow of the application,The flow is asynchronous by using an event-bus. All communication is sent to the event bus and the event bus broadcasts all the event it recieved and the respective Serice parses and works on it.
Ex : When Comment Service creates a new comment, it sends it to the event bus. The event bus broadcasts it - This is recieved by
a) Query Service : To render to user when requested ( Dispalys the comments as 'Comment awaiting moderation' as the status is 'pending')
b) Moderation Service : To parse the comment to find illegal keyword.
The output of Moderation service is then send to Event-bus and the event bus broadcasts it. This is recieved by the Query Service which updates the status and renders respectively.

Note : If the Query Service is dowm, still Posts / Comments can be created, but wont be displyed. Once its online, it fetches all the events it missed from event-bus.


--------------------
To run on Ubuntu :

>>minikube start

>>cd /infra/k8s

>>kubectl apply -f .

Everytime new minikube cluster is formed - To use Ingress
>>minikube addons enable ingress

---------------------
Pre req :

For Ingress to work:
    >> minikube ip
    Use the IP address generated here and add it to /etc/hosts with the domain address
    Example:
    192.168.0.1 blog-post-app.com
