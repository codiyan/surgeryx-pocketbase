import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
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

import DropZone from "../../components/DropZone";
import FileUpload from "../../components/FileUpload";
import CountrySelector from "../../components/CountrySelector";
import EditorToolbar from "../../components/EditorToolbar";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { pb } from "../../services/pocketbase";
import Checkbox from "@mui/joy/Checkbox";
import BusinessIcon from "@mui/icons-material/Business";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// fix this issue
import DefaultPic from '../../assets/default-pic.jpg';

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ProceduresRecord } from "../../pocketbase-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



export default function MyProfile() {
  const navigate = useNavigate();
  const [data, setdata] = useState<{
    procedure_details: any[]; // TODO: Replace with ProceduresRecord[]
    status: string;
  }>({
    procedure_details: [],
    status: "new",
  });
  //Write on change function
  const handleChange = (e: any) => {
    console.log(e)
    // if date of birth make it a date string for database
    if (e.target.name === "dob") {
      const date = new Date(e.target.value);

      setdata({ ...data, [e.target.name]: date });
      // console.log(date, d)
    }
    else

      setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(data);
    try {
      const record = await pb.collection("cases").create(data);
      // toast.success("Case added successfully");
      // naviaget to cases
      navigate("/cases");

    }
    catch (err) {
      console.log(err);

    }
  }

  const [Surgery, setSurgery] = useState(false);

  const [procedure, setProcedure] = useState("");
  const [cptCode, setCptCode] = useState("");

  const handleAddProcedure = () => {
    // Only add if both procedure and cptCode are present
    if (procedure && cptCode) {
      const updatedProcedures = [...data.procedure_details, { procedure, cptCode }];
      setdata({ ...data, procedure_details: updatedProcedures });
      setProcedure(""); // Clear procedure input
      setCptCode(""); // Clear CPT code input
    }
  };

  // Function to handle removing a procedure from the data
  const handleRemoveProcedure = (index: any) => {
    const updatedProcedures = [...data.procedure_details];
    updatedProcedures.splice(index, 1);
    setdata({ ...data, procedure_details: updatedProcedures });
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
              Add a case
            </Typography>
          </Breadcrumbs> */}
          <Typography
            level="h2"
            sx={{
              mt: 1,
              mb: 2,
            }}
          >
            Add a new case
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
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Case Information</Typography>
            <Typography level="body-sm">
              Enter details about the case in the fields below.
            </Typography>
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
                  src={DefaultPic}
                  // srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              {/* <IconButton
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
              </IconButton> */}
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <FormControl
                  sx={{
                    width: "90%",
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
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <Input
                    size="sm"
                    name="last_name"
                    placeholder="Last name"
                    sx={{ flexGrow: 1 }}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </FormControl>
              </Stack>
              <Stack sx={{ width: "90%" }} direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="phone_number"
                    onChange={(e) => {
                      handleChange(e);
                    }}
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
              <Stack sx={{ width: "90%" }} direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>SSN</FormLabel>
                  <Input
                    name="ssn"
                    startDecorator={<Grid3x3Icon />}
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
                    type="text"
                    startDecorator={<HomeIcon />}
                    placeholder="St. Address, City, State, Zip Code"
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              </Stack>
              <Stack sx={{ width: "95%" }} direction="row" spacing={2}>
                <FormControl>
                  <FormLabel>Sex</FormLabel>
                  <Select
                    name="sex"
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
                    type="text"
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
                    name="dob"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    slotProps={{
                      input: {
                        min: "2018-06-07T00:00",
                        max: "2018-06-14T00:00",
                      },
                    }}
                  />
                </FormControl>
              </Stack>
              {/* <Stack direction="row" spacing={5}>
                <Checkbox
                  label="Surgery required"
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
                    disabled={!Surgery}
                    size="sm"
                    type="text"
                    startDecorator={<LocalHospitalIcon />}
                    placeholder="Dr.John Doe"
                  />
                </FormControl>
              </Stack>

              <Stack direction="row" spacing={4}>
                <FormControl>
                  <FormLabel>Procedure</FormLabel>
                  <Input
                    sx={{ width: "12rem" }}
                    disabled={!Surgery}
                    size="sm"
                    type="text"
                    value={procedure}
                    onChange={(e) => setProcedure(e.target.value)}
                    startDecorator={<LocalHospitalIcon />}
                    placeholder="Skin Plasty"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>CPT</FormLabel>
                  <Input
                    sx={{ width: "10rem" }}
                    disabled={!Surgery}
                    size="sm"
                    type="text"
                    value={cptCode}
                    onChange={(e) => setCptCode(e.target.value)}
                    startDecorator={<LocalHospitalIcon />}
                    placeholder="12345"
                  />
                </FormControl>
                <Button
                  sx={{
                    height: "2rem",
                    width: "3.5rem",
                    position: "relative",
                    top: "1.6rem",
                  }}
                  size="sm"
                  variant="solid"
                  onClick={handleAddProcedure}
                >
                  add
                </Button>
              </Stack>

              
              {data.procedure_details.map((item: any, index: number) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: "4px",
                    padding: "8px",
                    marginTop: "8px",
                  }}
                >

                  <Typography>{item.procedure} - {item.cptCode}</Typography>
                  <IconButton
                    size="sm"
                    onClick={() => handleRemoveProcedure(index)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Stack>
              ))
              } */}

            </Stack >
          </Stack >
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
                    src={DefaultPic}
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

              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      width: "90%",
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
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                    <Input
                      size="sm"
                      name="last_name"
                      placeholder="Last name"
                      sx={{ flexGrow: 1 }}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </FormControl>
                </Stack>
                <Stack sx={{ width: "90%" }} direction="row" spacing={2}>
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone_number"
                      onChange={(e) => {
                        handleChange(e);
                      }}
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
                <Stack sx={{ width: "90%" }} direction="row" spacing={2}>
                  <FormControl>
                    <FormLabel>SSN</FormLabel>
                    <Input
                      name="ssn"
                      startDecorator={<Grid3x3Icon />}
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
                      type="text"
                      startDecorator={<HomeIcon />}
                      placeholder="St. Address, City, State, Zip Code"
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                </Stack>
                <Stack sx={{ width: "95%" }} direction="row" spacing={2}>
                  <FormControl>
                    <FormLabel>Sex</FormLabel>
                    <Select
                      name="sex"
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
                      type="text"
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
                      slotProps={{
                        input: {
                          min: "2018-06-07T00:00",
                          max: "2018-06-14T00:00",
                        },
                      }}
                    />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={5}>
                  <Checkbox
                    label="Surgery required"
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
                      disabled={!Surgery}
                      size="sm"
                      type="text"
                      startDecorator={<LocalHospitalIcon />}
                      placeholder="Dr.John Doe"
                    />
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={4}>
                  <FormControl>
                    <FormLabel>Procedure</FormLabel>
                    <Input
                      sx={{ width: "12rem" }}
                      disabled={!Surgery}
                      size="sm"
                      type="text"
                      value={procedure}
                      onChange={(e) => setProcedure(e.target.value)}
                      startDecorator={<LocalHospitalIcon />}
                      placeholder="Skin Plasty"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>CPT</FormLabel>
                    <Input
                      sx={{ width: "10rem" }}
                      disabled={!Surgery}
                      size="sm"
                      type="text"
                      value={cptCode}
                      onChange={(e) => setCptCode(e.target.value)}
                      startDecorator={<LocalHospitalIcon />}
                      placeholder="12345"
                    />
                  </FormControl>
                  <Button
                    sx={{
                      height: "2rem",
                      width: "3.5rem",
                      position: "relative",
                      top: "1.6rem",
                    }}
                    size="sm"
                    variant="solid"
                    onClick={handleAddProcedure}
                  >
                    add
                  </Button>
                </Stack>

                {/* Display added procedures with remove button */}
                {data.procedure_details.map((item: any, index: number) => (
                  <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      border: "1px solid",
                      borderColor: "primary.main",
                      borderRadius: "4px",
                      padding: "8px",
                      marginTop: "8px",
                    }}
                  >
                    {/* <Typography>{item.procedure} - {item.cptCode}</Typography> */}
                    <IconButton
                      size="sm"
                      onClick={() => handleRemoveProcedure(index)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Stack >
                ))
                }
                {/* <Box
              sx={{display:"flex",justifyContent:"end"}}
              >
              <Button
              sx={{mr:"4rem"}}
                size="sm"
                variant="solid"
                
              >
                Save
              </Button>
              </Box> */}
              </Stack >


            </Stack >

          </Stack >
          <Box sx={{ mb: 1, mt: 3 }}>
            <Typography level="title-md">Initial Notes</Typography>
            <Typography level="body-sm">
              Write description about the diagnosis in the field below.
            </Typography>
          </Box>
          <Stack spacing={2} sx={{ my: 1 }}>
            <Textarea
              size="sm"
              minRows={4}
              sx={{ mt: 1.5 }}

              name="initial_note"
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Left 1st metatarsal- cuneiform fusion, modified McBride, Akin osteotomy, left 2nd digit hammer toe correction"
            />
            <FormHelperText sx={{ mt: 0.75, fontSize: "xs" }}>
              275 characters left
            </FormHelperText>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              {/* <Button size="sm" variant="outlined" color="neutral">
                Cancel
              </Button> */}
              <Button
                size="sm"
                variant="solid"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card >
      </Stack >
    </Box >
  );
}
