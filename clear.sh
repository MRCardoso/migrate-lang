#!/bin/bash

sudo rm -rf .next node_modules package-lock.json
sudo npm cache clean --force
sudo npm install