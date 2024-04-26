import model from "~~/server/models/medicine"

export default defineEventHandler(async (event) => {
  // Accediendo al método directamente desde event.req.method en lugar de event.node.req.method
  const { method } = event.req;

  if (method === 'GET') {
      try {
          const medicines = await model.find(); // Suponiendo que 'model' es un modelo de Mongoose
          return medicines;
      } catch (err) {
          // Es mejor especificar un código de estado para el error
          throw createError({ statusCode: 500, message: err.message });
      }
  } else if (method === 'POST') {
    try {
      const body = await readBody(event);
      const newMedicine = new model(body);
      await newMedicine.save(); // Save the new medicine instance
      return { message: 'Medicine created successfully' };
    } catch (err) {
      console.error('Error creating medicine:', err);
      throw createError({ statusCode: 500, message: 'Failed to create medicine' });
    }
  } else {
      // Manejar otros métodos no soportados
      throw createError({ statusCode: 405, message: 'Method Not Allowed' });
  }
});
