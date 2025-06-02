import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import {
  CssBaseline,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Rating,
  Snackbar,
  CircularProgress,
  Slide,
  Fade,
  Grow,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  WhatsApp as WhatsAppIcon,
  LockOutlined as LockOutlinedIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  RateReview as RateReviewIcon,
} from "@mui/icons-material";
import "./App.css";
import EventDashboard from "./components/EventDashboard";

// Create rtl cache with specific configuration
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,
});

// Add YJCC branding colors and logo component
const YJCC_COLORS = {
  primary: "#64B5F6",
  secondary: "#42A5F5",
  accent: "#1E88E5",
  light: "#E3F2FD",
};

const YJCCLogo = () => (
  <Box sx={{ textAlign: "center", mb: 4 }}>
    <Typography
      variant="h2"
      component="h1"
      sx={{
        fontFamily: "Heebo",
        fontWeight: 800,
        fontSize: { xs: "2rem", sm: "2.5rem" },
        background: `linear-gradient(45deg, ${YJCC_COLORS.primary}, ${YJCC_COLORS.accent})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        mb: 2,
        letterSpacing: "-0.02em",
      }}
    >
      YJCC Events
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontFamily: "Assistant",
        fontWeight: 500,
        color: "text.secondary",
        letterSpacing: "0.02em",
        fontSize: { xs: "1.1rem", sm: "1.25rem" },
        lineHeight: 1.4,
      }}
    >
      הקהילה הישראלית הצעירה בפראג
    </Typography>
  </Box>
);

// Custom Snackbar component with animation
const CustomSnackbar = ({ open, message, onClose, severity = "success" }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    TransitionComponent={(props) => <Slide {...props} direction="up" />}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{
        width: "100%",
        fontFamily: "Assistant",
        "& .MuiAlert-message": {
          fontSize: "1rem",
        },
      }}
      elevation={6}
      variant="filled"
    >
      {message}
    </Alert>
  </Snackbar>
);

// Theme configuration
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      light: "#E3F2FD",
      main: "#64B5F6",
      dark: "#1E88E5",
    },
    secondary: {
      light: "#90CAF9",
      main: "#42A5F5",
      dark: "#1E88E5",
    },
    background: {
      default: "#F8FBFE",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#37474F",
      secondary: "#546E7A",
    },
  },
  typography: {
    fontFamily: "Assistant, sans-serif",
    fontSize: 16,
    h1: { fontFamily: "Assistant, sans-serif" },
    h2: { fontFamily: "Assistant, sans-serif" },
    h3: { fontFamily: "Assistant, sans-serif" },
    h4: { fontFamily: "Assistant, sans-serif" },
    h5: { fontFamily: "Assistant, sans-serif" },
    h6: { fontFamily: "Assistant, sans-serif" },
    body1: { fontFamily: "Assistant, sans-serif" },
    body2: { fontFamily: "Assistant, sans-serif" },
    button: { fontFamily: "Assistant, sans-serif" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;600;700&display=swap');
        
        body {
          direction: rtl;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%);
          min-height: 100vh;
          font-family: 'Assistant', sans-serif !important;
        }

        * {
          font-family: 'Assistant', sans-serif !important;
        }
      `,
    },
    MuiTable: {
      styleOverrides: {
        root: {
          direction: "rtl",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: "right",
          fontFamily: "Assistant, sans-serif",
        },
        head: {
          fontWeight: 600,
          backgroundColor: "#f5f5f5",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          direction: "rtl",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          direction: "rtl",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          direction: "rtl",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "Assistant, sans-serif",
          right: 16,
          left: "auto",
          transformOrigin: "right",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: "Assistant, sans-serif",
          textAlign: "right",
        },
      },
    },
  },
});

// Constants
const ADMIN_CODE = "291147";

// Add new price type constants
const PRICE_TYPES = {
  REGULAR: "regular",
  DISCOUNT: "discount",
  FULL_SUBSIDY_EXPLAIN: "full_subsidy_explain",
  FULL_SUBSIDY_STAFF: "full_subsidy_staff",
};

