import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import { useParams } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Select from "@mui/joy/Select";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Option from "@mui/joy/Option";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import HomeIcon from "@mui/icons-material/Home";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

import DropZone from "../../../components/DropZone";
import FileUpload from "../../../components/FileUpload";
import CountrySelector from "../../../components/CountrySelector";
import EditorToolbar from "../../../components/EditorToolbar";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { pb } from "../../../services/pocketbase";
import Checkbox from "@mui/joy/Checkbox";
import BusinessIcon from "@mui/icons-material/Business";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ArticleIcon from '@mui/icons-material/Article';
import DefaultPic from '../../../assets/default-pic.jpg'
import { useState } from "react";

interface CaseData {
  first_name: string;
  last_name: string;
  // Add other properties as needed
}

export default function Caseview() {
  const params = useParams();
  const caseId = params.id;
  const [data, setData] = React.useState<any>({});
  const [editMode, setEditMode] = React.useState(false);
  const [Surgery, setSurgery] = useState(false);

  React.useEffect(() => {
    const fetchCaseData = async (caseId: any) => {
      try {
        const record = await pb.collection("cases").getOne(caseId);
        setData(record);
      } catch (error) {
        console.error("Error fetching case data:", error);
      }
    };

    fetchCaseData(caseId);
  }, [caseId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const handleEditModeToggle = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const updateData = async (caseId: any) => {
    try {
      const record = await pb.collection("cases").update(caseId, data);

      console.log("Case updated successfully!");
    } catch (error) {
      console.error("Error updating case:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(data);
    updateData(caseId);
  };

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: {
            sm: -100,
            md: -110,
          },
          bgcolor: "background.body",
          zIndex: 9995,
        }}
      >
        <Box
          sx={{
            px: {
              xs: 2,
              md: 6,
            },
          }}
        >
          {/* <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              view/edit
            </Typography>

          </Breadcrumbs> */}
          <Typography
            level="h2"
            sx={{
              mt: 1,
              mb: 2,
            }}
          >
            Case Details
          </Typography>
        </Box>
      </Box>

      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: {
            xs: 2,
            md: 6,
          },
          py: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Card>
          <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography level="title-md">Case Information</Typography>
              <Typography level="body-sm">
                Enter details about the case in the fields below.
              </Typography>
            </Box>
            <Button
              size="sm"
              variant="outlined"
              color="primary"
              onClick={handleEditModeToggle}
            >
              {/* {editMode ? "Switch to View Mode" : "Switch to Edit Mode"} */}
              {editMode ? <ArticleIcon /> : <EditRoundedIcon />}

            </Button>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ flex: 1, minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  //if data.avatar is null, use default pic
                  src={DefaultPic}
                  // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  // loading="lazy"
                  alt=""
                />
              </AspectRatio>
              {/* {editMode ?
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 100,
                    top: 170,
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
                : <></>} */}
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                >
                  <Input
                    size="sm"
                    name="first_name"
                    placeholder="First name"
                    value={data.first_name}
                    disabled={!editMode}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <Input
                    size="sm"
                    name="last_name"
                    disabled={!editMode}
                    placeholder="Last name"
                    value={data.last_name}
                    sx={{ flexGrow: 1 }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="phone_number"
                    disabled={!editMode}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    value={data.phone_number}
                    startDecorator={<LocalPhoneIcon />}
                    size="sm"
                    placeholder="+1234234234"
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    disabled={!editMode}
                    value={data.email}
                    startDecorator={<EmailRoundedIcon />}
                    name="email"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="johndoe@test.com"
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>SSN</FormLabel>
                  <Input
                    name="ssn"
                    startDecorator={<Grid3x3Icon />}
                    value={data.ssn}
                    disabled={!editMode}
                    size="sm"
                    placeholder="1234234234"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Address</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    disabled={!editMode}
                    startDecorator={<HomeIcon />}
                    placeholder="St. Address, City, State, Zip Code"
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Sex</FormLabel>
                  <Select
                    name="sex"
                    value={data.sex}
                    disabled={!editMode}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Male/Female"
                    required
                    size="sm"
                    sx={{ minWidth: 200 }}
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>Facility</FormLabel>
                  <Input
                    size="sm"
                    type="email"
                    disabled={!editMode}
                    startDecorator={<BusinessIcon />}
                    placeholder="St. Address, City, State, Zip Code"
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={5}>
                <FormControl size={"md"}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    size="sm"
                    type="date"
                    // value is coming like this "2023-11-07 00:00:00.000Z" how to show it


                    disabled={!editMode}
                    value={data.dob instanceof Date ? data.dob.toISOString().split("T")[0] : ""}
                    name="dob"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    slotProps={{
                      input: {
                        max: new Date().toISOString().split("T")[0],
                      },

                    }}
                  />
                </FormControl>
                {/* <FormControl>
                  <FormLabel>Time</FormLabel>
                  <Input disabled={!editMode} type="time" size="sm" />
                </FormControl> */}
              </Stack>
              {/* <Stack direction="row" spacing={5}>
                <Checkbox
                  label="Surgery required"
                  disabled={!editMode}
                  variant="outlined"
                  size="sm"
                  onChange={(e) => {
                    setSurgery(e.target.checked);
                  }}
                  sx={{ position: "relative", top: 30 }}
                />
                <FormControl>
                  <FormLabel>Surgeon Assigned</FormLabel>
                  <Input
                    //   disabled={!Surgery}
                    disabled={!editMode || !Surgery}
                    size="sm"
                    type="email"
                    startDecorator={<LocalHospitalIcon />}
                    placeholder="Dr.John Doe"
                  />
                </FormControl>
              </Stack> */}

            </Stack>
          </Stack>
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <AspectRatio
                  ratio="1"
                  maxHeight={108}
                  sx={{ flex: 1, minWidth: 108, borderRadius: "100%" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                    srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <IconButton
                  aria-label="upload new picture"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    position: "absolute",
                    zIndex: 2,
                    borderRadius: "50%",
                    left: 85,
                    top: 180,
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </Stack>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    display: {
                      sm: "flex-column",
                      md: "flex-row",
                    },
                    gap: 2,
                  }}
                >
                  <Input size="sm" placeholder="First name" />
                  <Input size="sm" placeholder="Last name" />
                </FormControl>
              </Stack>
            </Stack>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Input size="sm" defaultValue="UI Developer" />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>Email</FormLabel>
              <Input
                size="sm"
                type="email"
                startDecorator={<EmailRoundedIcon />}
                placeholder="email"
                defaultValue="siriwatk@test.com"
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
            <div>
              <CountrySelector />
            </div>
            <div>
              <FormControl sx={{ display: { sm: "contents" } }}>
                <FormLabel>Timezone</FormLabel>
                <Select
                  size="sm"
                  startDecorator={<AccessTimeFilledRoundedIcon />}
                  defaultValue="1"
                >
                  <Option value="1">
                    Indochina Time (Bangkok){" "}
                    <Typography textColor="text.tertiary" ml={0.5}>
                      — GMT+07:00
                    </Typography>
                  </Option>
                  <Option value="2">
                    Indochina Time (Ho Chi Minh City){" "}
                    <Typography textColor="text.tertiary" ml={0.5}>
                      — GMT+07:00
                    </Typography>
                  </Option>
                </Select>
              </FormControl>
            </div>
          </Stack>
          <Box sx={{ mb: 1, mt: 3 }}>
            <Typography level="title-md">Procedure Description</Typography>
            <Typography level="body-sm">
              Write description about the procedure in the field below.
            </Typography>
          </Box>
          <Stack spacing={2} sx={{ my: 1 }}>
            <Textarea
              disabled={!editMode}
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              placeholder="Left 1st metatarsal- cuneiform fusion, modified McBride, Akin osteotomy, left 2nd digit hammer toe correction"
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <Box sx={{ mb: 1, mt: 3 }}>
            <Typography level="title-md">Insurance Details</Typography>
            <Typography level="body-sm">
              Write description about the procedure in the field below.
            </Typography>
          </Box>
          <Stack spacing={2} sx={{ my: 1 }}>
            <Textarea
              disabled={!editMode}
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}
              placeholder="Insurance company name, policy number, etc."
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              {editMode ? (
                <>
                  <Button size="sm" variant="outlined" color="neutral">
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Box sx={{ display: 'none' }}>
                  {/* Hidden when not in edit mode */}
                  <Button size="sm" variant="outlined" color="neutral">
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                  >
                    Save
                  </Button>
                </Box>
              )}
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}