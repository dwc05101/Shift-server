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
import Slot from "./Slot"

@Entity()
class TimeTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "boolean", default: false })
  isConfirmed: boolean

  @Column({ type: "text" })
  yearMonthWeek: string

  @Column({ nullable: true })
  organizationId: number

  @ManyToOne(type => Organization, organization => organization.timetables, {
    onDelete: "CASCADE"
  })
  organization: Organization

  @OneToMany(type => Slot, slot => slot.timetable)
  slots: Slot[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default TimeTable
