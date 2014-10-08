#!/bin/sh

twistd web --port=1337 --path=http && echo "Started Twistd server." || echo "Unable to start Twistd server."
