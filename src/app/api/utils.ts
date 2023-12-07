'use server'

import {join} from "path";
import fs, {existsSync} from "fs";

export const uploadImage = async (image: File) => {
  console.log(`File name: ${image.name}`);
  console.log(`Content-Length: ${image.size}`);

  const destinationDirPath = join(process.cwd(), "public/upload");
  console.log(destinationDirPath);

  const fileArrayBuffer = await image.arrayBuffer();

  if (!existsSync(destinationDirPath)) {
    fs.mkdir(destinationDirPath, {recursive: false}, () => {
    });
  }
  const path = join('upload', image.name);
  await fs.writeFile(
      path,
      Buffer.from(fileArrayBuffer), {}, () => {
      });

  return '/' + path;
}

