<template>
  <div class="container">
    <h1>Create Medicine</h1>
    <v-form @submit.prevent="createMedicine">
      <v-text-field v-model="medicine.name" label="Medicine Name" required></v-text-field>
      <v-select v-model="medicine.type" :items="['Antiinflamatorio', 'Antipiretico', 'Analgesico']" label="Type" multiple></v-select>
      <v-text-field v-model="medicine.dosage" label="Dosage" required></v-text-field>
      <v-text-field v-model.number="medicine.price" label="Price" type="number" required></v-text-field>
      <v-text-field v-model.number="medicine.cuantity" label="Cuantity" type="number" required></v-text-field>
      <v-textarea v-model="medicine.description" label="Description"></v-textarea>
      <v-btn type="submit" color="primary">Create Medicine</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      medicine: {
        name: '',
        type: [],
        dosage: '',
        price: 0,
        cuantity: 0,
        description: '',
      }
    };
  },
  methods: {
    async createMedicine() {
      try {
        const response = await fetch('http://localhost:3000/api/users/medicine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.medicine)
        });
        if (!response.ok) throw new Error('Failed to create medicine');
        console.log('Medicine created successfully!');
        // Clear the form or redirect to a success page
        this.medicine = {
          name: '',
          type: [],
          dosage: '',
          price: 0,
          cuantity: 0,
          description: '',
        };
      } catch (err) {
        console.error('Error creating medicine:', err);
        // Handle errors (e.g., display an error message)
      }
    }
  }
};
</script>