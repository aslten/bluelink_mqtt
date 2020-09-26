MY_ITER=0
SLOW_UPDATE=./config/slow.txt
FAST_UPDATE=./config/fast.txt

while true
do
  MY_ITER=$(($MY_ITER+1))
  if [ $MY_ITER = 5 ]
  then
    if test -f "$SLOW_UPDATE"; then
      node index.js
      MY_ITER=0
    else
      if test -f "$FAST_UPDATE"; then
       node index.js
      fi
      MY_ITER=4
    fi
  else 
    if test -f "$FAST_UPDATE"; then
      node index.js
    fi
  fi
  sleep 30
done
