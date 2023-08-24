import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const allCategories = await prisma.category.findMany();
    return NextResponse.json(allCategories);
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching categories");
  }
}

export async function POST(request) {
  let { name } = await request.json();

  try {
    if (!name) {
      throw new Error("Please enter the category name");
    }
    name = name.toLowerCase();
    const categoryExist = await prisma.category.findUnique({
      where: {
        name,
      },
    });
    if (categoryExist) {
      throw new Error("Category already exists");
    }
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    if (!newCategory) {
      throw new Error("Error in creating new category");
    }
    return NextResponse.json({ message: "Category addaed successfully" });
  } catch (error) {
    console.log(error);
  }
}
