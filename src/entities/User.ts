import bcrypt from "bcrypt"
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import Invitation from "./Invitation"
import Organization from "./Organization"
import Slot from "./Slot"

const BCRYPT_ROUNDS = 10

@Entity()
class User extends BaseEntity {
  get fullName(): string {
    return `${this.lastName}${this.firstName}`
  }
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text", nullable: true })
  email: string | null

  @Column({ type: "text", nullable: true })
  password: string

  @Column({ type: "text" })
  firstName: string

  @Column({ type: "text" })
  lastName: string

  @Column({ type: "text", nullable: true })
  profilePhoto: string

  @Column({ type: "text" })
  phoneNumber: string

  @Column({ type: "text", nullable: true })
  fbId: string

  @OneToMany(type => Organization, organization => organization.admin)
  organizationsAsAdmin: Organization[]

  @ManyToMany(type => Organization, organization => organization.users)
  organizationsAsUser: Organization[]

  @OneToMany(type => Invitation, invitation => invitation.invitedUser)
  invitations: Invitation[]

  @OneToMany(types => Slot, slot => slot.user)
  slots: Slot[]

  @CreateDateColumn() createdAt: string

  @UpdateDateColumn() updatedAt: string

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password)
      this.password = hashedPassword
    }
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS)
  }
}

export default User
