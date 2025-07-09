import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    :root {
        --color-dark-blue: #000c24;
        --gradient-bg: linear-gradient(175deg, #7f0dd8 10%, #a937f0 50%, #c80dd8);
    }

    body {
        margin: 0;
        padding: 0;
        font-family: Montserrat, Arial, sans-serif;
        background-color: #000c24;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;
