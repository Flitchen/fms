import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    let role = params.role;
    if (
      role.charAt(role.length - 1) === "s" ||
      role.charAt(role.length - 1) === "S"
    ) {
      role = role.toLowerCase().slice(0, -1);
    }

    const roleId = await prisma.role.findUnique({
      where: {
        name: role,
      },
      select: {
        id: true,
      },
    });
    if (!roleId) {
      throw new Error("The role does not exist!");
    }

    const allUsers = await prisma.user.findMany({
      where: {
        role: roleId.id,
      },
    });
    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error(`Error in fetching ${role}s`);
  }
}
