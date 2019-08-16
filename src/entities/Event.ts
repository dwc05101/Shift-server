import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import Calendar from "./Calendar"

@Entity()
class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  name: string

  @Column({ type: "int" })
  dayNumber: number

  @Column({ nullable: true })
  calendarId: number

  @ManyToOne(type => Calendar, calendar => calendar.events, {
    onDelete: "CASCADE"
  })
  calendar: Calendar

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Event
