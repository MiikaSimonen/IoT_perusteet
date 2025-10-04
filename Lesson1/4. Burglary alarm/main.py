import machine
import utime

pir = machine.Pin(28, machine.Pin.IN)

print("Burglary alarm ready. Waiting for motion...")

while True:
    if pir.value() == 1:
        print("Movement detected! Burglary alarm triggered!")
        utime.sleep(2)
    else:
        utime.sleep(0.1)
