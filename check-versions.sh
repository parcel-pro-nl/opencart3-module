#!/usr/bin/env bash
set -euo pipefail

allMatch=1
function checkVersionMatch() {
    echo "- $1: $2"
    if [ ! "$installXmlVersion" = "$2" ]
    then
      allMatch=0
    fi
}

echo "Detected versions:"

installXmlVersion="$(sed -nE 's/^.*version.*\[(.*)\]\].*$/\1/p' 'install.xml')"
checkVersionMatch 'install.xml' "$installXmlVersion"

checkVersionMatch 'CHANGELOG.md' "$(sed -nE 's/^## V(.*)$/\1/p' 'CHANGELOG.md' | head -n 1)"
checkVersionMatch 'upload/admin/language/dutch/sale/pp_order.php' "$(sed -nE "s/^.version = '(.*)'.*/\1/p" 'upload/admin/language/dutch/sale/pp_order.php')"
checkVersionMatch 'upload/admin/language/en-gb/sale/pp_order.php' "$(sed -nE "s/^.version = '(.*)'.*/\1/p" 'upload/admin/language/en-gb/sale/pp_order.php')"
checkVersionMatch 'upload/admin/language/dutch/extension/shipping/parcel_pro.php' "$(sed -nE "s/^.version = '(.*)'.*/\1/p" 'upload/admin/language/dutch/extension/shipping/parcel_pro.php')"
checkVersionMatch 'upload/admin/language/en-gb/extension/shipping/parcel_pro.php' "$(sed -nE "s/^.version = '(.*)'.*/\1/p" 'upload/admin/language/en-gb/extension/shipping/parcel_pro.php')"

if [ ! "$allMatch" = 1 ]
then
  echo 'Not all versions match.'
  exit 1
else
  echo 'All version match!'
fi
