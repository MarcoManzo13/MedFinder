<template>
    <div>
        <label for="led-value">LED Status:</label>
    <input type="text" id="led-value" v-model="ledValue" placeholder="Eneter LED Value" />
    <v-btn @click="changeLEDValue">Save</v-btn>
    </div>
</template>

<script> 
import { getDatabase, ref, set } from "firebase/database";

export default {
    data() {
        return {
            ledValue: ""
        };
    },
    methods: {
        changeLEDValue() {
            const db = getDatabase(this.$firebaseApp);
            const ledRef = ref(db, 'led/');
            set(ledRef, this.ledValue);
            this.ledValue = ""; 
        }
    }
};
</script>

<style lang="scss" scoped>

</style>