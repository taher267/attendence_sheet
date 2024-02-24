const {
  badRequest,
  // customError,
  // authorizationError,
} = require("../../utils/error");
const workReportRepo = require("../../repo/workReport");
// const userRepo = require("../../repo/user");
// const { isValidObjectId } = require("mongoose");
const objectIdsChecker = require("../../utils/objectIdsChecker");

const updateItemProperties = async ({ defaultQuery = {}, status }) => {
  console.log(defaultQuery);
  if (!Object.keys(defaultQuery)?.length) {
    throw badRequest(`Invalid parameters!`);
  } else {
    objectIdsChecker({ data: defaultQuery });
  }
  const qry = { ...defaultQuery };
  const existWorkReport = await workReportRepo.findItem(defaultQuery);
  console.log(existWorkReport, { defaultQuery });

  if (!existWorkReport) {
    throw notFound();
  }

  // else if (
  //   !workReportConfig.updatableObserverStatuses.includes(existWorkReport.status)
  // ) {
  //   throw badRequest(`Your are not eligible to update!`);
  // }

  const updateWorkReportObj = { status };
  if (updateItemProperties.status === existWorkReport.status) {
    throw badRequest(`Nothing to changed!`);
  }
  const updated = await workReportRepo.updateItem({
    qry,
    updateData: updateWorkReportObj,
    options: { new: true, runValidators: true },
  });

  return updated;
};

module.exports = updateItemProperties;
