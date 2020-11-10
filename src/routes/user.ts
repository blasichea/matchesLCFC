import express, { Router } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {getMongoManager, MongoEntityManager} from "typeorm";
import User from "../entity/user";

let router:Router = express.Router();

router.post('/login', async (req, res):Promise<string> => {
	const {user, password} = req.body;
	if(!user || !password) {
		res.status(400);
		res.json({mensaje: "Insert User and Password"});
		return;
	}
	const mongoManager:MongoEntityManager = getMongoManager();
	const dbUser:User = await mongoManager.findOne(User, {userName: user});
	if(!dbUser) {
		res.status(400);
		res.json({mensaje: "User Not Found"});
		return;
	}
	const validPassword:boolean = await bcrypt.compare(dbUser.password, password);
	if (!validPassword) {
		res.status(400);
		res.json({mensaje: "Incorrect Password"});
		return;
	}
	const token:string = jwt.sign(
		{user: user.userName, id: user.id},
		process.env.JWT_KEY || "jwtsecretkey",
		{expiresIn: '12h'}
	);
	if(!token) {
		res.status(500);
		res.json({mensaje: "Autentication method failed... Try again"});
		return;
	}
	return token;
});

router.post('signup', async (req, res) => {
	const {user, password} = req.body;
	if(!user || !password) {
		res.status(400);
		res.json({mensaje: "Require User and Password"});
		return;
	}
	const mongoManager:MongoEntityManager = getMongoManager();
	const dbUser:User = await mongoManager.findOne(User, {userName: user});
	if(dbUser) {
		res.status(400);
		res.json({mensaje: "User is already exist"});
		return;
	}
	const hashedPassword:string = await bcrypt.hash(password, 12);
	const newUser:User = new User();
	newUser.userName = user;
	newUser.password = hashedPassword;
	await mongoManager.save(newUser);
});