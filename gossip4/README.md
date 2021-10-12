### const
no_of_broadcast : 3


### source:
1.  got data: in json form =>  data : {......} 
2. transfer the data to create_broadcast function :
  


### create_broadcast function :

1. arguments : data 
2.  transform into new object : 
  dataid = xxxxxxxxxx,
  
  information : {
    notified_peer : [host_self],
    failed_peer : []
    data: data
  }

3. save new entry in redis :
  xxxxxxxxxx : JSON_string ({...information , broadcast_no: 1 })

4. get other peer data from redis .
  send then json :
  {
    dataid: xxxxxxxxxx
    notified_peer : [host_self],
    failed_peer : []
    data: data
  }


### received data via api:
1. arguments : dataid , notified_peer , failed_peer
2. add all peers in the existing list : [...existing_peers , ...notified_peer , ...failed_peer ]
3. check if dataid available in the redis
    if not exists :
      create obj : {
        notified_peer : [old_hosts , host_self],
        failed_peer : [...]
        data: data
      }
      save new entry in redis : xxxxxxxxxx : JSON_string
    
    if exists :
      1. if broadcast_no >= 3 :
        do nothing
      else:
        1. getdata from redis
        2. modified notified_peers and failed_peers
    
4. get any 2 other peers , who are not under : notified_peer or failed_peer
5. send data to other peers :
  {
    dataid: xxxxxxxxxx
    notified_peer : [host_self],
    failed_peer : []
    data: data
  }