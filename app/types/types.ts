import exp from "constants";

type CardType = {
  id: string;
  author: string;
  company: string;
  description: string;
  profession: string;
  posseGeneration: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  providerAccountId: string;
  plans: Plan[];
  status: string;
};

type Plan = {
  id: number;
  profileIcon: string;
  title: string;
  thumbnail: string;
  status: string;
};

type PlanDetail = {
  id: string;
  userId: string;
  providerAccountId: string;
  title: string;
  thumbnail: string;
  description: string;
  status: string;
};

type User = {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type UserDetail = {
  id: string;
  name: string | null;
  image: string | null;
  company: string | undefined;
  description: string | null;
  profession: string | null;
  posseGeneration: string | null;
};

type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  user: User;
};

export type { CardType, User, UserDetail, Purchase, PlanDetail };
