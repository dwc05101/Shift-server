export const typeDefs = ["type CreateDayResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateDay(startTime: String!, endTime: String!, dayNumber: Int!, timeTableId: Int!): CreateDayResponse!\n  CreateLink(timetableId: Int!): CreateLinkResponse!\n  RemoveLink(linkId: Int!): RemoveLinkResponse!\n  CreateOrganization(name: String!, loginId: String!, password: String!, profilePhoto: String!): CreateOrganizationResponse!\n  OrganizationSignIn(loginId: String!, password: String!): OrganizationSignInResponse!\n  RemoveOrganization: RemoveOrganizationResponse!\n  UpdateOrganization(name: String, password: String): UpdateOrganizationResponse!\n  CreateSlot(startTime: String!, endTime: String!, dayNumber: Int!, timetableId: Int!, personalCode: String!, organizationId: Int!): CreateSlotResponse!\n  RemoveSlot(slotId: Int!): RemoveSlotResponse!\n  UpdateSlot(slotId: Int!, startTime: String, endTime: String, userId: Int, day: Int): UpdateSlotResponse!\n  ConfirmTimeTable(timetableId: Int!): ConfirmTimeTableResponse!\n  CreateTimeTable(yearMonthWeek: String!, startTime: String!, endTime: String!): CreateTimeTableResponse!\n  CreateUserToOrganization(personalCode: String!, name: String!, phoneNumber: String!): CreateUserToOrganizationResponse!\n  RemoveUserFromOrganization(userId: Int!): RemoveUserFromOrganizationResponse!\n  UpdateUser(userId: Int!, personalCode: String, name: String, phoneNumber: String): UpdateUserResponse!\n}\n\ntype GetDaysResponse {\n  ok: Boolean!\n  error: String\n  days: [Day]\n}\n\ntype Query {\n  GetDays(timetableId: Int!): GetDaysResponse!\n  GetLink(organizationId: Int!, timetableId: Int!): GetLinkResponse!\n  GetOrganizationProfile: GetOrganizationProfileResponse!\n  GetSlots(dayId: Int!): GetSlotsResponse!\n  GetCurrentTimeTable(yearMonthWeek: String!, organizationId: Int!): GetCurrentTimeTableResponse!\n  GetTimeTables: GetTimeTablesResponse!\n  GetUsers: GetUsersResponse!\n}\n\ntype Day {\n  id: Int!\n  dayNumber: Int!\n  startTime: String!\n  endTime: String!\n  timetableId: Int\n  timetable: TimeTable!\n  slots: [Slot]\n}\n\ntype CreateLinkResponse {\n  ok: Boolean!\n  error: String\n  link: Link\n}\n\ntype GetLinkResponse {\n  ok: Boolean!\n  error: String\n  link: Link\n}\n\ntype RemoveLinkResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Link {\n  id: Int!\n  url: String!\n  organizationId: Int\n  organization: Organization!\n  timetableId: Int\n  timetable: TimeTable!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateOrganizationResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetOrganizationProfileResponse {\n  ok: Boolean!\n  error: String\n  organization: Organization\n}\n\ntype OrganizationSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype RemoveOrganizationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Organization {\n  id: Int!\n  name: String!\n  loginId: String!\n  password: String!\n  profilePhoto: String!\n  users: [User]\n  links: [Link]\n  timetables: [TimeTable]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateOrganizationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CreateSlotResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetSlotsResponse {\n  ok: Boolean!\n  error: String\n  slots: [Slot]\n}\n\ntype RemoveSlotResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Slot {\n  id: Int!\n  startTime: String!\n  endTime: String!\n  userId: Int\n  user: User!\n  dayId: Int\n  day: Day!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateSlotResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype ConfirmTimeTableResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype CreateTimeTableResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetCurrentTimeTableResponse {\n  ok: Boolean!\n  error: String\n  timetable: TimeTable\n}\n\ntype GetTimeTablesResponse {\n  ok: Boolean!\n  error: String\n  timetables: [TimeTable]\n}\n\ntype TimeTable {\n  id: Int!\n  isConfirmed: Boolean!\n  yearMonthWeek: String!\n  startTime: String!\n  endTime: String!\n  organizationId: Int\n  organization: Organization!\n  links: [Link]\n  days: [Day]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateUserToOrganizationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetUsersResponse {\n  ok: Boolean!\n  error: String\n  users: [User]\n}\n\ntype RemoveUserFromOrganizationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype User {\n  id: Int!\n  personalCode: String!\n  name: String!\n  phoneNumber: String!\n  organizationId: Int\n  organization: Organization!\n  slots: [Slot]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype UpdateUserResponse {\n  ok: Boolean!\n  error: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetDays: GetDaysResponse;
  GetLink: GetLinkResponse;
  GetOrganizationProfile: GetOrganizationProfileResponse;
  GetSlots: GetSlotsResponse;
  GetCurrentTimeTable: GetCurrentTimeTableResponse;
  GetTimeTables: GetTimeTablesResponse;
  GetUsers: GetUsersResponse;
}

