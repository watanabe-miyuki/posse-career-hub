import exp from "constants";

type BookType = {
  id: number;
  title: string;
  content: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  plans: Plan[];
};

type Plan = {
  id: string;
  name: string;
  description: number;
  title: string;
  thumbnail: string;
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

export type { BookType, User, Purchase };
