import { NextResponse } from 'next/server';

// Mock data for pharmacy services
const pharmacyServices = [
  {
    id: "vaccination",
    name: "Vaccination Services",
    category: "pharmacy",
    level: 0,
    children: [
      { id: "covid-vaccine", name: "COVID-19 Vaccine", category: "pharmacy", parentId: "vaccination", level: 1 },
      { id: "flu-vaccine", name: "Flu Vaccine", category: "pharmacy", parentId: "vaccination", level: 1 },
      { id: "travel-vaccine", name: "Travel Vaccines", category: "pharmacy", parentId: "vaccination", level: 1 },
      { id: "hpv-vaccine", name: "HPV Vaccine", category: "pharmacy", parentId: "vaccination", level: 1 },
    ],
  },
  {
    id: "mens-health",
    name: "Men's Health",
    category: "pharmacy",
    level: 0,
    children: [
      { id: "erectile-dysfunction", name: "Erectile Dysfunction", category: "pharmacy", parentId: "mens-health", level: 1 },
      { id: "hair-loss", name: "Hair Loss Treatment", category: "pharmacy", parentId: "mens-health", level: 1 },
      { id: "testosterone", name: "Testosterone Therapy", category: "pharmacy", parentId: "mens-health", level: 1 },
    ],
  },
  {
    id: "womens-health",
    name: "Women's Health",
    category: "pharmacy",
    level: 0,
    children: [
      { id: "contraception", name: "Contraception", category: "pharmacy", parentId: "womens-health", level: 1 },
      { id: "uti-treatment", name: "UTI Treatment", category: "pharmacy", parentId: "womens-health", level: 1 },
      { id: "menopause", name: "Menopause Support", category: "pharmacy", parentId: "womens-health", level: 1 },
    ],
  },
  {
    id: "pharmacy-first",
    name: "Pharmacy 1st Services",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "blood-pressure",
    name: "Blood Pressure Monitoring",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "diabetes-care",
    name: "Diabetes Care",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "wellness",
    name: "Wellness Services",
    category: "pharmacy",
    level: 0,
    children: [
      { id: "weight-management", name: "Weight Management", category: "pharmacy", parentId: "wellness", level: 1 },
      { id: "nutrition-advice", name: "Nutrition Advice", category: "pharmacy", parentId: "wellness", level: 1 },
      { id: "health-screening", name: "Health Screening", category: "pharmacy", parentId: "wellness", level: 1 },
    ],
  },
  {
    id: "consultation",
    name: "Consultation Services",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "delivery",
    name: "Delivery Services",
    category: "pharmacy",
    level: 0,
  },
  {
    id: "emergency",
    name: "Emergency Services",
    category: "pharmacy",
    level: 0,
  },
];

export async function GET() {
  try {
    return NextResponse.json({ data: pharmacyServices });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
} 