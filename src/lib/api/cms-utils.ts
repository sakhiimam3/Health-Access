export async function getHowItWorksData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/cms/how-it-works`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch How It Works data");
  return res.json();
}

export async function getHomeServicesData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/cms/home`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch Home Services data");
  return res.json();
} 