import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";

const drawerWidth = 250;
const appBarHeight = '7vh'; // matches your header height

function SideBar({ lessons = [], setActiveLesson, activeLesson }) {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          // Offset the whole drawer below the AppBar instead of z-index trick
          marginTop: appBarHeight,
          height: `calc(100% - ${appBarHeight})`,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Lessons</Typography>
      </Box>
      <List>
        {lessons.map((lesson, idx) => {
          const key = lesson?.lessonId ? lesson.lessonId : idx;
          return (
            <ListItem key={key} disablePadding>
              <ListItemButton
                onClick={() => setActiveLesson(lesson)}
                selected={activeLesson && (activeLesson.lessonId === lesson.lessonId)}
              >
                <Box sx={{ width: "100%", p: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: activeLesson?.lessonId === lesson.lessonId ? 600 : 400 }}
                  >
                    {lesson?.title}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export default SideBar;
