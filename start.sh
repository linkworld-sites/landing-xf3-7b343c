#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
npm install
npm run build
exec npm start
