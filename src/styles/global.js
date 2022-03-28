import {createGlobalStyle} from  'styled-components'

const GlobalStyle = createGlobalStyle`

    :root{
        --color-primary:#7380ec;
        --color-danger:#ff7782;
        --color-success:#41f1b6;
        --color-warning:#ffbb55;
        --color-white: #ffffff;
        --color-info-dark: #7d8da1;
        --color-info-light: #dce1eb;
        --color-dark: #363949;
        --color-light: rgba( 131,139,200,0.18);
        --color-primary-variant: #111e88;
        --color-dark-variant: #677483;
        --color-background: #f6f6f9;

        --card-border-radius: 2rem;
        --border-radius-1: 0.04rem;
        --border-radius-2: 0.08rem;
        --border-radius-3: 1.2rem;

        --card-padding: 1.8rem;
        --padding-1: 1,2rem;

        --box-shadow: 0 2rem 3rem var(---color-light);
    }

    *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
    }

    body{
        background: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        font: 400 16px Roboto, sans-serif;
        /* background-image: url(/imagens/impulso-network.svg);
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover */

        background:var(--color-background);
    }
`;

export default GlobalStyle