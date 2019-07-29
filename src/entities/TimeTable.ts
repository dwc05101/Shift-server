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
import Organization from "./Organization"
import Week from "./Week"

@Entity()
class TimeTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  yearMonth: string

  @ManyToOne(type => Organization, organization => organization.timetables)
  organization: Organization

  @OneToMany(type => Week, week => week.timetable)
  weeks: Week[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default TimeTable
