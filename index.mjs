import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Bytez from "bytez.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const sdk = new Bytez(process.env.BYTEZ_KEY);

app.post("/generate-image", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "prompt is required" });
    }

    const model = sdk.model("dreamlike-art/dreamlike-photoreal-2.0");
    const { error, output } = await model.run(prompt);

    if (error) {
      return res.status(500).json(error);
    }

    res.json(output);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Bytez wrapper running on port ${process.env.PORT}`);
});
