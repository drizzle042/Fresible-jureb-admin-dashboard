// This file contains all the endpoints used in this app to which requests were made
// This is documented in the same exact way it is on the postman docs.
// Due to this, repetitions were made...

// For a full list of all endpoints, 
// visit https://www.postman.com/restless-water-478798/workspace/jureb-api

// Note: every endpoint which is used to implement a filter must be called in 
// a query ready manner 
// eg; "/api/v1/admin/cp/organizations/?" for the organizations endpoint which 
// implements a search bar and select bars. This is to enable the filter handler
// use the endpoint provided because it is expected to be in a query ready manner.
// Do not use "/api/v1/admin/cp/organizations?" leaving out the trailing slash as 
// this has been found to be problematic in IOS 15 an lower versions where the 
// operating system drops the auth header provided if a trailing slash is ommitted.

const baseUrl = process.env.REACT_APP_BACKEND_API_URL

const Authentication = {
    generateAuthTokens: `${baseUrl}/api/v1/admin/auth/auth-tokens`
}
const Misc = {
    getOverview: `${baseUrl}/api/v1/admin/cp/meta/overview`,
    getSubsCountByPeriod: `${baseUrl}/api/v1/admin/cp/meta/subscribers-count-by-period`,
    getPlans: `${baseUrl}/api/v1/admin/cp/meta/plans`
}
const Account = {
    getAccount: `${baseUrl}/api/v1/admin/cp/account`,
    updateProfile: `${baseUrl}/api/v1/admin/cp/account`,
    changePassword: `${baseUrl}/api/v1/admin/cp/account/password-change`
}
const Activity = {
    getAdminActivities: `${baseUrl}/api/v1/admin/cp/activities/admin`,
    getOrgActivities: `${baseUrl}/api/v1/admin/cp/activities/organization`,
    getActivities: `${baseUrl}/api/v1/admin/cp/activities`
}
const Administrators = {
    getAdmins: `${baseUrl}/api/v1/admin/cp/administrators`,
    createAdmin: `${baseUrl}/api/v1/admin/cp/administrators`,
    getAdminsStatusStat: `${baseUrl}/api/v1/admin/cp/administrators/status-stats`,
    activateAdmin: `${baseUrl}/api/v1/admin/cp/administrators/activate`,
    deactivateAdmin: `${baseUrl}/api/v1/admin/cp/administrators/deactivate`
}
const Orgs = {
    getOrganizations: `${baseUrl}/api/v1/admin/cp/organizations`,
    getOrgsByLocation: `${baseUrl}/api/v1/admin/cp/organizations/by-location`,
    getOrganization: `${baseUrl}/api/v1/admin/cp/organizations/single`,
    getOrgInvoices: `${baseUrl}/api/v1/admin/cp/organizations/invoices`,
    getOrgsSubsPeriod: `${baseUrl}/api/v1/admin/cp/organizations/sub-period-stats`,
    getOrgsAdmins: `${baseUrl}/api/v1/admin/cp/organizations/administrators`,
    upgradeOrgSub: `${baseUrl}/api/v1/admin/cp/organizations/subscription/upgrade`,
    cancelOrgSub: `${baseUrl}/api/v1/admin/cp/organizations/subscription/cancel`
}
const Invoice = {
    getInvoices: `${baseUrl}/api/v1/admin/cp/invoices`,
    getInvoicesSubPeriodStat: `${baseUrl}/api/v1/admin/cp/invoices/sub-period-stats`
}
const Users = {
    getUser: `${baseUrl}/api/v1/admin/cp/users/single`
}
const Notification = {
    adminFetchPushNotifications: `${baseUrl}/api/v1/admin/cp/administrators/push-notification/fetch`,
    adminSearchPushNotifications: `${baseUrl}/api/v1/admin/cp/administrators/push-notification/search`,
    createPushNotification: `${baseUrl}/api/v1/admin/cp/administrators/push-notification/create`,
    getCategoryCount: `${baseUrl}/api/v1/admin/cp/administrators/push-notification/category-count`
}

export { 
    Authentication, 
    Misc, 
    Account, 
    Activity, 
    Administrators, 
    Orgs, 
    Invoice, 
    Users,
    Notification
}