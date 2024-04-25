<template>
    <div>
        <label for="led-value">LED Status:</label>
    <input type="number" id="led-value" v-model.number="ledValue" placeholder="Enter LED Value" />
    <v-btn @click="changeLEDValue">Save</v-btn>
    </div>
</template>

<script> 
import { getDatabase, ref, set } from "firebase/database";

export default {
    data() {
        return {
            ledValue: null
        };
    },
    methods: {
        changeLEDValue() {
            // Check if ledValue is not null and is a number
            if (this.ledValue !== null && !isNaN(this.ledValue)) {
                const db = getDatabase(this.$firebaseApp);
                const ledRef = ref(db, 'led/');
                set(ledRef, parseInt(this.ledValue)); // Parse ledValue to integer
                this.ledValue = null; // Reset to null after sending
            } else {
                // Handle error, invalid input
                console.error("Invalid LED value. Please enter a valid number.");
            }
        }
    }
};
</script>

<style lang="scss" scoped>

</style>