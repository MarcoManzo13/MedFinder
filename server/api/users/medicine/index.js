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
          console.log('Received form data:', body);

          // Guarda la instancia del modelo y espera a que se complete
          await new model(body).save();
          return { message: 'Medicine created' };
      } catch (err) {
          // Especificar un código de estado también aquí
          throw createError({ statusCode: 500, message: err.message });
      }
  } else {
      // Manejar otros métodos no soportados
      throw createError({ statusCode: 405, message: 'Method Not Allowed' });
  }
});
