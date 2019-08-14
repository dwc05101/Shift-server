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
import Link from "./Link"
import Organization from "./Organization"

@Entity()
class TimeTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "boolean", default: false })
  isConfirmed: boolean

  @Column({ type: "text" })
  yearMonthWeek: string

  @Column({ type: "text" })
  startTime: string

  @Column({ type: "text" })
  endTime: string

  @Column({ nullable: true })
  organizationId: number

  @ManyToOne(type => Organization, organization => organization.timetables, {
    onDelete: "CASCADE"
  })
  organization: Organization

  @OneToMany(type => Day, day => day.timetable)
  days: Day[]

  @OneToMany(type => Link, link => link.timetable)
  links: Link[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default TimeTable
