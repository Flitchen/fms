import { prisma } from "@/config/db";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userRoles = await prisma.role.findMany();
    return NextResponse.json(userRoles, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching users");
  }
}

export async function POST(request) {
  let { fname, mname, lname, phone, address, role } = await request.json();
  fname = fname.toLowerCase();
  mname = mname.toLowerCase();
  lname = lname.toLowerCase();
  phone = phone.toLowerCase();
  address = address.toLowerCase();
  role = role.toLowerCase();
  const password = hashSync("12345", 10);

  try {
    if (!fname || !lname || !phone || !address || !role) {
      throw new Error(
        "Some fields weren't filled! Please fill all the required fields "
      );
    }

    const username = lname + "@2023";

    const usernameExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (usernameExists) {
      throw new Error("Username already exists");
    }

    //Checking if role ise present
    const rolePresent = await prisma.role.findUnique({
      where: {
        name: role,
      },
    });

    if (rolePresent) {
      const roleId = await prisma.role.findUnique({
        where: {
          name: role,
        },
        select: {
          id: true,
        },
      });
      const newUser = await prisma.user.create({
        data: {
          first_name: fname,
          middle_name: mname,
          last_name: lname,
          username,
          password,
          phone_no: phone,
          address,
          role: roleId.id,
        },
      });
      //insert user

      if (!newUser) {
        throw new Error("Failed to add user");
      } else {
        return NextResponse.json(
          {
            message: "User was added successfully",
          },
          { status: 200 }
        );
      }
    } else {
      const newRole = await prisma.role.create({
        data: {
          name: role,
        },
      });

      if (!newRole) {
        throw new Error("Failed to create role");
      }

      const roleId = await prisma.role.findUnique({
        where: {
          name: role,
        },
        select: {
          id: true,
        },
      });
      const newUser = await prisma.user.create({
        data: {
          first_name: fname,
          middle_name: mname,
          last_name: lname,
          username,
          password,
          phone_no: phone,
          address,
          role: roleId.id,
        },
      });
      if (!newUser) {
        throw new Error("Failed to add user");
      }
      return NextResponse.json(
        {
          message: "User was added successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add user");
  }
}
