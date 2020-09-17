import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    *{
    box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        color : ${(props) => props.theme.blackColor};
        font-family: 'Open Sans', sans-serif;
        padding-top: 140px;
    }
    a {
        color: ${(props) => props.theme.blueColor};
        text-decoration: none;
    }
    input:focus {
        outline:none,
    }

`;
