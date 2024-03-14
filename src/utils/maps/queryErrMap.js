const queryErrMap = (err) => {
  if (err.code) {
    return { errorCode: `Prisma ${err.code}` };
  }
  return { errorCode: err };
};
module.exports = { queryErrMap };
