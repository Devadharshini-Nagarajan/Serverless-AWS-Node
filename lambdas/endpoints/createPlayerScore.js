const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    return Responses._400({ message: "No path ID" });
  }

  let ID = event.pathParameters.ID;
  const user = JSON.parse(event.body);
  user.ID = ID;

  const newUser = await Dynamo.write(user, tableName).catch((err) => {
    console.log("error in Dynamo Write", err);
    return null;
  });
  if (!user) {
    return Responses._400({ message: "Failed to create user by ID" });
  }

  return Responses._200({ user });
};
