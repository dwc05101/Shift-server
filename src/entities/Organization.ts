import bcrypt from "bcrypt"
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import Link from "./Link"
import TimeTable from "./TimeTable"
import User from "./User"

const BCRYPT_ROUNDS = 10

@Entity()
class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  name: string

  @Column({ type: "text" })
  loginId: string

  @Column({ type: "text" })
  password: string

  @Column({ type: "text" })
  profilePhoto: string

  @OneToMany(type => User, user => user.organization)
  users: User[]

  @OneToMany(type => TimeTable, timetable => timetable.organization)
  timetables: TimeTable[]

  @OneToMany(type => Link, link => link.organization)
  links: Link[]

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

export default Organization
