# coc-truck.engine-mon

Simple simulated telemetry data for truck engine for IEAM demo.

This service simulates a sensor reading in a truck.  All data is randomly generated.

Only the log is updated with the information.


```shell

docker login 

docker build -t ibmicpcoc/coc-truck.engine-mon_amd64:1.0.0 .

hzn exchange service publish -O -f svc_def.json

hzn exchange service addpolicy --json-file=svc_policy.json $HZN_ORG_ID/coc-truck.engine-mon_1.0.0_amd64

# -----

hzn exchange business addpolicy --json-file=bus_policy.json coc-truck.engine-mon_1.0.0

# -----

hzn service log coc-truck.engine.mon 

```
