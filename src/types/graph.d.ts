export const typeDefs = ["type CreateDayResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateDay(dayNumber: Int!, timetableId: Int!): CreateDayResponse!\n  CreateOrganization(name: String!, loginId: String!, password: String!): CreateOrganizationResponse!\n  OrganizationSignIn(loginId: String!, password: String!): OrganizationSignInResponse!\n  CreateSlot(startTime: String!, endTime: String!, dayId: Int!, personalCode: String!, organizationId: Int!): CreateSlotResponse!\n  CreateTimeTable(yearMonthWeek: String!): CreateTimeTableResponse!\n  CreateUserToOrganization(personalCode: String!, name: String!, phoneNumber: String!): CreateUserToOrganizationResponse!\n  RemoveUserFromOrganization(userId: Int!): RemoveUserFromOrganizationResponse!\n}\n\ntype GetDaysResponse {\n  ok: Boolean!\n  error: String\n  days: [Day]\n}\n\ntype Query {\n  GetDays(timetableId: Int!): GetDaysResponse!\n  GetOrganizationProfile(orgId: Int!): GetOrganizationProfileResponse!\n  GetSlots(dayId: Int!): GetSlotsResponse!\n  GetTimeTables: GetTimeTablesResponse!\n  GetUsers: GetUsersResponse!\n}\n\ntype Day {\n  id: Int!\n  dayNumber: Int!\n  timetableId: Int\n  timetable: TimeTable!\n  slots: [Slot]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateOrganizationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetOrganizationProfileResponse {\n  ok: Boolean!\n  error: String\n  organization: Organization\n}\n\ntype OrganizationSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Organization {\n  id: Int!\n  name: String!\n  loginId: String!\n  password: String!\n  users: [User]\n  timetables: [TimeTable]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateSlotResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetSlotsResponse {\n  ok: Boolean!\n  error: String\n  slots: [Slot]\n}\n\ntype Slot {\n  id: Int!\n  startTime: String!\n  endTime: String!\n  userId: Int\n  user: User!\n  dayId: Int\n  day: Day!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateTimeTableResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetTimeTablesResponse {\n  ok: Boolean!\n  error: String\n  timetables: [TimeTable]\n}\n\ntype TimeTable {\n  id: Int!\n  yearMonthWeek: String!\n  organizationId: Int\n  organization: Organization!\n  days: [Day]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateUserToOrganizationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetUsersResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype RemoveUserFromOrganizationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  personalCode: String!\n  name: String!\n  phoneNumber: String!\n  organizationId: Int\n  organization: Organization!\n  slots: [Slot]\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetDays: GetDaysResponse;
  GetOrganizationProfile: GetOrganizationProfileResponse;
  GetSlots: GetSlotsResponse;
  GetTimeTables: GetTimeTablesResponse;
  GetUsers: GetUsersResponse;
}

export interface GetDaysQueryArgs {
  timetableId: number;
}

export interface GetOrganizationProfileQueryArgs {
  orgId: number;
}

export interface GetSlotsQueryArgs {
  dayId: number;
}

export interface GetDaysResponse {
  ok: boolean;
  error: string | null;
  days: Array<Day> | null;
}

export interface Day {
  id: number;
  dayNumber: number;
  timetableId: number | null;
  timetable: TimeTable;
  slots: Array<Slot> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface TimeTable {
  id: number;
  yearMonthWeek: string;
  organizationId: number | null;
  organization: Organization;
  days: Array<Day> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Organization {
  id: number;
  name: string;
  loginId: string;
  password: string;
  users: Array<User> | null;
  timetables: Array<TimeTable> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  personalCode: string;
  name: string;
  phoneNumber: string;
  organizationId: number | null;
  organization: Organization;
  slots: Array<Slot> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Slot {
  id: number;
  startTime: string;
  endTime: string;
  userId: number | null;
  user: User;
  dayId: number | null;
  day: Day;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetOrganizationProfileResponse {
  ok: boolean;
  error: string | null;
  organization: Organization | null;
}

export interface GetSlotsResponse {
  ok: boolean;
  error: string | null;
  slots: Array<Slot> | null;
}

export interface GetTimeTablesResponse {
  ok: boolean;
  error: string | null;
  timetables: Array<TimeTable> | null;
}

export interface GetUsersResponse {
  ok: boolean;
  error: string | null;
  users: Array<User> | null;
}

export interface Mutation {
  CreateDay: CreateDayResponse;
  CreateOrganization: CreateOrganizationResponse;
  OrganizationSignIn: OrganizationSignInResponse;
  CreateSlot: CreateSlotResponse;
  CreateTimeTable: CreateTimeTableResponse;
  CreateUserToOrganization: CreateUserToOrganizationResponse;
  RemoveUserFromOrganization: RemoveUserFromOrganizationResponse;
}

export interface CreateDayMutationArgs {
  dayNumber: number;
  timetableId: number;
}

export interface CreateOrganizationMutationArgs {
  name: string;
  loginId: string;
  password: string;
}

export interface OrganizationSignInMutationArgs {
  loginId: string;
  password: string;
}

export interface CreateSlotMutationArgs {
  startTime: string;
  endTime: string;
  dayId: number;
  personalCode: string;
  organizationId: number;
}

export interface CreateTimeTableMutationArgs {
  yearMonthWeek: string;
}

export interface CreateUserToOrganizationMutationArgs {
  personalCode: string;
  name: string;
  phoneNumber: string;
}

export interface RemoveUserFromOrganizationMutationArgs {
  userId: number;
}

export interface CreateDayResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateOrganizationResponse {
  ok: boolean;
  error: string | null;
}

export interface OrganizationSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface CreateSlotResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateTimeTableResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateUserToOrganizationResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveUserFromOrganizationResponse {
  ok: boolean;
  error: string | null;
}
