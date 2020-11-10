import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";

@Entity()
export default class Match {

	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	local: string;

	@Column()
	away: string;

	@Column()
	localScore: number;

	@Column()
	awayScore: number;

	@Column("date")
	date: Date;
}