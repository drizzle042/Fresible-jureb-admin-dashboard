import { Divider, Grid, IconButton } from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OrganizationInvoices from "./components/OrganizationInvoices";
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../lib/components/Hooks/useFetch";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";

const ViewOrganization = () => {
  const { id } = useParams();
  const { hooksContent } = CustomHook();
  const navigate = useNavigate();

  const { data, isLoading, error } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/single?id=${id}`)
  const client = data?.data;
  const {data: invoiceData, handleSearchInput} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/invoices?organizationId=${id}`)

  return (
    <Layout>
      <main className={styles.main}>
        {isLoading && <LoaderComponent />}
        {error && <FetchError error={error}/>}
        {client &&
        <div>
          <div>
            <IconButton onClick={() => navigate(-1)}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <div className={styles.section_title}>
              <h2>{client?.name}</h2>
              <p>Get insights to accounts on jureb here</p>
            </div>
            <section style={{ marginTop: 24 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4} lg={5}>
                  <div className={styles.payment_info}>
                    <div className={styles.title}>
                      <div>{client?.subscription?.planName}</div>
                      <div
                        className={
                          client?.subscription?.status === "ACTIVE"
                            ? styles.status_active
                            : client?.subscription?.status === "EXPIRED"
                            ? styles.status_expired
                            : ""
                        }
                      >
                        {String(client?.subscription?.status).toLowerCase()}
                      </div>
                    </div>
                    <div className={styles.payment_details}>
                      <ul>
                        <li>
                          Billed:<span className={styles.active}> {String(client?.subscription?.billingInterval)?.toLowerCase()}</span>
                        </li>
                        <li>
                          Active Users:<span>{
                            // eslint-disable-next-line
                            client?.membersCount <= 1
                            ? client?.membersCount + " member"
                            : client?.membersCount + " members"}</span>
                        </li>
                        <li>
                          Subscription Date:
                          <span>
                            {new Date(client?.subscription?.startAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </span>
                        </li>
                        <li>
                          Due Date:
                          <span>
                            {new Date(client?.subscription?.endAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.sub_action_wrapper}>
                      <Divider />
                      <div className={styles.sub_action}>
                        <button className={styles.cancel}>Cancel Plan</button>
                        <button className={styles.upgrade}>
                          Upgrade Plan <IconButton><EastIcon sx={{color: "blue"}}/></IconButton>
                        </button>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <div className={styles.org_details}>
                      <span>Date Created:</span>
                      <span>
                        {new Date(client?.createdAt).toLocaleDateString(
                          "en-GB"
                        )}
                      </span>
                    </div>
                    <div className={styles.org_details}>
                      <span>Admin Name:</span>
                      <span>{client?.owner?.lastName} {client?.owner?.firstName}</span>
                    </div>
                    <div className={styles.org_details}>
                      <span>Billing Address:</span>
                      {client?.address &&
                      <span>{client?.address?.houseNo} {client?.address?.street}, {client?.address?.city}, {client?.address?.lga}, {client?.address?.state}, {client?.address?.country}.</span>}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <div className={styles.org_details}>
                      <span>Email:</span>
                      <a href={`mailto:${client?.owner?.email}`} style={{ color: "blue" }}>{client?.owner?.email}</a>
                    </div>
                    <div className={styles.org_details}>
                      <span>Organization ID:</span>
                      <span>{client?.id}</span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </section>
            <section style={{ marginTop: 24 }}>
              <OrganizationInvoices hooksContent={hooksContent} styles={styles} invoiceData={invoiceData} handleSearchInput={handleSearchInput} clientID={id}/>
            </section>
          </div>
        </div>
        }
      </main>
    </Layout>
  );
};

export default ViewOrganization;
