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
import Organization from "./Organization"

@Entity()
class TimeTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  yearMonthWeek: string

  @Column({ nullable: true })
  organizationId: number

  @ManyToOne(type => Organization, organization => organization.timetables)
  organization: Organization

  @OneToMany(type => Day, day => day.timetable)
  days: Day[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default TimeTable
