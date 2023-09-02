import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    let name = params.name;

    name = name.toLowerCase();

    const categoryId = await prisma.category.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });
    if (!categoryId) {
      throw new Error("The category does not exist!");
    }

    const allFiles = await prisma.file.findMany({
      where: {
        category: categoryId.id,
      },
    });
    return NextResponse.json(allFiles, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error(`Error in fetching ${name}s`);
  }
}
