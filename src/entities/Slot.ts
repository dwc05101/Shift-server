import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import Day from "./Day"
import User from "./User"

@Entity()
class Slot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "boolean", default: false })
  isSelected: boolean

  @Column({ type: "boolean" })
  isFulltime: boolean

  @Column({ type: "text" })
  startTime: string

  @Column({ type: "text" })
  endTime: string

  @Column({ nullable: true })
  userId: number

  @Column({ type: "boolean", default: false })
  isEndTimeNextDay: boolean

  @Column({ type: "boolean", default: false })
  isStartTimeNextDay: boolean

  @ManyToOne(type => User, user => user.slots, {
    onDelete: "CASCADE"
  })
  user: User

  @Column({ nullable: true })
  dayId: number

  @ManyToOne(type => Day, day => day.slots, {
    onDelete: "CASCADE"
  })
  day: Day

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Slot
