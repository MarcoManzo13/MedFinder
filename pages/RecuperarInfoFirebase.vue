<script setup>
import { useCollection } from 'vuefire'
import { collection } from 'firebase/database'

const todos = useCollection(collection(db, 'https://console.firebase.google.com/u/0/project/medfinder-f8ae3/database/medfinder-f8ae3-default-rtdb/data/~2F?hl=es-419'))

</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <span>{{ todo.text }}</span>
    </li>
  </ul>
</template>