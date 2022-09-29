import React, { useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Slide from "@mui/material/Slide";
import { Editor } from "react-draft-wysiwyg";
import usePost from "../../../../lib/components/Hooks/usePost";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Button,
  Checkbox,
  Collapse,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import uploadImage from "../../assets/upload.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const names = [
  { title: "In App", value: "IN_APP" },
  { title: "Email", value: "EMAIL" },
  { title: "Sms", value: "SMS" },
  { title: "Push", value: "PUSH" },
];
// ];
const recipients = [
  { title: "Employees", value: "EMPLOYEE" },
  { title: "Organizations", value: "ORGANIZATION" },
];

const NewMessage = ({
  styles,
  open,
  handleClose,
  messageData,
  openWebMessage,
  hooksContent,
}) => {
  const { filterData } = hooksContent;
  const imageRef = useRef();
  const { postFormData } = usePost(`${process.env.REACT_APP_BACKEND_API_URL}/api/v1/admin/cp/administrators/push-notification/create`);



const submitData = () =>{
  let messageType=(hooksContent.messageType+"").split(',')
  let recepient=(hooksContent.recipients+"").split(',')
  let d = new FormData();
  d.append('title', hooksContent.messageTitle);
  //d.append('deliveryTypes', (hooksContent.messageType+"").split(','));
  messageType.forEach((item) => d.append("deliveryTypes[]", item))
  recepient.forEach((item) => d.append("recipients[]", item))
  d.append('message', hooksContent.messageTitle);
  d.append('dateTime', hooksContent.messageDate);
  d.append('scheduled', true);
  d.append('image', hooksContent.image);
  console.log(d.getAll("deliveryTypes[]"))
  
  //d.append('image', files[0]);
  
  console.log("S",d)
  
  postFormData(d,handleClose)
}

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <div className={styles.dialog_title}>
        <div className={styles.section_title}>
          <div className={styles.header}>
            <h2>New Message</h2>
            <p>Send messages to users on the Jureb Platform</p>
          </div>
          <div className={styles.CloseIcon}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <DialogContent>
        <div className={styles.dialog_content}>
          <div className={styles.form_group}>
            <div className={styles.input_field}>
              <label>Title</label>
              <TextField
                className={styles.input}
                value={hooksContent?.messageTitle}
                onChange={hooksContent?.handleChange(filterData.messageTitle)}
                fullWidth
                size="small"
                placeholder="Enter Text Here..."
              />
            </div>
            <div className={styles.input_field}>
              <label>Recipients</label>
              <Select
                className={styles.input}
                fullWidth
                size="small"
                value={hooksContent?.recipients}
                onChange={hooksContent?.handleChange(filterData.recipients)}
                displayEmpty
              >
                <MenuItem disabled value="">
                  Status
                </MenuItem>
                {recipients?.map((item, index) => (
                  <MenuItem key={index} value={item?.value}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className={styles.form_group}>
            <div className={styles.input_field}>
              <label>Delivery Type</label>
              <Select
                multiple
                value={hooksContent.deliveryType}
                onChange={hooksContent.selectType}
                renderValue={(selected) => selected.join(", ").toLowerCase().replace('_',' ')}
                displayEmpty
                fullWidth
                size="small"
              >
                <MenuItem disabled value="">
                  Status
                </MenuItem>
                {names.map((name) => (
                  <MenuItem
                    style={{ paddingTop: 0, paddingBottom: 0 }}
                    key={name?.value}
                    value={name?.value}
                  >
                    <Checkbox
                      size="small"
                      checked={hooksContent.deliveryType.indexOf(name.value) > -1}
                    />
                    {name?.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className={styles.form_group}>
            <div className={styles.input_field}>
              <label>Date</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  value={hooksContent.messageDate}
                  onChange={(e) => hooksContent.setMessageDate(e)}
                  renderInput={(params) => (
                    <TextField
                      className={styles.input}
                      fullWidth
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className={styles.input_field}>
              <label>Time</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={hooksContent.messageTime}
                  onChange={(e) => hooksContent.setMessageTime(e)}
                  renderInput={(params) => (
                    <TextField fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className={styles.form_group}>
            <div className={styles.editor_wrapper}>
              <label>
                Message <span>(120 character limit)</span>
              </label>
              <div className={styles.editor}>
                <Editor
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "fontFamily",
                      "list",
                      "textAlign",
                      "colorPicker",
                      "link",
                    ],
                  }}
                  // toolbarHidden={true}
                  editorState={hooksContent.editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={hooksContent.handleEditorChange}
                />
              </div>
            </div>
          </div>
          <div className={styles.input_image_field}>
            <label>Image</label>
            <div className={styles.image_wrapper}>
              <input
                type="file"
                style={{ display: "none" }}
                ref={imageRef}
                accept=".png, .jpg, .jpeg, .gif"
                onChange={hooksContent.onImageChange}
              />
              {hooksContent.image?.length <= 0 ? (
                <>
                  <button onClick={() => imageRef.current.click()}>
                    <img src={uploadImage} alt="Upload" />
                  </button>
                  <p
                    className={styles.p}
                    onClick={() => imageRef.current.click()}
                  >
                    Upload Image
                  </p>
                  <p className={styles.fade}>PNG, JPG, GIF up to 5MB</p>
                </>
              ) : (
                <p
                  className={styles.p}
                  onClick={() => imageRef.current.click()}
                >
                  Change Image
                </p>
              )}
              <Collapse in={hooksContent.image?.length <= 0 ? false : true}>
                <img
                  className={styles.user_image}
                  src={hooksContent.imageUrl}
                  alt=""
                />
              </Collapse>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions style={{ padding: "16px" }}>
        {/* <>{ReactHtmlParser(messageData.text)}</> */}
        <Button variant="outlined" onClick={openWebMessage}>
          See Preview
        </Button>
        <Button variant="contained" color="secondary" onClick={() => {
         
          submitData()
          // postDataFunc(postData)
          }}>
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMessage;
