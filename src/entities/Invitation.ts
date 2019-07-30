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
import User from "./User"

@Entity()
class Invitation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  invitingOrganizationId: number

  @ManyToOne(type => Organization, organization => organization.invitations, {
    onDelete: "CASCADE"
  })
  invitingOrganization: Organization

  @Column({ nullable: true })
  invitedUserId: number

  @ManyToOne(type => User, user => user.invitations, { onDelete: "CASCADE" })
  invitedUser: User

  @Column({ type: "boolean", default: false })
  accepted: boolean

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default Invitation
