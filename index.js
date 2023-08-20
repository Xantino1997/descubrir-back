const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(express.json());

// Configuración de middleware
app.use(
  cors({
    origin: "https://descubrir-digital.vercel.app", // Cambia esto según la dirección de tu cliente React
    credentials: true,
  })
);

require("dotenv").config();

const API_KEY = "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"; // Reemplaza con tu clave de API

app.post("/generate-completion", async (req, res) => {
  const { prompt } = req.body;
  
  try {
    // Inicia la conversación con el saludo y presentación
    const greeting = "Hola soy Gabot - Asistente de Tecnología de Sistemas:";
    const conversation = [greeting, prompt];
    
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: conversation.join('\n'), // Unir los mensajes con saltos de línea
        max_tokens: 250,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const completionText = response.data.choices[0].text;
    console.log("Respuesta de OpenAI:", completionText);
    res.json({ completion: completionText });
  } catch (error) {
    console.error("Error al obtener la respuesta del bot:", error);
    res.status(500).json({ error: "Error generating completion" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});
