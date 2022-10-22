import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import EastIcon from '@mui/icons-material/East';
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OrganizationInvoices from "./components/OrganizationInvoices";
import CustomHook from "./useCustomHook/CustomHook";
import useFetch from "../../lib/components/Hooks/Requests/useFetch";
import usePost from "../../lib/components/Hooks/Requests/usePost";
import { Orgs, Misc } from "../../lib/components/Endpoints/Endpoints";
import LoaderComponent from "../../lib/components/LoaderComponent/Loader";
import FetchError from "../../lib/components/Hooks/FetchError";
import CloseIcon from "@mui/icons-material/Close";
import Feedback from "../../lib/components/Feedback/Feedback";

const ViewOrganization = () => {

  const { id } = useParams();

  const { hooksContent } = CustomHook();

  const navigate = useNavigate();

  // Why call this state? I also have the same question for the last developer.
  const [state, setState] = useState({
    plan: "",
    period: "",
    reason: ""
  })

  const open = (type) =>{
    setState({
      ...state, 
      modal: type
    })
  }
  const close = () =>{
    setState({
      ...state, 
      modal: null
    })
  }

  const { data, isLoading, error, fetchData } = useFetch(`${Orgs.getOrganization}/?id=${id}`)
  const client = data?.data;
  
  const {data:plans} = useFetch(Misc.getPlans)

  const [postDependencies, setPostDependencies] = useState({
    postData: {},
    postEndpoint: ""
  })

  const { 
    postFunc, 
    message, 
    messageSeverity, 
    isLoading:postIsLoading 
  } = usePost(postDependencies.postEndpoint);

  const initialRender = useRef(true) 
  useEffect(() => {
    if (initialRender.current){
      initialRender.current = false
    } else {
      postFunc("POST", "application/json", JSON.stringify(postDependencies.postData))
    }
    // eslint-disable-next-line
  }, [postDependencies])

  const [openSnackBar, setOpenSnackBar] = useState(false)
  function closeSnackBar(){
    setOpenSnackBar(false)
  }
  const [feedBackMessage, setFeedBackMessage] = useState("")

  useEffect(() => {
    if (message?.message){
      setOpenSnackBar(true)
      setFeedBackMessage(message?.message)
    } else if (message?.status === "SUCCESS"){
      setOpenSnackBar(true)
      setFeedBackMessage(message?.status)
      setTimeout(() => fetchData(), 2000)
    }
    // eslint-disable-next-line
  }, [message])

  return (
    <Layout>
      <main className={styles.main}>
        <IconButton onClick={() => navigate(-1)}>
          <KeyboardBackspaceIcon />
        </IconButton>
        {postIsLoading && <LoaderComponent />}
        {isLoading && <LoaderComponent />}
        {error && <FetchError error={error.message}/>}
        {client &&
        <div>
          <div>
            <div className={styles.section_title}>
              <h2>{client?.name}</h2>
              <p>Get insights to accounts on jureb here</p>
            </div>
            <section style={{ marginTop: 24 }}>
              <Grid container spacing={4}>
              {Object.keys(client?.subscription).length !== 0 ?
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
                        <button className={styles.cancel} onClick={()=>open("cancel")}>Cancel Plan</button>
                        <button className={styles.upgrade} onClick={()=>open("upgrade")}>
                          Change Plan <IconButton><EastIcon sx={{color: "blue"}}/></IconButton>
                        </button>
                      </div>
                    </div>
                  </div>
                </Grid> :
                <Grid item xs={12} sm={6} md={4} lg={5}>
                  <div className={styles.payment_info} style={{backgroundColor: "rgb(255, 255, 255, 50%)"}}>
                    <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center"}}>
                      <h1 style={{display: "inline", textAlign: "center"}}>No Subscription</h1>
                    </div>
                    <div className={styles.sub_action_wrapper}>
                      <Divider />
                      <div className={styles.sub_action} style={{backgroundColor: "#fff"}}>
                        <button className={styles.cancel} onClick={() => open("cancel")}>Cancel Plan</button>
                        <button className={styles.upgrade} onClick={() => open("upgrade")}>
                          Change Plan <IconButton><EastIcon sx={{color: "blue"}}/></IconButton>
                        </button>
                      </div>
                    </div>
                  </div>
                </Grid>
              }
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
              <OrganizationInvoices hooksContent={hooksContent} styles={styles} clientID={id}/>
            </section>
          </div>
        </div>
        }
      </main>
      
      <Dialog
        open={state.modal === "cancel"}
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
            If you cancel this Jureb subscription, the user will lose access to the benefits of this plan. Team members would also not be able to log into their accounts. Please note that cancellation takes effect at the end of the current subscription.
          </div>
          <div className="push-right">
            <Button
              variant="contained" 
              color="secondary"
              onClick={() => {
                setPostDependencies({
                  ...postDependencies,
                  postData: {
                  organizationId: id,
                  },
                  postEndpoint: Orgs.cancelOrgSub
                })
                close()
              }}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={state.modal === "upgrade"}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent >
          <div>
          <div className={[styles.select_bars, "space-top"].join(' ')}>
            <Select
              className={styles.input}
              fullWidth
              size="small"
              value={state?.plan}
              onChange={(e) => setState({
                ...state,
                plan: e.target.value
              })}
              displayEmpty
            >
              <MenuItem disabled value="">
                Select Plan
              </MenuItem>
              {plans?.data?.map((d, index)=>{
                return  <MenuItem key={index} value={d.id}>{d.name}</MenuItem>
              })}
            </Select>
          </div>
          <div className={styles.select_bars}>
            <Select
              className={[styles.input, "space-top"].join(' ')}
              fullWidth
              size="small"
              value={state?.period}
              onChange={(e) => setState({
                ...state,
                period: e.target.value
              })}
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
              className={[styles.input, "space-top"].join(' ')}
              value={state?.reason}
              onChange={(e)=> setState({
                ...state, 
                reason: e.target.value
              })}
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
              state.plan.length > 0 && state.period.length > 0 && open("confirm upgrade")
              }}>
                Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={state.modal === "confirm upgrade"}
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
              <IconButton onClick={() => open("upgrade")}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
        </div>
        <DialogContent>
          <div>
            This user's plan will change to the selected plan for the duration of the period selected. This user will not be billed for this subscription during this duration.
          </div>
          
          <div className="push-right space-top">
            <Button
              variant="contained" 
              color="secondary"
              onClick={() => {
                setPostDependencies({
                  ...postDependencies,
                  postData: {
                    organizationId: id,
                    planId: state.plan,
                    interval: state.period,
                    reason: state.reason
                  },
                  postEndpoint: Orgs.upgradeOrgSub
                })
                close()
              }}>
                Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Feedback 
        severity={messageSeverity} 
        message={feedBackMessage}
        open={openSnackBar}
        handleClose={closeSnackBar} />
    </Layout>
  );
};

export default ViewOrganization;
