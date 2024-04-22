<template>
    <div>
        <v-button @click="turnOnLed">
            Turn on LED
        </v-button>
    </div>
</template>

<script>
import five from 'johnny-five';
import connectArduino from './arduino'; // Import the Arduino connection function

export default {
    methods: {
        async turnOnLed() {
            try {
                const board = connectArduino(five.Arduino, '/dev/ttyUSB0'); // Connect to Arduino
                board.on('ready', function() { // Handle 'ready' event before interacting with the board
                    const led = new five.Led(13); // Define LED on pin 13
                    led.strobe(2000); // Cada 2 segundos se prende y apaga
                });
            } catch (error) {
                console.error('Error connecting to Arduino:', error);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>