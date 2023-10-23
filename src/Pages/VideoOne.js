import { useParams ,useNavigate} from "react-router-dom";
import { CardMedia , Card, Button,Stack} from "@mui/material";


function VideoOne() {
  let { name } = useParams();
  let navigate = useNavigate();

  return (
    <>
    <Stack direction = {"row"} spacing={4} marginTop={1}>
    <Button variant="contained" type = "button" onClick={() => navigate('/videos')}> Return Back </Button>
    <Card variant = "outlined" style={{height : "80vh", width : "3000px",marginTop : 2}}>
    <CardMedia
    component={"video"}
    src={`/users/VideoOne/${name}`}
    autoPlay
    controls
    width={"100%"}
    sx={{height : "100%"}}
    />
    </Card>
    <Button variant="text" size="small" color="primary" style={{fontSize : "12px"}} disabled>
        {name}
    </Button>
    {/* <Typography variant="subtitle1" paragraph = {true} fontSize={12} paddingTop={20} color = {"lightgray"}>
   {name}
    </Typography> */}
    </Stack>
    </>
  );
}

export default VideoOne;
