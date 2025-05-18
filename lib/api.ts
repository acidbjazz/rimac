import type { UserApiData, PlanDetails } from "@lib/context";

const USER_API_URL = "https://rimac-front-end-challenge.netlify.app/api/user.json";
const PLANS_API_URL = "https://rimac-front-end-challenge.netlify.app/api/plans.json";

export async function getUser(): Promise<UserApiData> {
  const response = await fetch(USER_API_URL);
  const data: UserApiData = await response.json();
  return data;
}

interface PlansApiResponse {
  list: PlanDetails[];
}

export async function getPlans(): Promise<PlanDetails[]> {
  const response = await fetch(PLANS_API_URL);
  const data: PlansApiResponse = await response.json();
  return data.list;
}
