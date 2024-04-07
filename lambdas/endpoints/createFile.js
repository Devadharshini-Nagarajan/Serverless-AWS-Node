const Responses = require("../common/API_Responses");
const S3 = require("../common/S3");

const bucketName = process.env.bucketName;

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.fileName) {
    return Responses._400({ message: "No path fileName" });
  }

  let fileName = event.pathParameters.fileName;
  const data = JSON.parse(event.body);

  const newData = await S3.write(data, fileName, bucketName).catch((err) => {
    console.log("error in S3 Write", err);
    return null;
  });
  if (!newData) {
    return Responses._400({ message: "Failed to create file by FileName" });
  }

  return Responses._200({ newData });
};

