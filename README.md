# IoT_perusteet

Exercises for the IoT Basics course

## Lesson 1
1. Led on with a button
2. Traffic lights
3. Interrupt/reaction game
4. Burglary alarm (PIR-sensor)
5. Simple Weather station

## Lesson 2
Testing how node server.js works

## Lesson 3
Express server with SQL database

## Lesson 4
Frontend
Webhooks, Websockets, Dashboard

## IOT PIPELINE

Raspberry Pi Pico W with DHT22 reads temperature and sends data to ThingSpeak. A web page fetches the data and shows it with Google Charts.

Components:

main.py – Pico W, Wi-Fi, DHT22, sends temperature to ThingSpeak.

ThingSpeak – stores data, provides API.

HTML + JS – fetches data and visualizes it in a line chart with tooltips.

Result:

Temperature data is logged in ThingSpeak and visualized in real time in the browser.
