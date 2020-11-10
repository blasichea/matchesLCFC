import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";
import Match from "./match";

@Entity()
export default class Club {

	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	name: string;

	@Column()
	goalsFor: number;

	@Column()
	goalsAgainst: number;

	@Column(type => Match)
	matches: Match[];
}