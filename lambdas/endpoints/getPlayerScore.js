const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({ message: "No path ID" });
  }

  let ID = event.pathParameters.ID;

  const user = await Dynamo.get(ID, tableName).catch((err) => {
    console.log("error in Dynamo Get", err);
    return null;
  });
  if (!user) {
    return Responses._400({ message: "Failed to get user by ID" });
  }

  return Responses._200({ user });
};
