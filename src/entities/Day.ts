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
import Week from "./Week"

@Entity()
class Day extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "int" })
  dayNumber: number

  @Column({ nullable: true })
  weekId: number

  @ManyToOne(type => Week, week => week.days)
  week: Week

  @OneToMany(type => Slot, slot => slot.day)
  slots: Slot[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Day
