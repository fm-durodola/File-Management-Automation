import fs from "node:fs";
import { addToFile, createFile, deleteFile, renameFile } from "./lib.mjs";

const CREATE_FILE = "create a file";
const DELETE_FILE = "delete a file";
const RENAME_FILE = "rename a file";
const ADD_TO_FILE = "add to a file";

fs.watchFile("command.txt", { interval: 100 }, async (curr, prev) => {
  const fileDescriptor = await fs.promises.open("./command.txt", "r");
  const { size } = await fileDescriptor.stat();

  const buff = Buffer.alloc(size); // CREATE A BUFFER WITH EXACT SIZE WE NEED AND FILL WITH 00 00 00 0....

  const offset = 0;
  const position = 0;
  const length = buff.byteLength;

  await fileDescriptor.read(buff, offset, length, position); // buff WILL BE FILLED WITH THE CONTENT OF THE "command.txt" BUT IN HEX

  const commandContent = buff.toString("utf-8"); // CONVERT FROM BUFFER TO READABLE STRING

  /* CHECK IF THE INSTRUCTION IS TO - CREATE A NEW EMPTY FILE */
  if (commandContent.includes(CREATE_FILE)) {
    const filePath = commandContent.substring(CREATE_FILE.length + 1).trim();
    createFile(filePath);
  }

  /* CHECK IF THE INSTRUCTION IS TO - DELETE A FILE */
  if (commandContent.includes(DELETE_FILE)) {
    const filePath = commandContent.substring(DELETE_FILE.length + 1).trim();
    deleteFile(filePath);
  }

  /* CHECK IF THE INSTRUCTION IS TO - ADD CONTENT TO A FILE, IF IT DOESN'T EXIST, NEW FILE IS CREATE WITH THE CONTENT */
  if (commandContent.includes(ADD_TO_FILE)) {
    const _index = commandContent.indexOf("content : ");
    const filePath = commandContent
      .substring(ADD_TO_FILE.length + 1, _index)
      .trim();
    const content = commandContent.substring(_index + 10).trim();

    addToFile(filePath, `\n${content}`);
  }

  /* CHECK IF THE INSTRUCTION IS TO - RENAME A FILE */
  if (commandContent.includes(RENAME_FILE)) {
    const _index = commandContent.indexOf("to ");
    const oldPath = commandContent
      .substring(RENAME_FILE.length + 1, _index)
      .trim();
    const newPath = commandContent.substring(_index + 3).trim();

    renameFile(oldPath, newPath);
  }

  fileDescriptor.close();
});
