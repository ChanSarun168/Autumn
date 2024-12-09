import path from "path";
import { app } from "./app";
import getConfig from "./utils/config";
import connectToDatabase from "./utils/dbconnection";
import fs from "fs";

const port = getConfig().port;

// READ FILE JWT PUBLIC KEY FIRST!
export const privateKey = fs.readFileSync(
    path.join(__dirname, "../private_key.pem"),
    "utf-8"
  );

connectToDatabase().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})