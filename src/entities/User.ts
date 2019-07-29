import bcrypt from "bcrypt"
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import Organization from "./Organization"
import Slot from "./Slot"

const BCRYPT_ROUNDS = 10

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "boolean" })
  isAdmin: boolean

  @Column({ type: "int", unique: true })
  personalCode: number

  @Column({ type: "text" })
  password: string

  @Column({ type: "text" })
  firstName: string

  @Column({ type: "text" })
  lastName: string

  @Column({ type: "text" })
  phoneNumber: string

  @ManyToOne(type => Organization, organization => organization.users)
  organization: Organization

  @ManyToMany(types => Slot, slot => slot.users)
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

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS)
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}

export default User
