const AWS = require("aws-sdk");

const s3Client = new AWS.S3();

const s3 = {
  async get(fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    let data = await s3Client.getObject(params).promise();
    if (!data) {
      throw Error(`There was an error reading the file in s3`);
    }

    if (fileName.slice(fileName.length - 4, fileName.length) === "json") {
      data = data.Body.toString();
    }
    return data;
  },
  async write(data, fileName, bucketName) {
    const params = {
      Bucket: bucketName,
      Body: JSON.stringify(data),
      Key: fileName,
    };

    const newData = await s3Client.putObject(params).promise();
    if (!newData) {
      throw Error(`There was an error creating the file in s3`);
    }

    return newData;
  },
};

module.exports = s3;