// Add custom styled components for form elements
const StyledFormContainer = styled(Box)(({ theme }) => ({
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(3),
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  "& .MuiInputBase-root": {
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      boxShadow: "0 4px 12px rgba(100, 181, 246, 0.1)",
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 20px rgba(100, 181, 246, 0.15)",
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: "Assistant",
    fontSize: "1.1rem",
    fontWeight: 500,
    transition: "color 0.3s ease",
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiInputBase-input": {
    fontFamily: "Assistant",
    fontSize: "1.1rem",
    padding: "16px",
    "&::placeholder": {
      fontStyle: "italic",
      opacity: 0.7,
    },
  },
  "& .MuiFormHelperText-root": {
    fontFamily: "Assistant",
    fontSize: "0.9rem",
    marginTop: "4px",
    transition: "opacity 0.3s ease",
    opacity: 0.8,
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 16,
    padding: theme.spacing(2),
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(100, 181, 246, 0.15)",
  },
  "& .MuiDialogTitle-root": {
    background: "linear-gradient(45deg, #64B5F6, #42A5F5)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "Heebo",
    fontWeight: 700,
    fontSize: "1.75rem",
    textAlign: "center",
    padding: theme.spacing(3, 2),
    borderBottom: "2px solid rgba(100, 181, 246, 0.1)",
    marginBottom: theme.spacing(2),
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2, 3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2, 3),
    borderTop: "2px solid rgba(100, 181, 246, 0.1)",
    marginTop: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: "12px 32px",
  fontSize: "1.1rem",
  fontFamily: "Assistant",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&.MuiButton-contained": {
    background: "linear-gradient(45deg, #64B5F6, #42A5F5)",
    boxShadow: "0 4px 12px rgba(100, 181, 246, 0.2)",
    "&:hover": {
      background: "linear-gradient(45deg, #42A5F5, #1E88E5)",
      boxShadow: "0 6px 16px rgba(100, 181, 246, 0.3)",
      transform: "translateY(-2px)",
    },
  },
  "&.MuiButton-text": {
    color: theme.palette.text.secondary,
    "&:hover": {
      background: "rgba(100, 181, 246, 0.1)",
      transform: "translateY(-2px)",
    },
  },
}));

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  background: "linear-gradient(45deg, #25D366, #128C7E)",
  color: "#FFFFFF",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #128C7E, #075E54)",
    transform: "scale(1.1)",
    boxShadow: "0 8px 16px rgba(37, 211, 102, 0.3)",
  },
}));

// AdminLogin Component
function AdminLogin({ onLogin }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(code);
    if (!success) {
      setError(true);
    }
  };

  return (
    <Fade in timeout={800}>
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
          }}
          className="page-enter"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <Grow in timeout={600}>
              <LockOutlinedIcon
                sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
              />
            </Grow>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                fontFamily: "Heebo",
                fontWeight: 600,
                letterSpacing: "0.02em",
                mb: 3,
                color: "text.primary",
              }}
            >
              כניסת מנהל YJCC
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                label="קוד מנהל"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                error={error}
                helperText={error ? "קוד שגוי" : ""}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontFamily: "Assistant",
                    fontSize: "1.1rem",
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "Assistant",
                    fontSize: "1.1rem",
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontFamily: "Assistant",
                  fontWeight: 600,
                }}
                className="submit-button"
              >
                כניסה
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Fade>
  );
}

