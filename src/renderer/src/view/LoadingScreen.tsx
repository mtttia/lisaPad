import styled from "@emotion/styled"
import Image from "./../assets/Stay Connected with Joy.gif"
import { useState, useEffect } from "react";
import { Box } from "@mui/material";

//using emotion styled create an image that go full page
const ImageFullScreen = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

export default function LoadingScreen()
{

    const [animationPlayed, setAnimationPlayed] = useState(false);

    useEffect(() => {
        // Set the state to indicate animation played
        setAnimationPlayed(true);
    }, []);
    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
            <div>
                <ImageFullScreen src={Image} alt="Loading..." style={{ pointerEvents: animationPlayed ? 'none' : 'auto' }} />
            </div>
        </Box>
    )
}