import express from "express";
import helmet from "helmet";
import {createConnection} from "typeorm";
import bodyParser from "body-parser";
import dotEnv from "dotenv";

dotEnv.config();

createConnection().then(connection => {
	if (connection) {
		console.log('Database connection successful');
	}
	const app = express();
	const PORT = process.env.PORT || 3000;

	app.use(helmet());
	app.use(bodyParser.json());

	app.listen(PORT, () => {
		console.log(`Server listening on PORT: ${PORT}`);
	});
}).catch(error => {console.log(error)});