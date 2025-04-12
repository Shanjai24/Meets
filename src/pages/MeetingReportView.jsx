import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

// Import the header image directly from assets
import image from "../assets/bannariammanheader.png";

// Styles to match template1.jsx exactly
const cellStyle = {
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '1.5',
    color: '#333',
};

const headerStyle = {
    ...cellStyle,
    backgroundColor: '#f0f0f0',
    fontWeight: '500',
    color: '#000',
};

const headerCellStyle = {
    backgroundColor: '#f8f8f8',
    fontWeight: '500',
    padding: '12px 16px',
    border: '1px solid #ddd',
    textAlign: 'left',
    color: '#333',
};

// Mock data to use as fallback
const MockData = {
    name: '8th BoS Meeting',
    referenceNumber: 'BIT/Autonomy/ISE/BoS/2022-23/01',
    description: 'Lorem ipsum dolor sit amet consectetur. Arcu vel egestas rutrum in magna semper dolor sem. Bibendum tristique quisque facilisis cursus mus malesuada mattis at erat. Pellentesque sed congue tellus massa aliquam. Augue erat nunc mauris consectetur.',
    repeatType: 'Monthly',
    priorityType: 'HIGH PRIORITY',
    venue: 'Textile Seminar Hall',
    dateTime: '07.01.2025 & 10:00 TO 11:00 AM',
    roles: {
        chairman: 'Dr K Premalatha, Professor & Head, Dept of CSE, BIT',
        universityNominee: 'Dr G Kousalya, Professor, Professor & Head, Dept of CSE, CIT',
        academicCouncilMember: 'Dr G SudhaSadhasivam, Professor & Head, Dept of CSE, PSG College of Technology'
    },
    points: [
        {
            id: '01',
            topic: 'Revision of Vision, Mission of the Department, PEOs, PSOs (if required):',
            description: 'Presented the suggestions received from Industry experts and the action taken on the suggestions.',
            remarks: 'Elective verticals need to be finalized',
            status: 'Agree',
            forwardTo: 'Academic Meeting',
            responsibility: 'Dr K Premalatha',
            deadline: '03.01.2025'
        }
    ]
};

