#!/usr/bin/env bash
# Sets a start time env var for uptime reporting and runs Next.js dev
export __START_TIME="$(date +%s%3N)"
npm run dev
