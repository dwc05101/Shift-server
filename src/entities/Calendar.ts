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
import Event from "./Event"
import Organization from "./Organization"

@Entity()
class Calendar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  month: string

  @Column({ nullable: true })
  organizationId: number

  @ManyToOne(type => Organization, organization => organization.calendars, {
    onDelete: "CASCADE"
  })
  organization: Organization

  @OneToMany(type => Event, event => event.calendar)
  events: Event[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Calendar
