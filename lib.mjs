import fs from "node:fs/promises";

let oldContent;

export const createFile = async (path) => {
  try {
    const checkFileExist = await fs.open(path, "r");
    console.error(`${path} already exist`);
    checkFileExist.close();
  } catch (error) {
    const newFile = await fs.open(path, "w");
    console.log(`${path} created successfully`);
    newFile.close();
  }
};

export const deleteFile = async (path) => {
  try {
    await fs.unlink(path);
    console.log(`${path} successfully DELETED`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`${path} doesn't exist`);
    } else {
      console.error(error);
    }
  }
};

export const addToFile = async (path, content) => {
  console.log(oldContent);
  console.log(content);
  if (oldContent === content) return;

  try {
    const fileDescriptor = await fs.open(path, "a");
    await fileDescriptor.write(content);

    console.log(`${content} appended to : ${path}, content.`);
    oldContent = content;
    fileDescriptor.close();
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`${path} doesn't exist`);
    } else {
      console.error(error);
    }
  }
};

export const renameFile = async (oldPath, newPath) => {
  try {
    await fs.rename(oldPath, newPath);
    console.log(`File successfully renamed`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`${oldPath} doesn't exist`);
    } else {
      console.error(error);
    }
  }
};
