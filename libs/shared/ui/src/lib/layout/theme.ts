import { createGlobalStyle } from 'styled-components';

export const theme = {
    breakpoints: {
        laptop: "1025px",   //min
        tablet: "1024px",   //max
        mobile: "767px"     //max
    },
    colors: {
        lines: {
            bakerloo: "#B26300",
            central: "#DC241F",
            circle: "#FFC80A",
            district: "#007D32",
            "hammersmith-city": "#F589A6",
            jubilee: "#838D93",
            metropolitan: "#9B0058",
            northern: "#000000",
            piccadilly: "#0019A8",
            victoria: "#039BE5",
            "waterloo-city": "#76D0BD",
            default: "lightgrey",
        },
        dark: '#343a40',
        johnstonBlack: "03071C",
        lightgrey: "lightgrey"
    },
};

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Johnston100 W03 Regular";
    src: url("https://db.onlinewebfonts.com/t/6f9f13ce8ac6971d7c1c21ca9189f7d0.eot");
    src: url("https://db.onlinewebfonts.com/t/6f9f13ce8ac6971d7c1c21ca9189f7d0.eot?#iefix")format("embedded-opentype"),
    url("https://db.onlinewebfonts.com/t/6f9f13ce8ac6971d7c1c21ca9189f7d0.woff2")format("woff2"),
    url("https://db.onlinewebfonts.com/t/6f9f13ce8ac6971d7c1c21ca9189f7d0.woff")format("woff"),
    url("https://db.onlinewebfonts.com/t/6f9f13ce8ac6971d7c1c21ca9189f7d0.ttf")format("truetype"),
    url("https://db.onlinewebfonts.com/t/6f9f13ce8ac6971d7c1c21ca9189f7d0.svg#Johnston100 W03 Regular")format("svg");
}


* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

  body {
    font-family: "Johnston100 W03 Regular", Arial, sans-serif;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;