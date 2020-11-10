import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";

@Entity()
export default class User {

	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	userName: string;

	@Column()
	password: string;
}