import Registration from "@/models/Registration";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, phoneNumber, title } = await request.json();

  try {
    await connect();

    const newRegistration = new Registration({
      name,
      email,
      phoneNumber,
      title,
    });

    await newRegistration.save();

    return new NextResponse("Registration successful", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const GET = async (request) => {
  try {
    await connect();

    const registrations = await Registration.find({});

    return new NextResponse(JSON.stringify(registrations), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};