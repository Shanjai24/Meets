import { useEffect,useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, IconButton, Card, Chip ,Select, MenuItem } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DvrOutlinedIcon from "@mui/icons-material/DvrOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from "@mui/icons-material/Close";
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useNavigate } from "react-router-dom";
import { MdDragIndicator } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

import image from "../assets/bannariammanheader.png";
import VenueTable from "../components/venue";
import DatePick from "../components/date";
import DateTimePicker from "../components/datetime";
import RepeatOverlay from "../components/RepeatOverlay.jsx";
import crt from "../assets/Featured icon.png";

const Submit = () => {
  return (
    <Card sx={{borderRadius: "12px", boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", maxWidth: 400, padding: "16px"}}>
      <img src={crt} alt="Success" style={{ width: 50, height: 50}}/>
      <Box>
        <Typography sx={{ fontWeight: "bold", fontSize: "18px", marginTop:'10px' }}>
          Meeting initiated
        </Typography>
        <Typography sx={{ color: "#64748B", fontSize: "16px", marginTop:'15px'}}>
          Created successfully members got notified the meeting.
        </Typography>
      </Box>
    </Card>
  );
};

export default function Cmeeting({ onBack,selectedMeeting }) {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false); // Add this state

  const handleBack = () => {
    navigate('/dashboardrightpanel');
  };

  const handlePreview = () => {
    setIsPreview(!isPreview); // Toggle preview mode
  };

  // Card 
  const [openSubmitCard, setOpenSubmitCard] = useState(false);
  const handleInitiateMeeting = () => {
    setOpenSubmitCard(true);
    setTimeout(() => {
      navigate('/dashboardrightpanel');
    }, 3000);
  };

  // Priority 
  const priorityTypes = ["High Priority", "Medium Priority", "Low Priority"];
  const [selectedPriority, setSelectedPriority] = useState(null);

  // Venue 
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isVenueTableVisible, setIsVenueTableVisible] = useState(false);
  const handleTextFieldClick = () => setIsVenueTableVisible(true);
  const handleCloseVenueTable = () => setIsVenueTableVisible(false);
  const handleVenueSelect = (venue) => {
    setSelectedVenue(venue);
    setIsVenueTableVisible(false);
  };

  // Discussion points 
  const [discussionPoints, setDiscussionPoints] = useState([
    { id: "01", point: "" }
  ]);

  const handleAddTopic = () => {
    const newId = String(discussionPoints.length + 1).padStart(2, "0");
    const newPoint = { id: newId, point: "" };
    setDiscussionPoints([...discussionPoints, newPoint]);
  };

  // Datetime 
  const [openDatetime, setOpenDatetime] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const handleConfirm = (dateTime) => {
    setSelectedDateTime(dateTime);
    setOpenDatetime(false);
  };

  // Date 
  const [selectedDate, setSelectedDate] = useState({});
  const [openDateIndex, setOpenDateIndex] = useState(null);
  const handleDateConfirm = (date, index) => {
    setSelectedDate((prev) => ({ ...prev, [index]: date.format("YYYY-MM-DD") }));
    setOpenDateIndex(null);
  };

  // Repeat 
  const [openRepeat, setOpenRepeat] = useState(false);
  const [repeatValue, setRepeatValue] = useState("");

  // Member list functionality
  const [roles, setRoles] = useState([
    { role: '', members: [] }
  ]);
  const handleRoleChange = (index, field, value) => {
    const newRoles = [...roles];
    newRoles[index][field] = value;
    setRoles(newRoles);
  };
  const handleMemberChange = (index, newValue) => {
    const newRoles = [...roles];
    newRoles[index].members = newValue;
    setRoles(newRoles);
  };
  const addNewRole = () => {
    setRoles(prev => [...prev, { role: '', members: [] }]);
  };
  
  const memberSelectionCell = (role, index) => (
    <TableCell colSpan={3} sx={cellStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Autocomplete
          multiple
          value={role.members}
          onChange={(event, newValue) => handleMemberChange(index, newValue)}
          options={allMembers}
          getOptionLabel={(option) => `${option.name} | ${option.role}`}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionDisabled={(option) => 
            roles.some((r, i) => i !== index && r.members.some(m => m.id === option.id))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder={role.members.length === 0 ? "Search members..." : ""}
              sx={styles.memberSelection.autocomplete}
              disabled={isPreview} // Disable in preview mode
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((member, memberIndex) => (
              <Box
                key={member.id}
                sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  borderRadius: "20px",
                  bgcolor: "#f0f8ff", 
                  padding: "6px 12px",
                  width: "fit-content" 
                }}
              >
                <Typography sx={{ color: "#175CD3", fontSize: "12px" }}>
                  {member.name} | {member.role}
                </Typography>
                <IconButton
                  sx={{
                    border: "2px solid #FB3748",
                    borderRadius: "50%",
                    p: "2px",
                    marginLeft: "5px",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                  {...getTagProps({ index: memberIndex })}
                  onClick={() => {
                    const newMembers = role.members.filter((_, i) => i !== memberIndex);
                    handleMemberChange(index, newMembers);
                  }}
                  disabled={isPreview} // Disable in preview mode
                >
                  <CloseIcon sx={{ fontSize: "8px", color: "#FB3748" }} />
                </IconButton>
              </Box>
            ))
          }
          
          renderOption={(props, option, { selected }) => (
            <li
              {...props}
              style={{
                ...props.style,
                opacity: roles.some((r, i) => 
                  i !== index && r.members.some(m => m.id === option.id)
                ) ? 0.5 : 1,
                backgroundColor: selected ? '#e8f4ff' : 'transparent',
              }}
            >
              <Box sx={styles.memberSelection.option}>
                <Typography sx={{ fontWeight: 500 }}>{option.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {option.role} • {option.department}
                </Typography>
              </Box>
            </li>
          )}
          filterOptions={(options, { inputValue }) => {
            const searchTerm = inputValue.toLowerCase();
            return options.filter(option => 
              option.name.toLowerCase().includes(searchTerm) ||
              option.role.toLowerCase().includes(searchTerm) ||
              option.department.toLowerCase().includes(searchTerm)
            );
          }}
          sx={{ flex: 1 }}
          disabled={isPreview} // Disable in preview mode
        />
        {!isPreview && ( // Conditionally render action buttons
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box component="span" sx={{...actionButtonStyle, cursor: 'grab'}}>
              <MdDragIndicator size={18} />
            </Box>
            <Box 
              component="span" 
              sx={{
                ...actionButtonStyle,
                '&:hover': {
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626'
                }
              }}
              onClick={() => deleteRole(index)}
            >
              <FiTrash2 size={16} />
            </Box>
          </Box>
        )}
      </Box>
    </TableCell>
  );
  
  const getAlphabeticalIndex = (index) => {
    return String.fromCharCode(97 + index) + ".";
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (index, type) => {
    if (dragItem && dragItem.type === type) {
      setDragOverItem(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const [dragItem, setDragItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const handleRoleDragStart = (index) => {
    setDragItem({ type: 'role', index });
  };

  const handlePointDragStart = (index) => {
    setDragItem({ type: 'point', index });
  };

  const handleDrop = (index, type) => {
    if (!dragItem || dragItem.type !== type) return;

    if (type === 'role') {
      const items = [...roles];
      const draggedItem = items[dragItem.index];
      items.splice(dragItem.index, 1);
      items.splice(index, 0, draggedItem);
      setRoles(items);
    } else {
      const items = [...discussionPoints];
      const draggedItem = items[dragItem.index];
      items.splice(dragItem.index, 1);
      items.splice(index, 0, draggedItem);
      items.forEach((item, idx) => {
        item.id = String(idx + 1).padStart(2, '0');
      });
      setDiscussionPoints(items);

      const newSelectedDate = { ...selectedDate };
      const draggedDate = newSelectedDate[dragItem.index];
      newSelectedDate[dragItem.index] = newSelectedDate[index];
      newSelectedDate[index] = draggedDate;
      setSelectedDate(newSelectedDate);
    }
    setDragItem(null);
    setDragOverItem(null);
  };

  const deleteRole = (index) => {
    setRoles(roles.filter((_, idx) => idx !== index));
  };

  const deletePoint = (index) => {
    const newPoints = discussionPoints.filter((_, idx) => idx !== index);
    newPoints.forEach((point, idx) => {
      point.id = String(idx + 1).padStart(2, '0');
    });
    setDiscussionPoints(newPoints);
  };

  const allMembers = [
    { id: 1, name: 'Dr. Rajesh Kumar', role: 'HOD', department: 'CSE' },
    { id: 2, name: 'Dr. Priya Sharma', role: 'Professor', department: 'IT' },
    { id: 3, name: 'Dr. Anand Singh', role: 'Dean', department: 'ECE' },
    { id: 4, name: 'Dr. Mary Johnson', role: 'HOD', department: 'MECH' },
    { id: 5, name: 'Dr. David Wilson', role: 'Principal', department: 'ADMIN' },
  ];

  const styles = {
    memberSelection: {
      chip: {
        margin: '2px',
        backgroundColor: '#e8f4ff',
        color: '#1967D2',
        borderRadius: '20px',
        border: '1px solid #bfdbfe',
        '& .MuiChip-label': {
          fontSize: '13px',
          fontWeight: 500,
        },
        '& .MuiChip-deleteIcon': {
          color: '#FC7A85',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: '#EF4444'
          }
        },
        '&:hover': {
          backgroundColor: '#d1e9ff'
        }
      },
      autocomplete: {
        '& .MuiOutlinedInput-root': {
          padding: '4px 8px',
          '& fieldset': { border: 'none' },
          '&:hover fieldset': { border: 'none' },
          '&.Mui-focused fieldset': { border: 'none' }
        },
        '& .MuiAutocomplete-endAdornment': {
          '& .MuiButtonBase-root': {
            color: '#1967D2',
          },
        },
        '& .MuiAutocomplete-clearIndicator': {
          color: '#FC7A85',
          '&:hover': {
            color: '#EF4444'
          }
        }
      },
      option: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }
    }
  };

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const [priorityType, setPriorityType] = useState("");

  const handleMeetingChange = (field, value) => {
    if (field === 'priorityType') {
      setPriorityType(value);
    }
    // ...handle other fields if necessary...
  };

  const memberSelectionCellSimple = (index) => (
    <TableCell sx={cellStyle}>
      {discussionPoints[index].responsibility?.length > 0 ? (
        <Box
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", // Center the text
            borderRadius: "20px",
            bgcolor: "#f0f8ff", 
            padding: "6px 12px",
            width: "100%", // Ensure the box takes full width
            textAlign: "center" // Center the text inside the box
          }}
        >
          <Typography sx={{ color: "#175CD3", fontSize: "12px" }}>
            {discussionPoints[index].responsibility[0].name}
          </Typography>
          <IconButton
            sx={{
              border: "2px solid #FB3748",
              borderRadius: "50%",
              p: "2px",
              marginLeft: "5px",
              "&:hover": { backgroundColor: "transparent" },
            }}
            onClick={() => {
              const updatedPoints = [...discussionPoints];
              updatedPoints[index].responsibility = [];
              setDiscussionPoints(updatedPoints);
            }}
            disabled={isPreview} // Disable in preview mode
          >
            <CloseIcon sx={{ fontSize: "8px", color: "#FB3748" }} />
          </IconButton>
        </Box>
      ) : (
        <Autocomplete
          value={discussionPoints[index].responsibility?.[0] || null}
          onChange={(event, newValue) => {
            const updatedPoints = [...discussionPoints];
            updatedPoints[index].responsibility = newValue ? [newValue] : [];
            setDiscussionPoints(updatedPoints);
          }}
          options={allMembers}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Select member"
              sx={styles.memberSelection.autocomplete}
              disabled={isPreview} // Disable in preview mode
            />
          )}
          filterOptions={(options, { inputValue }) => {
            const searchTerm = inputValue.toLowerCase();
            return options.filter(option => 
              option.name.toLowerCase().includes(searchTerm)
            );
          }}
          sx={{ flex: 1 }}
          disabled={isPreview} // Disable in preview mode
        />
      )}
    </TableCell>
  );

  return (
      <Box>

        {/* top buttons */}
        <Box sx={{ display: "flex",alignItems: "center",justifyContent: "space-between",padding: "12px 0"}}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ display: "flex", padding: "5px", backgroundColor: "white" }}>
              <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={handleBack}/>
            </Box>
            <Typography variant="h6" fontWeight="bold">
              Create meeting
            </Typography>
          </Box>

          <Box sx={{ display: "flex",alignItems: "center",gap: 1,padding: "6px",backgroundColor: "white",borderRadius: "8px",marginRight:'60px' }}>
            <Button variant="outlined" 
              sx={{ textTransform: "none", gap: "5px" }} 
              onClick={handlePreview}
            >
              <DvrOutlinedIcon sx={{ fontSize: "18px" }} />
              Preview
            </Button>
            {isPreview ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#007bff",
                    textTransform: "none",
                    gap: "5px",
                    "&:hover": { backgroundColor: "#0069d9" },
                    width:'300px'
                  }}
                >
                  <VerticalAlignBottomIcon sx={{ fontSize: "18px" }} />
                  Download
                </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#6c757d", textTransform: "none", gap: "5px",
                    "&:hover": { backgroundColor: "#5a6268" },
                  }}
                >
                  <DescriptionOutlinedIcon sx={{ fontSize: "18px" }} />
                  Save as Draft
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#007bff",
                    textTransform: "none",
                    gap: "5px",
                    "&:hover": { backgroundColor: "#0069d9" },
                  }}
                  onClick={handleInitiateMeeting}
                >
                  <AutoAwesomeOutlinedIcon sx={{ fontSize: "18px" }} />
                  Initiate meeting
                </Button>
              </>
            )}
          </Box>
        </Box>

        {openSubmitCard && (
          <Box
            sx={{ position: "fixed",top: 0,left: 0,width: "100vw",height: "100vh",backgroundColor: "rgba(0, 0, 0, 0.5)",display: "flex",justifyContent: "center",alignItems: "center",zIndex: 999}}>
            <Box
              sx={{ backgroundColor: "white",padding: "16px",borderRadius: "12px" }}>
              <Submit />
            </Box>
          </Box>
        )}

        <Box sx={{ display: "flex", backgroundColor: "white", justifyContent: "center", alignItems: "center", flexDirection: 'column', width: "90%", margin: "0 auto" , paddingX:'40px' }}>
          <img src={image} alt="Example" style={{ width: "50%", height: "50%", padding: "10px" }} />

          {/* First Part */}
          <TableContainer sx={{ margin: "auto", mt: 3, border: "1px solid #ddd",borderBottom:'none' }}>
            <Table sx={{ borderCollapse: "collapse" }}>
              <TableBody>

                {/* Meeting Details */}
                <TableRow>
                  <TableCell sx={cellStyle}>Name of the Meeting</TableCell>
                  <TableCell sx={cellStyle}>
                    <TextField 
                      variant="standard" 
                      placeholder="Ex..8th BoS Meeting"
                      fullWidth
                      value={selectedMeeting}
                      InputProps={{ disableUnderline: true, style: { fontStyle: 'italic' } }} 
                      onChange={(e) => setSelectedMeeting(e.target.value)}
                      disabled={isPreview}
                    />
                  </TableCell>
                  
                  <TableCell sx={{...cellStyle,backgroundColor:'#E7E7E7',color:'#777'}}>Reference Number</TableCell>
                  <TableCell sx={{...cellStyle,backgroundColor:'#E7E7E7'}}>
                    <TextField 
                      variant="standard" 
                      placeholder="Auto generate" 
                      fullWidth 
                      InputProps={{ 
                        disableUnderline: true,
                        sx: { fontStyle: 'italic', color: '#777' }
                      }}
                      disabled={true}

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
                      disabled={isPreview} // Disable in preview mode
                    />
                  </TableCell>
                </TableRow>

                {/* Types */}
                <TableRow>

                  <TableCell sx={cellStyle}>Repeat Type</TableCell>
                  <TableCell sx={{ position: "relative", ...cellStyle }}>
                    {repeatValue ? (
                      <Box
                        sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          borderRadius: "20px",
                          bgcolor: "#f0f8ff", 
                          padding: "6px 12px",
                          width: "fit-content",
                          minWidth: "10px" 
                        }}
                      >
                        <Typography sx={{ color: "#175CD3", fontSize: "12px" }}>
                          {repeatValue}
                        </Typography>
                        <IconButton
                          sx={{ 
                            border: "2px solid #FB3748", 
                            borderRadius: "50%", 
                            p: "2px",
                            marginLeft: "5px", 
                            "&:hover": { backgroundColor: "transparent" } 
                          }}
                          onClick={() => setRepeatValue("")}
                        >
                          <CloseIcon sx={{ fontSize: "8px", color: "#FB3748" }} />
                        </IconButton>
                      </Box>
                    ) : (
                      <TextField
                        placeholder="Ex..Monthly"
                        variant="standard"
                        InputProps={{ disableUnderline: true, style: { fontStyle: 'italic' } }}
                        value={repeatValue}
                        onClick={() => setOpenRepeat(true)}
                        disabled={isPreview} // Disable in preview mode
                      />
                    )}

                    {openRepeat && (
                      <Box
                        sx={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 5,
                        }}
                        onClick={() => setOpenRepeat(false)}
                      >
                        <Box
                          sx={{
                            backgroundColor: "white",
                            padding: "16px",
                            borderRadius: "8px",
                            position: "relative",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <RepeatOverlay
                            onClose={() => setOpenRepeat(false)}
                            onSave={(selectedOption) => {
                              setRepeatValue(selectedOption);
                              setOpenRepeat(false);
                            }}
                          />
                        </Box>
                      </Box>
                    )}
                  </TableCell>

                  <TableCell sx={cellStyle}>Priority Type</TableCell>
                  <TableCell sx={cellStyle}>
                      <Select
                        fullWidth
                        variant="standard"
                        value={priorityType}
                        onChange={(e) => handleMeetingChange('priorityType', e.target.value)}
                        sx={selectStyle}
                        displayEmpty
                        disabled={isPreview} // Disable in preview mode
                      >
                        <MenuItem disabled value="">
                          <em>Select priority</em>
                        </MenuItem>
                        {priorityOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                  </TableCell>

                </TableRow>

                {/* Details */}
                <TableRow>

                  <TableCell sx={cellStyle}>Venue Details</TableCell>
                    <TableCell sx={{ position: "relative", ...cellStyle }}>
                      {selectedVenue ? (
                        <Box
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            borderRadius: "20px",
                            bgcolor: "#f0f8ff", 
                            padding: "6px 12px",
                            width: "fit-content" 
                          }}
                        >
                          <Typography sx={{ color: "#175CD3", fontSize: "12px" }}>
                            {selectedVenue.name}
                          </Typography>
                          <IconButton
                            sx={{
                              border: "2px solid #FB3748",
                              borderRadius: "50%",
                              p: "2px",
                              marginLeft: "5px",
                              "&:hover": { backgroundColor: "transparent" },
                            }}
                            onClick={() => setSelectedVenue(null)}
                            disabled={isPreview} // Disable in preview mode
                          >
                            <CloseIcon sx={{ fontSize: "8px", color: "#FB3748" }} />
                          </IconButton>
                        </Box>
                      ) : (
                        <TextField 
                          variant="standard" 
                          placeholder="Select venue" 
                          fullWidth 
                          InputProps={{ 
                            disableUnderline: true, 
                            style: { color: "#999", fontStyle: 'italic' } 
                          }} 
                          onClick={handleTextFieldClick}
                          readOnly
                          disabled={isPreview} // Disable in preview mode
                        />
                      )}

                      {isVenueTableVisible && (
                        <Box
                          sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 5,
                          }}
                          onClick={handleCloseVenueTable}
                        >
                          <Box
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                          >
                            <VenueTable onVenueSelect={handleVenueSelect} onClose={handleCloseVenueTable} />
                          </Box>
                        </Box>
                      )}
                    </TableCell>


                  <TableCell sx={cellStyle}>Date & Time</TableCell>
                    <TableCell sx={cellStyle}>
                      <TextField
                        variant="standard"
                        placeholder="Select time"
                        multiline
                        InputProps={{ disableUnderline: true, style: { fontStyle: 'italic' } }}
                        value={selectedDateTime}
                        onClick={() => setOpenDatetime(true)}
                        readOnly
                        disabled={isPreview} // Disable in preview mode
                      />
                        {openDatetime && (
                        <Box
                          sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            bgcolor: "rgba(0, 0, 0, 0.5)",
                            zIndex: 1300,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => setOpenDatetime(false)}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              zIndex: 1301,
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DateTimePicker onConfirm={handleConfirm} />
                          </Box>
                        </Box>
                      )}
                  </TableCell>

                </TableRow>

                {/* roles */}
                <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableCell sx={headerStyle}>Roles</TableCell>
                  <TableCell colSpan={3} sx={headerStyle}>Member list</TableCell>
                </TableRow>

                {roles.map((role, index) => (
                  <TableRow 
                    key={index}
                    draggable // Add this line
                    onDragStart={() => handleRoleDragStart(index)}
                    onDragOver={ handleDragOver }
                    onDragEnter={() => handleDragEnter(index, 'role') }
                    onDragLeave={ handleDragLeave}
                    onDrop={ () => handleDrop(index, 'role') }
                    sx={{
                      '&:hover .actions': {
                        opacity: 1
                      },
                      backgroundColor: dragOverItem === index ? '#f0f0f0' : 'transparent'
                    }}
                  >
                    <TableCell sx={{...cellStyle, width: '20%'}}>
                      <Box sx={rowContentStyle}>
                        <span style={{ color: '#64748b', minWidth: '24px' }}>
                          {getAlphabeticalIndex(index)}
                        </span>
                          <TextField 
                            variant="standard" 
                            placeholder="Enter title"
                            fullWidth
                            InputProps={{ 
                              disableUnderline: true,
                              style: { fontSize: '14px', fontWeight: 'bold', fontStyle: 'italic' }
                            }}
                            value={role.role}
                            onChange={(e) => handleRoleChange(index, 'role', e.target.value)}
                            disabled={isPreview} // Disable in preview mode
                          />
                      </Box>
                    </TableCell>
                    {memberSelectionCell(role, index)}
                  </TableRow>
                ))}
                {!isPreview && (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ border: 0, padding: 0 }}>
                      <Box sx={{ display: "flex",justifyContent: "center",alignItems: "center",border: "2px dashed #1976d2",margin: "auto",padding: "8px",color: "#1976d2",cursor: "pointer"}}
                        onClick={addNewRole}
                      >
                        <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
                        <Typography>Add Member</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </TableContainer>

          {/* Second Part */}
          <TableContainer sx={{ margin: "auto", border: "1px solid #ddd", borderTop: "none" }}>
            <Table sx={{ borderCollapse: "collapse" }}>

              <TableHead>
                  <TableRow>
                    <TableCell width="5%" sx={headerCellStyle}>S.No</TableCell>
                    <TableCell width="30%" sx={headerCellStyle}>Points to be Discussed</TableCell>
                    <TableCell width="20%" sx={{...headerCellStyle}}>Todo</TableCell>
                    <TableCell width="20%" sx={headerCellStyle}>Responsibility</TableCell>
                    <TableCell width="20%" sx={headerCellStyle}>Deadline</TableCell>
                  </TableRow>
              </TableHead>

              <TableBody>

                {discussionPoints.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    draggable // Add this line
                    onDragStart={() => handlePointDragStart(index)}
                    onDragOver={handleDragOver}
                    onDragEnter={() => handleDragEnter(index, 'point')}
                    onDragLeave={handleDragLeave }
                    onDrop={() => handleDrop(index, 'point')}
                    sx={{
                      '&:hover .actions': {
                        opacity: 1
                      },
                      backgroundColor: dragOverItem === index ? '#f0f0f0' : 'transparent'
                    }}
                  >
                    <TableCell sx={cellStyle}>{item.id}</TableCell>

                    <TableCell sx={{ ...cellStyle, fontWeight: "normal", maxWidth: "300px" }}>
                      <Box sx={rowContentStyle}>
                        <TextField
                          variant="standard"
                          placeholder="Enter discussion topic"
                          multiline
                          fullWidth
                          minRows={1}
                          maxRows={4}
                          InputProps={{ 
                            disableUnderline: true,
                            sx: { fontSize: '14px',fontWeight:'bold', fontStyle: 'italic'}
                          }}
                          value={item.point}
                          onChange={(e) => {
                            const updatedPoints = [...discussionPoints];
                            updatedPoints[index].point = e.target.value;
                            setDiscussionPoints(updatedPoints);
                          }}
                          disabled={isPreview} // Disable in preview mode
                        />
                        {!isPreview && (
                          <Box className="actions" sx={actionsWrapperStyle}>
                            <Box component="span" sx={{...actionButtonStyle, cursor: 'grab'}} onMouseDown={() => handlePointDragStart(index)}>
                              <MdDragIndicator size={18} />
                            </Box>
                            <Box 
                              component="span" 
                              sx={{
                                ...actionButtonStyle,
                                '&:hover': {
                                  backgroundColor: '#FEE2E2',
                                  color: '#DC2626'
                                }
                              }}
                              onClick={() => deletePoint(index)}
                            >
                              <FiTrash2 size={16} />
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </TableCell>

                    <TableCell sx={{...cellStyle,backgroundColor:'#E7E7E7'}}>
                      <TextField
                        variant="standard"
                        placeholder="Add remarks"
                        fullWidth
                        InputProps={{ disableUnderline: true, style: { fontStyle: 'italic' } }}
                        value={item.todo || ""}
                        onChange={(e) => {
                          const updatedPoints = [...discussionPoints];
                          updatedPoints[index].todo = e.target.value;
                          setDiscussionPoints(updatedPoints);
                        }}
                        disabled={true}
                      />
                    </TableCell>
                    
                    {memberSelectionCellSimple(index)}

                    <TableCell sx={{ position: "relative", ...cellStyle }}>
                      <TextField 
                        variant="standard" 
                        placeholder="Select Date" 
                        fullWidth 
                        InputProps={{ disableUnderline: true, style: { fontStyle: 'italic' } }} 
                        value={selectedDate[index] || ""}
                        onClick={() => setOpenDateIndex(index)}
                        readOnly
                        disabled={isPreview} // Disable in preview mode
                      />

                    {openDateIndex === index && (
                      <Box
                        sx={{
                          position: "fixed",
                          top: 0,
                          left: 0,
                          width: "100vw",
                          height: "100vh",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          zIndex: 5,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => setOpenDateIndex(null)}
                      >
                        <Box
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DatePick 
                            onConfirm={(date) => handleDateConfirm(date, index)} 
                            onClose={() => setOpenDateIndex(null)}
                          />
                        </Box>
                      </Box>
                    )}
                    </TableCell>

                  </TableRow>
                ))}
                {!isPreview && (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ border: 0, padding: 0 }}>
                      <Box sx={{ display: "flex",justifyContent: "center",alignItems: "center",border: "2px dashed #1976d2",margin: "auto",padding: "8px",color: "#1976d2",cursor: "pointer"}}
                        onClick={handleAddTopic}
                      >
                        <AddCircleOutlineIcon sx={{ marginRight: 1 }} />
                        <Typography>Add New Points</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

            </Table>
          </TableContainer>
          
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

const rowContentStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const inputStyle = {
  fontSize: '14px',
  fontWeight: 'bold'
};

const blueButtonStyle = {
  backgroundColor: '#e6f0ff',
  color: '#0070f3',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#cce0ff'
  }
};

const actionButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#F3F4F6',
  color: '#6B7280',
  cursor: 'pointer',
  transition: 'background-color 0.2s, color 0.2s'
};

const actionsWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  opacity: 0,
  transition: 'opacity 0.2s'
};

const selectStyle = {
  fontSize: "0.95rem",
  '.MuiSelect-select': {
    padding: '2px 8px',
    color: '#666',
    fontStyle: 'italic',
  },
  '&:before, &:after': {
    display: 'none'
  },
  '& .MuiSelect-icon': {
    color: '#666'
  }
};