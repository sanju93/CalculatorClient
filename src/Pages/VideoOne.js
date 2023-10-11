import { useParams } from "react-router-dom";
import { CardMedia , Card} from "@mui/material";


function VideoOne() {
  let { name } = useParams();

  return (
    <>
    <Card variant = "outlined" sx={{height : "80vh", marginTop : 4}}>
    <CardMedia
    component={"video"}
    src={`/users/VideoOne/${name}`}
    autoPlay
    controls
    sx={{height : "100%", width : "100%"}}
    />
    </Card>
    </>
  );
}

export default VideoOne;
