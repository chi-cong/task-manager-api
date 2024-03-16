const resMap = async ({ res, data, successMessage, returnData, callback }) => {
  if (!data) {
    return await res.status(404).json({
      flag: false,
      data: {},
      message: `Data doesn't exist or unknown error`,
    });
  }

  if (await data.errorCode) {
    return await res.status(400).json({
      flag: false,
      data: {},
      message: `Error: ${data.errorCode}`,
    });
  }

  if (callback) {
    callback();
  }

  return await res.status(200).json({
    flag: true,
    data: returnData,
    message: `Succesful request! ${successMessage ? successMessage : ""}`,
  });
};
module.exports = { resMap };
