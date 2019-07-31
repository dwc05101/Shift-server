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

  @Column({ type: "int" })
  dayNumber: number

  @Column({ nullable: true })
  timetableId: number

  @ManyToOne(type => TimeTable, timetable => timetable.days)
  timetable: TimeTable

  @OneToMany(type => Slot, slot => slot.day)
  slots: Slot[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Day
