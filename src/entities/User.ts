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
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  personalCode: string

  @Column({ type: "text" })
  name: string

  @Column({ type: "text" })
  phoneNumber: string

  @Column({ nullable: true })
  organizationId: number

  @ManyToOne(type => Organization, organization => organization.users, {
    onDelete: "CASCADE"
  })
  organization: Organization

  @OneToMany(types => Slot, slot => slot.user)
  slots: Slot[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string
}

export default User
