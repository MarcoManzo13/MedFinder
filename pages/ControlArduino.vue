<template>
  <div>
    <p>Value: {{ isActive ? "On (1)" : "Off (0)" }}</p>
    <v-btn @click="toggleActive">Toggle</v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(0)

const toggleActive = () => {
  isActive.value = Number(!isActive.value) // Toggles between 0 and 1
}
</script>