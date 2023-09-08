import { prisma } from "@/config/db";
import { compare, hash, hashSync } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { oldpass, newpass, cnewpass, userId } = await request.json();

  if (!oldpass || !newpass || !cnewpass || !userId) {
    throw new Error("Some fields ar empty!");
  }

  try {
    const dbOldPass = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });
    const oldPassMatch = await compare(oldpass, dbOldPass.password);
    if (!oldPassMatch) {
      throw new Error("Old Password did not match! try Again");
    }
    if (newpass !== cnewpass) {
      throw new Error("New password do not match");
    }

    const hashedPass = hashSync(newpass, 10);
    const updatePass = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPass,
      },
    });

    if (!updatePass) {
      throw new Error("Failed. update password");
    }

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
