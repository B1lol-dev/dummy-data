export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  address: {
    city: string;
    state: string;
  };
  company: {
    name: string;
    department: string;
  };
}

export interface IRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number | { likes: number; dislikes: number };
  user?: {
    firstName: string;
    lastName: string;
    image: string;
  };
}
