import { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField ,IconButton } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import AttendanceIcon from "@mui/icons-material/HowToReg";
import AgendaIcon from "@mui/icons-material/Groups";

import image from "../assets/bannariammanheader.png";
import { useNavigate } from "react-router-dom";

export default function StartMeet( { handleBack}) {

    const [status, setStatus] = useState(null);
    const [onStart,setOnStart] = useState(false);
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState("attendance");

return (
        <Box>
            <Box sx={{ display: "flex",alignItems: "center",justifyContent: "space-between",padding: "12px 0",gap:50}}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ display: "flex", padding: "5px", backgroundColor: "white" }}>
                        <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={() => navigate("/dashboardrightpanel")}/>
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                        BOS Meeting
                        <Typography sx={{ fontSize:'12px'}}>
                            SF Board Room 12 Nov,2021 at 9:40 PM
                        </Typography>
                    </Typography>
                </Box>
                { !onStart ? (
                    <Box sx={{ display: "flex",alignItems: "center",gap: 2,padding: "6px",backgroundColor: "white",borderRadius: "8px" }}>
                        <Button
                            variant="outlined"
                            sx={{
                                borderRadius: '8px',
                                textTransform: 'none',
                                fontWeight: 500,
                                padding: '6px 16px',
                                borderWidth: '2px',
                                borderColor:'#FB3748',
                                color: '#FB3748',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                            }}
                            onClick={() => navigate("/dashboardrightpanel")}
                            >
                            <DeleteOutlineIcon sx={{ fontSize: '18px' }} />
                            Cancel Meeting
                        </Button>
                        <Button
                            variant="contained"
                            sx={{borderRadius:'5px',backgroundColor: "#6c757d",textTransform: "none",gap: "8px",
                            "&:hover": { backgroundColor: "#5a6268" },
                            }}
                        >
                            <DescriptionOutlinedIcon sx={{ fontSize: "18px" }} />
                            Edit Points
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                paddingX:'35px',
                                borderRadius: '5px',
                                backgroundColor: "#007bff" ,
                                textTransform: "none",
                                gap: "8px",
                                "&:hover": { backgroundColor: "#0069d9" },
                            }}
                            onClick={() => setOnStart(true)}

                        >
                            <AutoAwesomeOutlinedIcon sx={{ fontSize: "18px" }} />
                            Start Meeting
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, padding: "6px", backgroundColor: "white", borderRadius: "8px" }}>
                        <Button
                            variant="contained"
                            sx={{ width:'250px', backgroundColor: "#FFB547", textTransform: "none", gap: "5px" }}
                            onClick={() => navigate("/dashboardrightpanel")}
                        >
                            <AutoAwesomeOutlinedIcon sx={{ fontSize: "18px" }} />
                            End Meeting
                        </Button>
                    </Box>
                )}
            </Box>
            { onStart && (
                <Box sx={{display:'flex',justifyContent: 'center', alignItems: 'center',borderRadius: 2,padding:'4px',backgroundColor:'white',gap:2,width:'800px', margin: '0 auto',marginBottom:'10px' }}>
                    <Button
                        onClick={() => setSelectedTab("attendance")}
                        sx={{
                        width:'400px',
                        backgroundColor: selectedTab === "attendance" ? "#4285F4" : "transparent",
                        color: selectedTab === "attendance" ? "#fff" : "#666",
                        "&:hover": { backgroundColor: selectedTab === "attendance" ? "#357ae8" : "#f0f0f0" },
                        textTransform: "none",
                        gap:2,
                        transition: "background-color 0.3s, color 0.3s",
                        }}
                    >
                        <AttendanceIcon/>
                        Attendance
                    </Button>
                    <Button
                        onClick={() => setSelectedTab("agenda")}
                        sx={{
                        width:'400px',
                        backgroundColor: selectedTab === "agenda" ? "#4285F4" : "transparent",
                        color: selectedTab === "agenda" ? "#fff" : "#666",
                        "&:hover": { backgroundColor: selectedTab === "agenda" ? "#357ae8" : "#f0f0f0" },
                        textTransform: "none",
                        gap:2,
                        transition: "background-color 0.3s, color 0.3s",
                        borderRadius:'8px'
                        }}
                    >
                        <AgendaIcon/>
                        Agenda
                    </Button>
                </Box>
            )}                 
                <Box sx={{ display: "flex", backgroundColor: "white", justifyContent: "center", alignItems: "center", flexDirection: 'column',width: "90%", margin: "0 auto" , paddingX:'40px' }}>
                    <img src={image} alt="Example" style={{ width: "50%", height: "50%", padding: "10px" }} />
                    <TableContainer sx={{ margin: "auto", mt: 3, border: "1px solid #ddd",borderBottom:'none' }}>
                        <Table sx={{ borderCollapse: "collapse" }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={cellStyle}>Name of the Meeting</TableCell>
                                        <TableCell sx={cellStyle}>
                                            <TextField 
                                            variant="standard" 
                                            placeholder="Ex..8th BoS Meeting"
                                            fullWidth
                                            InputProps={{ disableUnderline: true }} 
                                            />
                                        </TableCell>
                                        <TableCell sx={cellStyle}>Reference Number</TableCell>
                                        <TableCell sx={cellStyle}>
                                            <TextField 
                                            variant="standard" 
                                            placeholder="Auto generate" 
                                            fullWidth 
                                            InputProps={{ 
                                                disableUnderline: true,
                                                sx: { fontStyle: 'italic', color: '#777' }
                                            }} 
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={cellStyle}>Meeting Description</TableCell>
                                        <TableCell colSpan={3} sx={{ ...cellStyle }}>
                                            <TextField
                                            variant="standard"
                                            multiline
                                            fullWidth
                                            placeholder="Ex..Lorem ipsum dolor sit amet consectetur. Arcu vel egestas rutrum in magna semper dolor sem. Bibendum tristique quisque facilisis cursus mus malesuada mattis et erat. Pellentesque sed congue tellus massa aliquam. Augue erat nunc mauris consectetur."
                                            rows={4}
                                            InputProps={{ 
                                                disableUnderline: true,
                                                sx: { fontStyle: 'italic', color: '#555' }
                                            }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={cellStyle}>Repeat Type</TableCell>
                                        <TableCell sx={cellStyle}>
                                            <TextField
                                            placeholder="Ex..Monthly"
                                            variant="standard"
                                            InputProps={{ disableUnderline: true }}
                                            />
                                        </TableCell>

                                        <TableCell sx={cellStyle}>Priority Type</TableCell>
                                        <TableCell sx={cellStyle}>
                                            <TextField
                                            placeholder="Ex..High Priority"
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={cellStyle}>Venue Details</TableCell>
                                        <TableCell sx={cellStyle}>
                                            <TextField 
                                                variant="standard" 
                                                placeholder="Select venue" 
                                                fullWidth 
                                                InputProps={{ 
                                                disableUnderline: true, 
                                                style: { color: "#999" } 
                                                }} 
                                            />
                                        </TableCell>

                                        <TableCell sx={cellStyle}>Date & Time</TableCell>
                                        <TableCell sx={cellStyle}>
                                        <TextField
                                            variant="standard"
                                            placeholder="Select time"
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                        />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                        <TableCell sx={headerStyle}>Roles</TableCell>
                                        <TableCell colSpan={3} sx={headerStyle}>Member list</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell sx={cellStyle}>
                                            <TextField
                                                variant="standard" 
                                                placeholder="Person" 
                                                fullWidth 
                                                InputProps={{ 
                                                disableUnderline: true, 
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell colSpan={3} sx={cellStyle}>
                                        <TextField 
                                            variant="standard" 
                                            placeholder="Select Member" 
                                            fullWidth 
                                            InputProps={{ 
                                            disableUnderline: true, 
                                            }} 
                                        />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                        </Table>
                    </TableContainer>
                    { onStart && selectedTab === 'attendance' ? (
                        <TableContainer sx={{ margin: "auto", border: "1px solid #ddd", borderTop: "none" }}>
                            <Table sx={{ borderCollapse: "collapse" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="5%" sx={{...headerCellStyle,textAlign:'center'}}>S.No</TableCell>
                                        <TableCell width="30%" sx={{...headerCellStyle,textAlign:'center'}}>Name & Designation</TableCell>
                                        <TableCell width="15%" sx={{...headerCellStyle,textAlign:'center'}}>Role</TableCell>
                                        <TableCell width="10%" sx={{...headerCellStyle,textAlign:'center'}}>Attendance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell sx={{ ...cellStyle, textAlign: "center" }}></TableCell>
                                        <TableCell sx={{ ...cellStyle, textAlign: "center" }}></TableCell>
                                        <TableCell sx={{ ...cellStyle, textAlign: "center" }}></TableCell>
                                        <TableCell sx={{ ...cellStyle, textAlign: "center" }}>
                                            <Box sx={{display:'flex',justifyContent:'center',gap:0.5}}>
                                                {status !== "Absent" && (
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            width:'100px',
                                                            color: "green",
                                                            borderColor: "green",
                                                            backgroundColor: "#e6f8e6",
                                                            textTransform: "none",
                                                            borderRadius: "14px",
                                                            fontSize:'10px',
                                                            gap:0.5,
                                                            "&:hover": {
                                                                backgroundColor: "#d4edda",
                                                            },
                                                        }}
                                                        onClick={() => setStatus("Present")}
                                                    >
                                                        Present
                                                    </Button>
                                                )}
                                                {status !== "Present" && (
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            width:'100px',
                                                            color: "red",
                                                            borderColor: "red",
                                                            backgroundColor: "#fdecec",
                                                            textTransform: "none",
                                                            borderRadius: "14px",
                                                            fontSize:'10px',
                                                            gap:0.5,
                                                            "&:hover": {
                                                                backgroundColor: "#f8d7da",
                                                            },
                                                        }}
                                                        onClick={() => setStatus("Absent")}
                                                    >
                                                        Absent
                                                    </Button>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : onStart && selectedTab === 'agenda' ? (
                        <TableContainer sx={{margin: "auto", border: "1px solid #ddd", borderTop: "none" }}>
                            <Table sx={{ borderCollapse: "collapse" }}>
                                <TableHead>
                                    <TableRow>
                                    <TableCell width="5%" sx={{...headerCellStyle,textAlign:'center'}}>S.No</TableCell>
                                    <TableCell width="25%" sx={{...headerCellStyle,textAlign:'center'}}>Points to be Discussed</TableCell>
                                    <TableCell width="20%" sx={{...headerCellStyle,textAlign:'center'}}>Remarks</TableCell>
                                    <TableCell width="10%" sx={{...headerCellStyle,textAlign:'center'}}>Status</TableCell>
                                    <TableCell width="10%" sx={{...headerCellStyle,textAlign:'center'}}>Responsibility</TableCell>
                                    <TableCell width="10%" sx={{...headerCellStyle,textAlign:'center'}}>Deadline</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={cellStyle}></TableCell>
                                        <TableCell sx={{ ...cellStyle, fontWeight: "normal", maxWidth: "300px" }}>
                                        <TextField
                                            variant="standard"
                                            placeholder="Enter discussion topic"
                                            multiline
                                            fullWidth
                                            minRows={1}
                                            maxRows={4}
                                            InputProps={{ 
                                            disableUnderline: true,
                                            sx: { fontSize: '14px',fontWeight:'bold'}
                                            }}
                                            onChange={(e) => {
                                            const updatedPoints = [...discussionPoints];
                                            updatedPoints[index].point = e.target.value;
                                            setDiscussionPoints(updatedPoints);
                                            }}
                                        />
                                        </TableCell>
                                        <TableCell sx={cellStyle}>
                                        <TextField variant="standard" placeholder="Add remarks" fullWidth InputProps={{ disableUnderline: true }} />
                                        </TableCell>

                                        <TableCell sx={{ ...cellStyle, textAlign: "center" }}>
                                            <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',gap:2}}>
                                                {status !== "Not Agree" && status !== "Forward" && (
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            width:'100px',
                                                            color: "green",
                                                            borderColor: "green",
                                                            backgroundColor: "#e6f8e6",
                                                            textTransform: "none",
                                                            borderRadius: "14px",
                                                            fontSize:'10px',
                                                            gap:0.5,
                                                            "&:hover": {
                                                                backgroundColor: "#d4edda",
                                                            },
                                                        }}
                                                        onClick={() => setStatus("Agree")}
                                                    >
                                                        Agree
                                                    </Button>
                                                )}
                                                {status !== "Not Agree" && status !== "Agree" && (
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            width:'100px',
                                                            color: "black",
                                                            borderColor: "black",
                                                            backgroundColor: "#D8DEE2",
                                                            textTransform: "none",
                                                            borderRadius: "14px",
                                                            fontSize:'10px',
                                                            gap:0.5,
                                                        }}
                                                        onClick={() => setStatus("Forward")}
                                                    >
                                                        Forward
                                                    </Button>
                                                )}
                                                {status !== "Agree" && status !== "Forward" && (
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            width:'100px',
                                                            color: "red",
                                                            borderColor: "red",
                                                            backgroundColor: "#fdecec",
                                                            textTransform: "none",
                                                            borderRadius: "14px",
                                                            fontSize:'10px',
                                                            gap:0.5,
                                                            "&:hover": {
                                                                backgroundColor: "#f8d7da",
                                                            },
                                                        }}
                                                        onClick={() => setStatus("Not Agree")}
                                                    >
                                                        Not Agree
                                                    </Button>
                                                )}
                                            </Box>
                                        </TableCell>

                                        <TableCell sx={cellStyle}>
                                        <TextField variant="standard" placeholder="Select Member" fullWidth InputProps={{ disableUnderline: true }} />
                                        </TableCell>
                                        <TableCell sx={cellStyle}>
                                        <TextField variant="standard" placeholder="Select Date" fullWidth 
                                            InputProps={{ disableUnderline: true }} 
                                            readOnly
                                        />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                      </TableContainer>
                    ) : (
                        <TableContainer sx={{ margin: "auto", border: "1px solid #ddd", borderTop: "none" }}>
                        <Table sx={{ borderCollapse: "collapse" }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={headerCellStyle}>S.No</TableCell>
                                    <TableCell sx={headerCellStyle}>Points to be Discussed</TableCell>
                                    <TableCell sx={headerCellStyle}>Todo</TableCell>
                                    <TableCell sx={headerCellStyle}>Status</TableCell>
                                    <TableCell sx={headerCellStyle}>Responsibility</TableCell>
                                    <TableCell sx={headerCellStyle}>Deadline</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={cellStyle}>1</TableCell>
                                    <TableCell sx={{ ...cellStyle, fontWeight: "normal" }}>
                                    <TextField
                                        variant="standard"
                                        placeholder="Points forward"
                                        multiline
                                        fullWidth
                                        minRows={1}
                                        maxRows={4}
                                        InputProps={{ 
                                        disableUnderline: true,
                                        sx: { fontSize: '14px',fontWeight:'bold'}
                                        }}
                                    />
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        <TextField variant="standard" placeholder="Add remarks" fullWidth InputProps={{ disableUnderline: true }}/>
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                        <Box sx={{display:'flex',flexDirection:'column',gap:0.5}}>
                                            {status !== "Not Approve" && (
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        color: "green",
                                                        borderColor: "green",
                                                        backgroundColor: "#e6f8e6",
                                                        textTransform: "none",
                                                        borderRadius: "14px",
                                                        padding: "6px 40px",
                                                        fontSize:'10px',
                                                        gap:0.5,
                                                        "&:hover": {
                                                            backgroundColor: "#d4edda",
                                                        },
                                                    }}
                                                    onClick={() => setStatus("Approve")}
                                                >
                                                    Approve
                                                </Button>
                                            )}
                                            {status !== "Approve" && (
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        color: "red",
                                                        borderColor: "red",
                                                        backgroundColor: "#fdecec",
                                                        textTransform: "none",
                                                        borderRadius: "14px",
                                                        padding: "6px 30px",
                                                        fontSize:'10px',
                                                        gap:0.5,
                                                        "&:hover": {
                                                            backgroundColor: "#f8d7da",
                                                        },
                                                    }}
                                                    onClick={() => setStatus("Not Approve")}
                                                >
                                                    Not Approve
                                                </Button>
                                            )}
                                        </Box>
                                    </TableCell>

                                    <TableCell sx={cellStyle}>
                                    <TextField variant="standard" placeholder="Select Member" fullWidth InputProps={{ disableUnderline: true }} />
                                    </TableCell>
                                    <TableCell sx={cellStyle}>
                                    <TextField variant="standard" placeholder="Select Date" fullWidth 
                                        InputProps={{ disableUnderline: true }} 
                                    />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
    );
}


const cellStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    fontWeight: "bold",
  };

const headerStyle = {
    ...cellStyle,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
};

const headerCellStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
};
