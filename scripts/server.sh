#!/bin/bash

if [ -z "$1" ];
then
    node index.js; # IF THE INPUT IS NULL
else
    node $1.js; # IF THE INPUT IS NOT NULL
fi