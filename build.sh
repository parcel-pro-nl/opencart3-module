#!/usr/bin/env bash
set -euo pipefail

zip 'parcelpro.ocmod.zip' 'install.xml'
rm -f 'ParcelPro.zip'
zip -r 'ParcelPro.zip' 'upload' 'CHANGELOG.md' 'README.md' 'parcelpro.ocmod.zip'
