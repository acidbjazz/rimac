import type { User, Plan } from "./definitions";

const USER_API_URL = "https://rimac-front-end-challenge.netlify.app/api/user.json";
const PLANS_API_URL = "https://rimac-front-end-challenge.netlify.app/api/plans.json";

export async function getUser(): Promise<User> {
  const response = await fetch(USER_API_URL);
  const data: User = await response.json();
  return data;
}

export async function getPlans(): Promise<Plan[]> {
  const response = await fetch(PLANS_API_URL);
  const data: { list: Plan[] } = await response.json();
  return data.list;
}