export default function MeetingReportView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                setLoading(true);
                const apiUrl = import.meta.env.VITE_API_URL;
                const token = localStorage.getItem('token');
                
                if (!token) {
                    setError('Authentication required');
                    setLoading(false);
                    return;
                }

                // First check if user has access to this meeting
                const accessCheck = await axios.get(`${apiUrl}/api/meetings/get-meeting-agenda/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (!accessCheck.data) {
                    setError('You do not have access to this meeting');
                    setLoading(false);
                    return;
                }

                // If user has access, fetch the meeting details
                const meetingResponse = await axios.get(`${apiUrl}/api/meetings/meeting/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

                if (meetingResponse.data) {
                    const meetingData = meetingResponse.data;
                    
                    // Format the data to match the report structure
                    const formattedReport = {
                        name: meetingData.meeting_name,
                        referenceNumber: meetingData.reference_number || '-',
                        description: meetingData.meeting_description,
                        repeatType: meetingData.repeat_type || 'One-time',
                        priorityType: meetingData.priority || 'Normal',
                        venue: meetingData.venue_name,
                        dateTime: `${new Date(meetingData.start_time).toLocaleDateString()} & ${new Date(meetingData.start_time).toLocaleTimeString()} TO ${new Date(meetingData.end_time).toLocaleTimeString()}`,
                        roles: {
                            chairman: meetingData.roles?.find(r => r.role === 'chairman')?.members[0]?.name || '-',
                            universityNominee: meetingData.roles?.find(r => r.role === 'university_nominee')?.members[0]?.name || '-',
                            academicCouncilMember: meetingData.roles?.find(r => r.role === 'academic_council_member')?.members[0]?.name || '-'
                        },
                        points: meetingData.points?.map((point, index) => ({
                            id: (index + 1).toString().padStart(2, '0'),
                            topic: point.point_name,
                            description: point.description || '',
                            remarks: point.remarks || '-',
                            status: point.point_status || 'Pending',
                            forwardTo: point.forward_to || '-',
                            responsibility: point.responsible_user?.name || '-',
                            deadline: point.deadline || '-'
                        })) || []
                    };

                    setReport(formattedReport);
                }
            } catch (err) {
                console.error('Error fetching report:', err);
                if (err.response?.status === 403) {
                    setError('You do not have access to this meeting');
                } else if (err.response?.status === 404) {
                    setError('Meeting not found');
                } else {
                    setError('Failed to load report details');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton 
                        onClick={() => navigate(-1)} 
                        sx={{ mr: 2, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">Loading report...</Typography>
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton 
                        onClick={() => navigate(-1)} 
                        sx={{ mr: 2, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="error">{error}</Typography>
                </Box>
            </Container>
        );
    }

    if (!report) {
        return (
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <IconButton 
                        onClick={() => navigate(-1)} 
                        sx={{ mr: 2, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px' }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" color="error">Report not found</Typography>
                </Box>
            </Container>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            {/* Header with back button and download */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                        onClick={() => navigate(-1)} 
                        sx={{ 
                            mr: 2,
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            padding: '8px'
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{report.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {report.venue} • {report.dateCreated}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handlePrint}
                    sx={{
                        backgroundColor: '#1565c0',
                        '&:hover': { backgroundColor: '#0d47a1' },
                        borderRadius: '6px',
                        padding: '10px 16px',
                        textTransform: 'none',
                        fontWeight: '500'
                    }}
                >
                    Download MOM
                </Button>
            </Box>

            {/* Main content */}
            <Paper 
                sx={{ 
                    p: { xs: 2, md: 4 }, 
                    mb: 3,
                    boxShadow: 'none',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                }}
            >
                {/* College Header Image */}
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <img 
                        src={image} 
                        alt="College Header" 
                        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                    />
                </Box>

                {/* Meeting Details - Exactly like template1 */}
                <TableContainer sx={{ margin: "auto", mt: 3, border: "1px solid #ddd", borderBottom: 'none' }}>
                    <Table sx={{ borderCollapse: "collapse" }}>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={cellStyle}>Name of the Meeting</TableCell>
                                <TableCell sx={cellStyle}>{report.name}</TableCell>
                                <TableCell sx={{...cellStyle, backgroundColor:'#E7E7E7', color:'#777'}}>Reference Number</TableCell>
                                <TableCell sx={{...cellStyle, backgroundColor:'#E7E7E7'}}>{report.referenceNumber || '-'}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={cellStyle}>Meeting Description</TableCell>
                                <TableCell colSpan={3} sx={{ ...cellStyle }}>{report.description || '-'}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={cellStyle}>Repeat Type</TableCell>
                                <TableCell sx={cellStyle}>{report.repeatType || '-'}</TableCell>
                                <TableCell sx={cellStyle}>Priority Type</TableCell>
                                <TableCell sx={cellStyle}>{report.priorityType || '-'}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={cellStyle}>Venue Details</TableCell>
                                <TableCell sx={cellStyle}>{report.venue || '-'}</TableCell>
                                <TableCell sx={cellStyle}>Date & Time</TableCell>
                                <TableCell sx={cellStyle}>{report.dateTime || report.dateCreated || '-'}</TableCell>
                            </TableRow>

                            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                <TableCell sx={headerStyle}>Roles</TableCell>
                                <TableCell colSpan={3} sx={headerStyle}>Member list</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{...cellStyle, width: '20%'}}>a. Chairman</TableCell>
                                <TableCell colSpan={3} sx={cellStyle}>{report.roles?.chairman || report.createdBy || '-'}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{...cellStyle, width: '20%'}}>b. University Nominee</TableCell>
                                <TableCell colSpan={3} sx={cellStyle}>{report.roles?.universityNominee || '-'}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell sx={{...cellStyle, width: '20%'}}>c. Academic Council Member</TableCell>
                                <TableCell colSpan={3} sx={cellStyle}>{report.roles?.academicCouncilMember || '-'}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Points Table - Exactly like template1 */}
                <TableContainer sx={{ margin: "auto", border: "1px solid #ddd", borderTop: "none" }}>
                    <Table sx={{ borderCollapse: "collapse" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell width="5%" sx={headerCellStyle}>S.No</TableCell>
                                <TableCell width="30%" sx={headerCellStyle}>Points to be Discussed</TableCell>
                                <TableCell width="20%" sx={headerCellStyle}>Remarks</TableCell>
                                <TableCell width="15%" sx={headerCellStyle}>Status</TableCell>
                                <TableCell width="15%" sx={headerCellStyle}>Responsibility</TableCell>
                                <TableCell width="15%" sx={headerCellStyle}>Deadline</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(report.points || []).map((point, index) => (
                                <TableRow key={point?.id || index}>
                                    <TableCell sx={cellStyle}>{point?.id || (index + 1)}</TableCell>
                                    <TableCell sx={{ ...cellStyle, fontWeight: "normal", maxWidth: "300px" }}>
                                        <Typography sx={{ fontWeight: "medium" }}>
                                            {point?.topic || '-'}
                                        </Typography>
                                        {point?.description && (
                                            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 1, fontSize: '14px' }}>
                                                {point.description}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell sx={cellStyle}>{point?.remarks || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography sx={{ color: '#059669', fontWeight: '500', mb: 1 }}>
                                                {point?.status || '-'}
                                            </Typography>
                                            {point?.forwardTo && (
                                                <Typography sx={{ color: '#2563eb', fontSize: '14px' }}>
                                                    Forward to: {point.forwardTo}
                                                </Typography>
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={cellStyle}>{point?.responsibility || '-'}</TableCell>
                                    <TableCell sx={cellStyle}>{point?.deadline || '-'}</TableCell>
                                </TableRow>
                            ))}
                            {(!report.points || report.points.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={cellStyle}>
                                        No points discussed
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
} 