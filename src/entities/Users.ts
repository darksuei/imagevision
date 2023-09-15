import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class Users {
  @ObjectIdColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  responses!: object;

  @Column()
  API_KEY!: string;
}
