import bcrypt from "bcrypt-nodejs"
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

@Entity()
class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "text" })
  name: string

  @Column({ type: "text" })
  email: string

  @Column({ type: "text" })
  loginId: string

  @Column({ type: "text" })
  password: string

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

  public comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password)
  }
}

export default Organization
