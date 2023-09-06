import { prisma } from "@/config/db";
import { NextResponse } from "next/server";
import { unlinkSync } from "fs";

export async function DELETE(request, { params }) {
  const fileName = params.name;
  try {
    const fileId = await prisma.file.findUnique({
      where: {
        name: fileName,
      },
      select: {
        id: true,
      },
    });
    if (!fileId) {
      throw new Error("Such file does not exist");
    }
    const deleteFile = await prisma.file.delete({
      where: {
        id: fileId.id,
      },
    });
    if (!deleteFile) {
      throw new Error("Failed to delete file");
    }

    //Deleting file from the public folder
    unlinkSync(`public/${fileName}`);

    return NextResponse.json(
      {
        message: "File deleted successfully",
      },
      { status: 201 }
    );
  } catch (error) {}
}
