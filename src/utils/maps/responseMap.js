const resMap = async ({ res, data, selectedFields, successMessage }) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    return await res
      .status(400)
      .json({ flag: false, data: {}, message: "Missing project ID" });
  }

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

  let resData = {};
  selectedFields.foreach((field) => {
    res[field] = data[field];
  });

  return await res.status(200).json({
    flag: true,
    data: resData,
    message: `Succesful request! ${successMessage ? successMessage : ""}`,
  });
};
module.exports = { resMap };
