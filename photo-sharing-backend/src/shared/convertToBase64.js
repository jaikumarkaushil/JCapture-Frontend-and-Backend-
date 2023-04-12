import { Transform } from 'stream';
import base64 from 'base64-stream';

import fs from 'fs';
const processUpload = async (upload) => {
  const uploadedData = await upload;
  const fileStream = uploadedData.createReadStream()
  // fileStream.push()
  const bufferStream = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk);
      callback();
    }
  });

  const base64Stream = fileStream.pipe(bufferStream).pipe(new base64.Base64Encode());

  let base64Data = '';
  for await (const data of base64Stream) {
    base64Data += data;
  }
  return base64Data;
};

const convertToBase64 = async (upload) => {
  try {
    const uploadedFile = await processUpload(upload);
    // fs.writeFileSync("foo.txt", "data:image/gif;base64," + uploadedFile);
    return "data:image/gif;base64," + uploadedFile;
  } catch (error) {
    console.log(error)
    return error;
  }
}

export default convertToBase64;