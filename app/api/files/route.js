import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const allFiles = await prisma.file.findMany();
    return NextResponse.json(allFiles);
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching files");
  }
}

export async function POST(request) {
  let { name, desc, category, content, uploader } = await request.json();
  console.log(name);
  console.log(desc);
  console.log(category);
  console.log(content);
  console.log(uploader);

  try {
    if (!name || !category || !content) {
      throw new Error(
        "Some fields weren't filled!Please fill all the required fields "
      );
    }
    name = name.toLowerCase();
    category = category.toLowerCase();
    const fileExists = await prisma.file.findUnique({
      where: {
        name,
      },
    });
    if (fileExists) {
      // throw new Error('Username already exists')
      throw new Error("File with such name already exists");
    }
    const categoryId = await prisma.category.findUnique({
      where: {
        name: category,
      },
      select: {
        id: true,
      },
    });
    const newFile = await prisma.file.create({
      data: {
        name,
        description: desc,
        content,
        uploader,
        category: categoryId.id,
      },
    });
    // console.log(newFile);
    if (!newFile) {
      throw new Error("Failed to upload file! Please try asgain");
    }
    return NextResponse.json(
      {
        message: "File was uploaded successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upload file! Please try again");
  }
}
