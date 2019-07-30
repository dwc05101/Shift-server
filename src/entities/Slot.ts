import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column({ type: "text" })
  startTime: string

  @Column({ type: "text" })
  endTime: string

  @Column({ type: "int" })
  needs: number

  @ManyToMany(type => User, user => user.slots)
  @JoinTable()
  users: User[]

  @Column({ nullable: true })
  dayId: number

  @ManyToOne(type => Day, day => day.slots)
  day: Day

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Slot
