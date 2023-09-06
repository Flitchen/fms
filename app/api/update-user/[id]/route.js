import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const userId = parseInt(params.id);
  try {
    //Checking if user exists
    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExist) {
      throw new Error("User does not exist!");
    }
    const roleName = await prisma.role.findUnique({
      where: {
        id: userExist.role,
      },
      select: {
        name: true,
      },
    });
    return NextResponse.json(
      { userExist, roleName: roleName.name },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function PATCH(request, { params }) {
  const userId = parseInt(params.id);
  let { fname, mname, lname, phone, address, role } = await request.json();
  fname = fname.toLowerCase();
  mname = mname.toLowerCase();
  lname = lname.toLowerCase();
  phone = phone.toLowerCase();
  address = address.toLowerCase();
  role = role.toLowerCase();

  try {
    if (!fname || !lname || !phone || !address || !role) {
      throw new Error(
        "Some fields weren't filled! Please fill all the required fields "
      );
    }
    const username = lname + "@2023";
    const rolePresent = await prisma.role.findUnique({
      where: {
        name: role,
      },
    });
    //Checking if the role is present
    if (rolePresent) {
      const roleId = await prisma.role.findUnique({
        where: {
          name: role,
        },
        select: {
          id: true,
        },
      });
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          first_name: fname,
          middle_name: mname,
          last_name: lname,
          username,
          phone_no: phone,
          address,
          role: roleId.id,
        },
      });

      if (!updateUser) {
        throw new Error("Failed to update user details");
      } else {
        return NextResponse.json(
          {
            message: "User details were updated successfully",
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
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          first_name: fname,
          middle_name: mname,
          last_name: lname,

          phone_no: phone,
          address,
          role: roleId.id,
        },
      });

      if (!updateUser) {
        throw new Error("Failed to update user details");
      }

      return NextResponse.json(
        {
          message: "User details were added successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(request, { params }) {
  const userId = parseInt(params.id);
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (!deleteUser) {
      throw new Error("Failed to delete user");
    }
    return NextResponse.json(
      {
        message: "User deleted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
  }
}