// Add FeedbackDialog component
const FeedbackDialog = ({ open, onClose, event }) => {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedFeedbacks = localStorage.getItem(`feedbacks_${event?.id}`);
    return savedFeedbacks ? JSON.parse(savedFeedbacks) : [];
  });

  const getFeedbackStats = () => {
    if (!feedbacks.length) return { avg: 0, count: 0 };
    const sum = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    return {
      avg: (sum / feedbacks.length).toFixed(1),
      count: feedbacks.length,
    };
  };

  const stats = getFeedbackStats();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">משובים - {event?.name}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={parseFloat(stats.avg)} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({stats.avg}) {stats.count} משובים
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        {feedbacks.length > 0 ? (
          <List>
            {feedbacks.map((feedback, index) => (
              <ListItem
                key={index}
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  borderBottom:
                    index < feedbacks.length - 1 ? "1px solid #E0E0E0" : "none",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    {new Date(feedback.date).toLocaleDateString("he-IL")}
                  </Typography>
                  <Rating value={feedback.rating} readOnly size="small" />
                </Box>
                <Typography variant="body1">{feedback.comment}</Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              עדיין אין משובים לאירוע זה
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>סגור</Button>
      </DialogActions>
    </Dialog>
  );
};

// NotificationSystem Component
function NotificationSystem() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("yjccEvents");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    let isSubscribed = true;

    // Update events from localStorage when they change
    const handleStorageChange = () => {
      if (!isSubscribed) return;
      const savedEvents = localStorage.getItem("yjccEvents");
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Check for upcoming events every minute
    const interval = setInterval(() => {
      if (!isSubscribed) return;
      const now = new Date();

      events.forEach((event) => {
        const eventDate = new Date(event.date);
        const timeDiff = eventDate - now;
        const hoursDiff = timeDiff / (1000 * 60 * 60);

        // Send reminder 24 hours before event
        if (hoursDiff <= 24 && hoursDiff > 23) {
          sendEventReminders(event);
        }

        // Send feedback request 12 hours after event
        if (hoursDiff <= -12 && hoursDiff > -13) {
          sendFeedbackRequests(event);
        }
      });
    }, 60000);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [events]);

  return null;
}

// Lazy load components
const LazyFeedbackForm = React.lazy(() => import("./components/FeedbackForm"));

// Utils
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const validatePhone = (phone) => {
  const phoneRegex = /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}$/;
  return phoneRegex.test(phone);
};

const sendWhatsAppMessage = (phone, message) => {
  const formattedPhone = phone.startsWith("+")
    ? phone
    : `+972${phone.substring(1)}`;
  window.open(
    `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

const generateEventReminder = (event) => {
  return `שלום! תזכורת לאירוע "${event.name}" שיתקיים ב-${formatDate(
    event.date
  )} ב${event.location}. נשמח לראותך!`;
};

const generateFeedbackRequest = (event) => {
  return `תודה שהשתתפת באירוע "${event.name}"! נשמח אם תוכל/י למלא משוב קצר על חווית האירוע.`;
};

// Local Storage Functions
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
};

const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return defaultValue;
  }
};

// Event Management Functions
const createEvent = (eventData) => {
  return {
    id: Date.now(),
    ...eventData,
    participants: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

const updateEvent = (event, updates) => {
  return {
    ...event,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
};

const addParticipant = (event, participant) => {
  const existingParticipant = event.participants.find(
    (p) => p.phone === participant.phone
  );
  if (existingParticipant) {
    return {
      ...event,
      participants: event.participants.map((p) =>
        p.phone === participant.phone ? { ...p, ...participant } : p
      ),
      updatedAt: new Date().toISOString(),
    };
  }
  return {
    ...event,
    participants: [
      ...event.participants,
      { ...participant, addedAt: new Date().toISOString() },
    ],
    updatedAt: new Date().toISOString(),
  };
};

// Notification System
const scheduleNotifications = (events) => {
  const now = new Date();

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const timeDiff = eventDate - now;
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    // Send reminder 24 hours before event
    if (hoursDiff <= 24 && hoursDiff > 23) {
      event.participants
        .filter((p) => p.confirmed)
        .forEach((participant) => {
          sendWhatsAppMessage(participant.phone, generateEventReminder(event));
        });
    }

    // Send feedback request 12 hours after event
    if (hoursDiff <= -12 && hoursDiff > -13) {
      event.participants
        .filter((p) => p.attended)
        .forEach((participant) => {
          sendWhatsAppMessage(
            participant.phone,
            generateFeedbackRequest(event)
          );
        });
    }
  });
};

// Form Validation
const validateEventForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "שם האירוע הוא שדה חובה";
  }

  if (!formData.date) {
    errors.date = "תאריך הוא שדה חובה";
  } else if (new Date(formData.date) < new Date()) {
    errors.date = "לא ניתן ליצור אירוע בתאריך שעבר";
  }

  if (!formData.location?.trim()) {
    errors.location = "מיקום הוא שדה חובה";
  }

  return errors;
};

const validateParticipantForm = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = "שם המשתתף הוא שדה חובה";
  }

  if (!formData.phone?.trim()) {
    errors.phone = "מספר טלפון הוא שדה חובה";
  } else if (!validatePhone(formData.phone)) {
    errors.phone = "מספר טלפון לא תקין";
  }

  return errors;
};

// LandingPage Component
function LandingPage({ onAdminClick }) {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 6,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background:
              "linear-gradient(90deg, #64B5F6, #90CAF9, #42A5F5, #1E88E5)",
          }}
        />
        <YJCCLogo />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onAdminClick}
            startIcon={<LockOutlinedIcon />}
            sx={{
              py: 2,
              fontSize: "1.1rem",
            }}
          >
            כניסת מנהל
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

// Main App Component
function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAdminLogin = (code) => {
    if (code === process.env.REACT_APP_ADMIN_CODE) {
      setIsAdmin(true);
    }
  };

  const renderView = () => {
    if (isAdmin) {
      return <EventDashboard />;
    }
    return <LandingPage onAdminClick={() => setIsAdmin(true)} />;
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <YJCCLogo />
          {renderView()}
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