export interface GetDaysQueryArgs {
  timetableId: number;
}

export interface GetLinkQueryArgs {
  organizationId: number;
  timetableId: number;
}

export interface GetSlotsQueryArgs {
  dayId: number;
}

export interface GetCurrentTimeTableQueryArgs {
  yearMonthWeek: string;
  organizationId: number;
}

export interface GetDaysResponse {
  ok: boolean;
  error: string | null;
  days: Array<Day> | null;
}

export interface Day {
  id: number;
  dayNumber: number;
  startTime: string;
  endTime: string;
  timetableId: number | null;
  timetable: TimeTable;
  slots: Array<Slot> | null;
}

export interface TimeTable {
  id: number;
  isConfirmed: boolean;
  yearMonthWeek: string;
  startTime: string;
  endTime: string;
  organizationId: number | null;
  organization: Organization;
  links: Array<Link> | null;
  days: Array<Day> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Organization {
  id: number;
  name: string;
  loginId: string;
  password: string;
  profilePhoto: string;
  users: Array<User> | null;
  links: Array<Link> | null;
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

export interface Link {
  id: number;
  url: string;
  organizationId: number | null;
  organization: Organization;
  timetableId: number | null;
  timetable: TimeTable;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetLinkResponse {
  ok: boolean;
  error: string | null;
  link: Link | null;
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

export interface GetCurrentTimeTableResponse {
  ok: boolean;
  error: string | null;
  timetable: TimeTable | null;
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
  CreateLink: CreateLinkResponse;
  RemoveLink: RemoveLinkResponse;
  CreateOrganization: CreateOrganizationResponse;
  OrganizationSignIn: OrganizationSignInResponse;
  RemoveOrganization: RemoveOrganizationResponse;
  UpdateOrganization: UpdateOrganizationResponse;
  CreateSlot: CreateSlotResponse;
  RemoveSlot: RemoveSlotResponse;
  UpdateSlot: UpdateSlotResponse;
  ConfirmTimeTable: ConfirmTimeTableResponse;
  CreateTimeTable: CreateTimeTableResponse;
  CreateUserToOrganization: CreateUserToOrganizationResponse;
  RemoveUserFromOrganization: RemoveUserFromOrganizationResponse;
  UpdateUser: UpdateUserResponse;
}

export interface CreateDayMutationArgs {
  startTime: string;
  endTime: string;
  dayNumber: number;
  timeTableId: number;
}

export interface CreateLinkMutationArgs {
  timetableId: number;
}

export interface RemoveLinkMutationArgs {
  linkId: number;
}

export interface CreateOrganizationMutationArgs {
  name: string;
  loginId: string;
  password: string;
  profilePhoto: string;
}

export interface OrganizationSignInMutationArgs {
  loginId: string;
  password: string;
}

export interface UpdateOrganizationMutationArgs {
  name: string | null;
  password: string | null;
}

export interface CreateSlotMutationArgs {
  startTime: string;
  endTime: string;
  dayNumber: number;
  timetableId: number;
  personalCode: string;
  organizationId: number;
}

export interface RemoveSlotMutationArgs {
  slotId: number;
}

export interface UpdateSlotMutationArgs {
  slotId: number;
  startTime: string | null;
  endTime: string | null;
  userId: number | null;
  day: number | null;
}

export interface ConfirmTimeTableMutationArgs {
  timetableId: number;
}

export interface CreateTimeTableMutationArgs {
  yearMonthWeek: string;
  startTime: string;
  endTime: string;
}

export interface CreateUserToOrganizationMutationArgs {
  personalCode: string;
  name: string;
  phoneNumber: string;
}

export interface RemoveUserFromOrganizationMutationArgs {
  userId: number;
}

export interface UpdateUserMutationArgs {
  userId: number;
  personalCode: string | null;
  name: string | null;
  phoneNumber: string | null;
}

export interface CreateDayResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateLinkResponse {
  ok: boolean;
  error: string | null;
  link: Link | null;
}

export interface RemoveLinkResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateOrganizationResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface OrganizationSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface RemoveOrganizationResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateOrganizationResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateSlotResponse {
  ok: boolean;
  error: string | null;
}

export interface RemoveSlotResponse {
  ok: boolean;
  error: string | null;
}

export interface UpdateSlotResponse {
  ok: boolean;
  error: string | null;
}

export interface ConfirmTimeTableResponse {
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

export interface UpdateUserResponse {
  ok: boolean;
  error: string | null;
}
