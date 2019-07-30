import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import Invitation from "./Invitation"
import TimeTable from "./TimeTable"
import User from "./User"

@Entity()
class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  name: string

  @Column({ nullable: true })
  adminId: number

  @ManyToOne(type => User, user => user.organizationsAsAdmin)
  admin: User

  @ManyToMany(type => User, user => user.organizationsAsUser)
  @JoinTable()
  users: User[]

  @OneToMany(type => TimeTable, timetable => timetable.organization)
  timetables: TimeTable[]

  @OneToMany(type => Invitation, invitation => invitation.invitingOrganization)
  invitations: Invitation[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Organization
