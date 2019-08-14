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

<<<<<<< HEAD
  @Column({ type: "boolean" })
  isFulltime: boolean

=======
>>>>>>> parent of 4b6aa35... :sparkles: Edited data schema
  @Column({ type: "text" })
  startTime: string

  @Column({ type: "text" })
  endTime: string

  @Column({ nullable: true })
  userId: number

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
