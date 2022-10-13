// This file contains all the endpoints used in this app to which requests were made
// For a full list of all endpoints, visit https://www.postman.com/restless-water-478798/workspace/jureb-api

const baseUrl = process.env.REACT_APP_BACKEND_API_URL

const Authentication = {
    generateAuthTokens: `${baseUrl}/api/v1/admin/auth/auth-tokens`
}
const Misc = {
    getOverview: `${baseUrl}/api/v1/admin/cp/meta/overview`,
    getSubsCountByPeriod: `${baseUrl}/api/v1/admin/cp/meta/subscribers-count-by-period`
}
const Account = {
    getAccount: `${baseUrl}/api/v1/admin/cp/account`
}
const Activity = {
    getAdminActivities: `${baseUrl}/api/v1/admin/cp/activities`
}

export { Authentication, Misc, Account, Activity }