#!/usr/bin/env bash
set -euo pipefail

for dir in ../opencart3-module/upload/*
do
  docker compose cp "$dir" 'opencart3:/opt/bitnami/opencart'
done
