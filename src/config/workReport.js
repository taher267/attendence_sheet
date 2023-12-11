const statuses = ["submited", "on-review", "approved", "rejected"];

const nextSubmitionWithApproval = false; //if `true` at first previous all submited from should be approved by observer
const nextSubmitionWithReject = false; // if `false` Any previous submission cannot be rejected
const currentSubmitionWithPreviousAllSubmissions = true; // if `true` you have submit previous all days form first! To fill up Till current day.
const approvalType = "by_form_fill_up"; //menually

module.exports = {
  statuses,
  nextSubmitionWithApproval,
  nextSubmitionWithReject,
  currentSubmitionWithPreviousAllSubmissions,
  approvalType,
};
