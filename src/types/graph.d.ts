export const typeDefs = ["type CreateDayResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateDay(dayNumber: Int!, weekId: Int!): CreateDayResponse!\n  AcceptInvitation(invitationId: Int!): AcceptInvitationResponse!\n  SendInvitation(invitingOrganizationId: Int!, invitedUserId: Int!): SendInvitationResponse!\n  CreateOrganization(name: String!): CreateOrganizationResponse!\n  CreateSlot(startTime: String!, endTime: String!, dayId: Int!): CreateSlotResponse!\n  CreateTimeTable(yearMonth: String!, organizationId: Int!): CreateTimeTableResponse!\n  EmailSignIn(email: String!, password: String!): EmailSignInResponse!\n  EmailSignUp(firstName: String!, lastName: String!, email: String!, password: String!, profilePhoto: String!, phoneNumber: String!): EmailSignUpResponse!\n  FacebookConnect(firstName: String!, lastName: String!, email: String, fbId: String!): FacebookConnectResponse!\n  CreateWeek(weekNumber: Int!, timetableId: Int!): CreateWeekResponse!\n}\n\ntype Day {\n  id: Int!\n  dayNumber: Int!\n  weekId: Int!\n  week: Week!\n  slots: [Slot]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype AcceptInvitationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SendInvitationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Invitation {\n  id: Int!\n  invitingOrganizationId: Int\n  invitingOrganization: Organization!\n  invitedUserId: Int\n  invitedUser: User!\n  accepted: Boolean!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateOrganizationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetOrganizationProfileResponse {\n  ok: Boolean!\n  error: String\n  organization: Organization\n}\n\ntype Query {\n  GetOrganizationProfile(orgId: Int!): GetOrganizationProfileResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype Organization {\n  id: Int!\n  name: String!\n  adminId: Int\n  admin: User!\n  users: [User]\n  timetables: [TimeTable]\n  invitations: [Invitation]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateSlotResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Slot {\n  id: Int!\n  startTime: String!\n  endTime: String!\n  userId: Int\n  user: User!\n  dayId: Int\n  day: Day!\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateTimeTableResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype TimeTable {\n  id: Int!\n  yearMonth: String!\n  organizationId: Int\n  organization: Organization!\n  weeks: [Week]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype EmailSignInResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype EmailSignUpResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype FacebookConnectResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype User {\n  id: Int!\n  email: String\n  password: String\n  firstName: String!\n  lastName: String!\n  phoneNumber: String!\n  profilePhoto: String\n  fbId: String\n  organizationsAsAdmin: [Organization]\n  organizationsAsUser: [Organization]\n  invitations: [Invitation]\n  slots: [Slot]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype CreateWeekResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Week {\n  id: Int!\n  weekNumber: Int!\n  timetableId: Int\n  timetable: TimeTable!\n  days: [Day]\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetOrganizationProfile: GetOrganizationProfileResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetOrganizationProfileQueryArgs {
  orgId: number;
}

export interface GetOrganizationProfileResponse {
  ok: boolean;
  error: string | null;
  organization: Organization | null;
}

export interface Organization {
  id: number;
  name: string;
  adminId: number | null;
  admin: User;
  users: Array<User> | null;
  timetables: Array<TimeTable> | null;
  invitations: Array<Invitation> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string | null;
  password: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePhoto: string | null;
  fbId: string | null;
  organizationsAsAdmin: Array<Organization> | null;
  organizationsAsUser: Array<Organization> | null;
  invitations: Array<Invitation> | null;
  slots: Array<Slot> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Invitation {
  id: number;
  invitingOrganizationId: number | null;
  invitingOrganization: Organization;
  invitedUserId: number | null;
  invitedUser: User;
  accepted: boolean;
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

export interface Day {
  id: number;
  dayNumber: number;
  weekId: number;
  week: Week;
  slots: Array<Slot> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Week {
  id: number;
  weekNumber: number;
  timetableId: number | null;
  timetable: TimeTable;
  days: Array<Day> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface TimeTable {
  id: number;
  yearMonth: string;
  organizationId: number | null;
  organization: Organization;
  weeks: Array<Week> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CreateDay: CreateDayResponse;
  AcceptInvitation: AcceptInvitationResponse;
  SendInvitation: SendInvitationResponse;
  CreateOrganization: CreateOrganizationResponse;
  CreateSlot: CreateSlotResponse;
  CreateTimeTable: CreateTimeTableResponse;
  EmailSignIn: EmailSignInResponse;
  EmailSignUp: EmailSignUpResponse;
  FacebookConnect: FacebookConnectResponse;
  CreateWeek: CreateWeekResponse;
}

export interface CreateDayMutationArgs {
  dayNumber: number;
  weekId: number;
}

export interface AcceptInvitationMutationArgs {
  invitationId: number;
}

export interface SendInvitationMutationArgs {
  invitingOrganizationId: number;
  invitedUserId: number;
}

export interface CreateOrganizationMutationArgs {
  name: string;
}

export interface CreateSlotMutationArgs {
  startTime: string;
  endTime: string;
  dayId: number;
}

export interface CreateTimeTableMutationArgs {
  yearMonth: string;
  organizationId: number;
}

export interface EmailSignInMutationArgs {
  email: string;
  password: string;
}

export interface EmailSignUpMutationArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profilePhoto: string;
  phoneNumber: string;
}

export interface FacebookConnectMutationArgs {
  firstName: string;
  lastName: string;
  email: string | null;
  fbId: string;
}

export interface CreateWeekMutationArgs {
  weekNumber: number;
  timetableId: number;
}

export interface CreateDayResponse {
  ok: boolean;
  error: string | null;
}

export interface AcceptInvitationResponse {
  ok: boolean;
  error: string | null;
}

export interface SendInvitationResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateOrganizationResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateSlotResponse {
  ok: boolean;
  error: string | null;
}

export interface CreateTimeTableResponse {
  ok: boolean;
  error: string | null;
}

export interface EmailSignInResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface EmailSignUpResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface FacebookConnectResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface CreateWeekResponse {
  ok: boolean;
  error: string | null;
}
