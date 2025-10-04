import network
import urequests
import utime
import machine
import dht

ssid = "Wokwi-GUEST"
password = ""
THINGSPEAK_API_KEY = "RUTG8Q2RZPRYQ733"
THINGSPEAK_URL = "https://api.thingspeak.com/update"


wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)

print("Connecting to Wi-Fi", end="")
while not wlan.isconnected():
    print(".", end="")
    utime.sleep(0.5)

print("\nConnected!")
print("IP address:", wlan.ifconfig()[0])

sensor = dht.DHT22(machine.Pin(15))

def send_to_thingspeak(temp):
    try:
        response = urequests.post(
            THINGSPEAK_URL,
            data="api_key={}&field1={}".format(THINGSPEAK_API_KEY, temp),
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        print("ThingSpeak response:", response.text)
        response.close()
    except Exception as e:
        print("Failed to send data:", e)

while True:
    try:
        sensor.measure()
        temperature = sensor.temperature()
        print("Temperature: {:.1f} °C".format(temperature))
        send_to_thingspeak(temperature)
    except Exception as e:
        print("Error reading sensor or sending data:", e)

    utime.sleep(15)
