import app from "./src/app";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_PORT = 3001;
const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Node API server is running on port ${PORT} now.`);
});
