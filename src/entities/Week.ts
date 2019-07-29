import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import Day from "./Day"
import TimeTable from "./TimeTable"

@Entity()
class Week extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "int" })
  weekNumber: number

  @ManyToOne(type => TimeTable, timetable => timetable.weeks)
  timetable: TimeTable

  @OneToMany(type => Day, day => day.week)
  days: Day[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Week
