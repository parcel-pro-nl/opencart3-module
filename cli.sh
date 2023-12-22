#!/usr/bin/env bash
set -euo pipefail

docker compose exec -it -w '/opt/bitnami/opencart' opencart3 bash
