import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express"
import getConfig from "./utils/config";
import * as swaggerDocument from "../public/swagger.json";
import { RegisterRoutes } from "./routes/routes";
import { errorHandler } from "./middlewares/error-handler";


export const app = express();
// Get the Configs!
const config = getConfig(process.env.NODE_ENV);
app.use(express.json());
// Use body-parser to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

RegisterRoutes(app);

//routes
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, Express with TypeScript!");
});


app.use(errorHandler)