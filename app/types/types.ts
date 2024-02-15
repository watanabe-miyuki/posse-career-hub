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
};

type Plan = {
  id: number;
  profileIcon: string;
  title: string;
  thumbnail: string;
  status: string;
}

type User = {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  createdAt: string;
  user: User;
}

export type { CardType, User, Purchase };
