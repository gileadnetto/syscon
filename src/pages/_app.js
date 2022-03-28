import GlobalStyle from "../styles/global"
import theme from "../styles/theme"
import {ThemeProvider} from 'styled-components'
import { useEffect } from "react"
import Menu from '../componentes/menu/Menu'
import MenuLateral from "../componentes/menu/MenuLateral"
import MenuCondominios from '../componentes/menu/MenuCondominios'
import {AppConteiner} from '../componentes/utils'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                  


const  MyApp = ({ Component, pageProps }) => {

  var swRegistration = null;
  
  useEffect(() => {

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');
    
      navigator.serviceWorker.register('/sw.js')
      .then(function(swReg) {
        console.log('Service Worker is registered', swReg);
    
        swRegistration = swReg;
      })
      .catch(function(error) {
        console.error('Service Worker Error', error);
      });
    } else {
      console.warn('Push messaging is not supported');
    }

    
  }, [])

  

  return (
    <ThemeProvider theme={theme}>
        <MenuLateral/>
        {/* <MenuCondominios /> */}
        <GlobalStyle />
        <AppConteiner>
          <Component {...pageProps} />
        </AppConteiner>
    </ThemeProvider>
   
  ) 
}

export default MyApp