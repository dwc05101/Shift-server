import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import TimeTable from "./TimeTable"
import User from "./User"

@Entity()
class Slot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  startTime: string

  @Column({ type: "text" })
  endTime: string

  @Column({ type: "int" })
  day: number

  @Column({ nullable: true })
  userId: number

  @ManyToOne(type => User, user => user.slots, {
    onDelete: "CASCADE"
  })
  user: User

  @Column({ nullable: true })
  timetableId: number

  @ManyToOne(type => TimeTable, timetable => timetable.slots, {
    onDelete: "CASCADE"
  })
  timetable: TimeTable

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Slot
