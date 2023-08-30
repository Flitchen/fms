import { prisma } from "@/config/db";
import { NextResponse } from "next/server";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

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
  const data = await request.formData()
  const file = data.get('file')
  const category =await data.get('category')
  let uploaderId =await data.get('user')
    const uploader= parseInt(uploaderId)

  try {
    if(!file||!category){
      throw new Error("Please fill all the fields")
  }
    
    const fileExists = await prisma.file.findUnique({
      where: {
        name:file.name
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
    const destinationDirPath = path.join(process.cwd(), "public");

    const fileArrayBuffer = await file.arrayBuffer();

    if (!existsSync(destinationDirPath)) {
      fs.mkdir(destinationDirPath, { recursive: true });
    }
    await fs.writeFile(
      path.join(destinationDirPath, file.name),
      Buffer.from(fileArrayBuffer)
    );
    const newFile = await prisma.file.create({
      data: {
        name:file.name,
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
