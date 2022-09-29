import { Divider, Grid, IconButton,MenuItem, Select, TextField, Button, Dialog,DialogContent} from "@mui/material";
import EastIcon from '@mui/icons-material/East';
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OrganizationInvoices from "./components/OrganizationInvoices";
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../lib/components/Hooks/useFetch";
import usePut from "../../lib/components/Hooks/usePut";
import usePost from "../../lib/components/Hooks/usePost";
import CloseIcon from "@mui/icons-material/Close";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";

const ViewOrganization = () => {
  const { id } = useParams();
  const { hooksContent } = CustomHook();
  const navigate = useNavigate();
  const [state,setState] = useState({plan:"",period:""})
  const { data, isLoading, error,handleSearchInput:handleSearchInput2 } = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/single?id=${id}`)
  const client = data?.data;
  const {data: invoiceData, handleSearchInput} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/invoices?organizationId=${id}`)
  const {data: plans} = useFetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/meta/plans`)
  const { putFunc } = usePut(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/subscription/cancel`);
  const { postDataFunc } = usePost(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/organizations/subscription/upgrade`);

  const open = (type) =>{
    setState({...state,modal:type})
  }
  const close = () =>{
    setState({...state,modal:null})
  }

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
                        <button className={styles.cancel} onClick={()=>open(1)}>Cancel Plan</button>
                        <button className={styles.upgrade} onClick={()=>open(2)}>
                          Change Plan <IconButton><EastIcon sx={{color: "blue"}}/></IconButton>
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
      
      <Dialog
        // eslint-disable-next-line
        open={state.modal==1}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <div className={styles.dialog_title}>
        <div className={styles.section_title}>
          <div className={styles.header}>
            <h2>Cancel Plan</h2>
          </div>
          <div className={styles.CloseIcon}>
            <IconButton onClick={close}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <DialogContent>
        <div>
          If you cancel this Jureb subscription,the user will lose access to the benefits of this plan. Team member would also not be albe to log into their accounts. Please note that cancellation takes effect at the end of the current subscription.
        </div>
        
        <div className="push-right">
          <Button
            variant="contained" 
            color="secondary"
            onClick={() => {
             // postDataFunc(JSON.stringify(formData), "application/json",handleSearchInput)
             putFunc("",handleSearchInput2,{organizationId:id})
             // close()
            }}>
            Confirm
          </Button>
        </div>
      </DialogContent>
      </Dialog>

      <Dialog
        // eslint-disable-next-line
        open={state.modal==2}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogContent >
        <div>
          

        <div className={[styles.select_bars,"space-top"].join(' ')}>
          <Select
            className={styles.input}
            fullWidth
            size="small"
            value={state?.plan}
            onChange={(e)=>setState({...state,plan:e.target.value})}
            displayEmpty
          >
            <MenuItem disabled value="">
              Select Plan
            </MenuItem>
            {plans?.data?.map((d)=>{
              return  <MenuItem value={d.id}>{d.name}</MenuItem>
            })}
          </Select>
        </div>
        <div className={styles.select_bars}>
          <Select
            className={[styles.input,"space-top"].join(' ')}
            fullWidth
            size="small"
            value={state?.period}
            onChange={(e)=>setState({...state,period:e.target.value})}
            displayEmpty
          >
            <MenuItem disabled value="">
              Period
            </MenuItem>
            <MenuItem value="MONTHLY">Monthly</MenuItem>
            <MenuItem value="QUARTERLY">Quarterly</MenuItem>
            <MenuItem value="BIANNUALLY">Bi-Annually</MenuItem>
            <MenuItem value="ANNUALLY">Annually</MenuItem>
          </Select>
        </div>
        <TextField
                className={[styles.input,"space-top"].join(' ')}
                value={state?.reason}
                onChange={(e)=>setState({...state,reason:e.target.value})}
                fullWidth
                style={{minWidth:'300px'}}
                multiline={true}
                rows={3}
                size="small"
                placeholder="Reason"
              />
        </div>
        
        <div className="push-right space-top">
          <Button
            variant="contained" 
            color="secondary"
            onClick={() => {
             // postDataFunc(JSON.stringify(formData), "application/json",handleSearchInput)
             state.plan.length>0 && state.period.length>0 && open(3)
            }}>
            Confirm
          </Button>
        </div>
      </DialogContent>
      </Dialog>

      <Dialog
        // eslint-disable-next-line
        open={state.modal==3}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <div className={styles.dialog_title}>
        <div className={styles.section_title}>
          <div className={styles.header}>
            <h2>Change Subscription Plan</h2>
          </div>
          <div className={styles.CloseIcon}>
            <IconButton onClick={()=>open(2)}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <DialogContent>
        <div>
          This users plan will change to the selected plan for the duration of the period selected, the user will not be billed for this subscription
        </div>
        
        <div className="push-right space-top">
          <Button
            variant="contained" 
            color="secondary"
            onClick={() => {
              postDataFunc(JSON.stringify(
                {
                  organizationId:id,
                  planId:state.plan,
                  interval:state.period,
                  reason:state.reason
                }
              ), "application/json",handleSearchInput2)
              close()
            }}>
            Confirm
          </Button>
        </div>
      </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ViewOrganization;
