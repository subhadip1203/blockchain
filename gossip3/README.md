# BLOCK schema

each data received or transfered will be called : block

block have a schema of :
{
  "dataId": "abcd123", 
  "notifiedPeers" : ["xyx"] , 
  "failedPeers" : ["mnq"] , 
  "data": "somedata"
}

dataId :  a unique id for each block 
notifiedPeer : the servers , who received and acknowledged the block
failedPeer : those servers , who did not response
data : this can be simple string or JSON string(object , array , etc )