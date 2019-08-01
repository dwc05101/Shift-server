import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import Organization from "./Organization"
import TimeTable from "./TimeTable"

@Entity()
class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  url: string

  @Column({ nullable: true })
  organizationId: number

  @ManyToOne(type => Organization, organization => organization.links, {
    onDelete: "CASCADE"
  })
  organization: Organization

  @Column({ nullable: true })
  timetableId: number

  @ManyToOne(type => TimeTable, timetable => timetable.links, {
    onDelete: "CASCADE"
  })
  timetable: TimeTable

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Link
