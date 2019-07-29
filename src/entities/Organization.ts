import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import TimeTable from "./TimeTable"
import User from "./User"

@Entity()
class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  name: string

  @OneToMany(type => User, user => user.organization)
  users: User[]

  @OneToMany(type => TimeTable, timetable => timetable.organization)
  timetables: TimeTable[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Organization
