const statuses = ["submited", "on-review", "approved", "rejected"];

const nextSubmitionWithApproval = false; //if `true` at first previous all submited from should be approved by observer
const nextSubmitionWithReject = false;
const currentSubmitionWithPreviousAllSubmissions = true; // if `true` you have submit previous all days form first! To fill up Till current day.

module.exports = {
  statuses,
  nextSubmitionWithApproval,
  nextSubmitionWithReject,
  currentSubmitionWithPreviousAllSubmissions,
};
