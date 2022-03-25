import {createGlobalStyle} from  'styled-components'

const GlobalStyle = createGlobalStyle`
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
        }
`;

export default GlobalStyle