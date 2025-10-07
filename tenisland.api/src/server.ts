// src/server.ts
import app from "./app";


const PORT = Number(process.env.PORT) || 3001;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`⚡ Backend: http://${HOST}:${PORT}`);
});

