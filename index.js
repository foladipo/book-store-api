const app = require("./src/app");
const dotenv = require("dotenv");

dotenv.config();

const DEFAULT_PORT = 3001;
const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Node API server is running on port ${PORT} now.`);
});
