<template>
	<div class="mx-10">
		<v-alert v-model="showSuccessAlert" type="success" text="Medicamento creado exitosamente!" closable/>
		<v-alert v-model="showErrorAlert" type="error" text="El medicamento no se pudo crear correctamente." closable/>
		<h1>Añadir Medicamento</h1>
		<v-form @submit.prevent="createMedicine">
			<v-text-field 
				v-model="medicine.name"
				label="Nombre del Medicamento"
				required 
				variant="outlined"
				append-inner-icon="mdi-medical-bag"
			/>
			<v-select
				v-model="medicine.type"
				:items="['Antiinflamatorio', 'Antipiretico', 'Analgesico']"
				label="Tipo"
				multiple
				variant="outlined"
				append-inner-icon="mdi-pill-multiple"
			/>
			<v-text-field
				v-model="medicine.dosage"
				label="Dosis"
				required
				variant="outlined"
				append-inner-icon="mdi-alpha-d-circle"
			/>
			<v-text-field
				v-model.number="medicine.price"
				label="Precio"
				type="number"
				required
				variant="outlined"
				append-inner-icon="mdi-currency-usd"
			/>
			<v-text-field
				v-model.number="medicine.cuantity"
				label="Cantidad"
				type="number"
				required
				variant="outlined"
				append-inner-icon="mdi-counter"
			/>
			<v-textarea
				v-model="medicine.description" 
				label="Descripción"
				auto-grow
				variant="outlined"
				append-inner-icon="mdi-text-box-edit"
			/>
			<v-btn type="submit" color="#10A8BF" style="width: 100%;">
				Añadir Medicamento
			</v-btn>
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
			price: null,
			cuantity: null,
			description: '',
		},
		showSuccessAlert: false,
		showErrorAlert: false,
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
			this.showSuccessAlert = true;
			this.medicine = {
				name: '',
				type: [],
				dosage: '',
				price: null,
				cuantity: null,
				description: '',
			};
			} catch (err) {
				console.error('Error creating medicine:', err);
				this.showErrorAlert = true;
			}
		}
	}
};
</script>