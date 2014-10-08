#!/bin/sh

file="$(dirname $0)/twistd.pid"

if [ -f "$file" ]; then
    pid=$(cat $file)
    kill $pid && echo "Killed process with PID $pid." || echo "Unable to kill process with PID $pid."
else
    echo "Twistd server is not running."
fi
