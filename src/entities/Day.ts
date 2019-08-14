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
import Slot from "./Slot"
import TimeTable from "./TimeTable"

@Entity()
class Day extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  startTime: string

  @Column({ type: "text" })
  endTime: string

  @Column({ type: "int" })
  dayNumber: number

  @Column({ type: "boolean" })
  isEndTimeNextDay: boolean

  @OneToMany(type => Slot, slot => slot.day, {
    onDelete: "CASCADE"
  })
  slots: Slot[]

  @Column({ nullable: true })
  timetableId: number

  @ManyToOne(type => TimeTable, timetable => timetable.days, {
    onDelete: "CASCADE"
  })
  timetable: TimeTable

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Day
