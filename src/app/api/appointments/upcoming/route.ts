import { NextResponse } from "next/server";

// Mock data for demonstration - replace with actual database calls
const mockAppointments = [
  {
    time: "10:00 AM",
    partnerCode: "PHR001",
    partnerName: "Central Pharmacy",
    serviceName: "Health Checkup",
    status: "confirmed",
    date: "2024-03-20"
  },
  {
    time: "2:30 PM",
    partnerCode: "PHR002",
    partnerName: "City Health Center",
    serviceName: "Vaccination",
    status: "pending",
    date: "2024-03-22"
  }
];

export async function GET() {
  try {
    // TODO: Replace with actual database query
    const appointments = mockAppointments;

    return NextResponse.json(
      { 
        success: true, 
        data: appointments 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch appointments" 
      },
      { status: 500 }
    );
  }
} 