import React,{ useState } from "react"
import { useRouter } from "next/router"

import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { DataTable, Column } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import ModalCobrancasUnidade from '../../componentes/modals/ModalCobrancas'
import ModalEmail from '../../componentes/modals/ModalEmail'


const HolderApp = styled.div`
  padding: 1rem 0;
  background: white;
  box-shadow: 0px 0px 14px 2px silver;

  td{
    p{
        font-size: 13px;
    }
  }
  
`;


export default function Locatarios({locatarios}){

    const router = useRouter();

     
    const [filtro, setfiltro] = useState('');

    const { isFallback } = useRouter();
    if(isFallback){
        return <p>Carregando....</p>
    }

    // const [loading, setLoading] = useState(false);

    // const onRouteChangeStart = React.useCallback(() => {
    //     setLoading(true);
    // }, []);

    // const onRouteChangeDone = React.useCallback(() => {
    //     setLoading(false);
    //   }, []);

    // React.useEffect(() => {
    // router.events.on('routeChangeStart', onRouteChangeStart);
    // router.events.on('routeChangeComplete', onRouteChangeDone);
    // router.events.on('routeChangeError', onRouteChangeDone);

    // return () => {
    //     router.events.off('routeChangeStart', onRouteChangeStart);
    //     router.events.off('routeChangeComplete', onRouteChangeDone);
    //     router.events.off('routeChangeError', onRouteChangeDone);
    // };
    // }, [router.events]);

    const renderLocatarios = () => {
        let render = [];
    
        if(locatarios){

            let filtrado = locatarios;
            if(filtro){
                filtrado = locatarios.filter( e => {

                        if( e.dsqualificacao.toLowerCase().includes(filtro.toLowerCase()) ) {
                            return true;
                        }
                        else if( e.dsemail.toLowerCase().includes(filtro.toLowerCase())){
                            return true;
                        }
                        else if( e.cdchamada.toLowerCase().includes(filtro.toLowerCase())){
                            return true;
                        } 
                        else if(  e?.nrcnpjcpfsacadoextra && e.nrcnpjcpfsacadoextra.toLowerCase().includes(filtro.toLowerCase())){
                            return true;
                        }  
                    }
                );
            }
                       
            //            <div className="img-profile"><img src={`https://avatars.dicebear.com/api/avataaars/${locatario.dsqualificacao}.svg`} width={60}></img></div>
            //             {/* <div className="img-profile"><img src={`https://avatars.dicebear.com/api/adventurer-neutral/${locatario.dsqualificacao}.svg`} width={60}></img></div> */}
            //             {/* <div className="img-profile"><img src={`https://avatars.dicebear.com/api/initials/${locatario.dsqualificacao}.svg`} width={60}></img></div> */}
            //            

            render.push(
            <DataTable key={"locs1"} value={filtrado} size="small" responsiveLayout="scroll">
                <Column field="cdchamada" header="Apt." body={ locatario => <p>{locatario?.cdchamada}</p> } sortable></Column>
                <Column field="dsqualificacao" header="Cliente" style={{width:'25%'}} body={locatario => 
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={`https://avatars.dicebear.com/api/avataaars/${locatario.dsqualificacao}.svg`} width={30} style={{ borderRadius: "50%", marginRight: "20px", background: "#d7d7d7" }}></img>
                        <div>
                            <p>{locatario.dsqualificacao}</p>
                            <p><small>{locatario.nrcnpjcpfsacadoextra}</small></p>
                        </div>
                    </div>} 
                    sortable>
                </Column>
                <Column field="dsemail" header="Email" body={locatario => <p>{locatario.dsemail}</p>} sortable></Column>
                <Column field="cdchamada" header="Login" body={locatario => <div><p><b>Login: </b>{locatario.dslogin} </p><p><b>Senha: </b>{locatario.dssenha}</p></div> }></Column>
                <Column field="dslogradouro" header="Endereço" body={ locatario => <p>{locatario.dslogradouro} - {locatario.nmbairro} - {locatario.nmcidade} / {locatario.cduf}</p>} sortable></Column>
                <Column field="" header=""  body={locatario => 
                    <div style={{display:'flex'}}>
                        <ModalCobrancasUnidade idContext={locatario.idunidade} title={locatario.dsqualificacao} subtitle={locatario.nrcnpjcpfsacadoextra} />
                        <ModalEmail idContext={locatario.idunidade} title={locatario.dsqualificacao} subtitle={locatario.nrcnpjcpfsacadoextra}/> 
                    </div>
                }>

                </Column>
            </DataTable>);

        }
            
    
        return render;
    
      }
      return (
          <>
             <Head>
                 <title>Condominio</title>
             </Head>
            <HolderApp>
                <div>
                   
                            <div style={{margin: ".4rem 0 1rem"}}>
                                <TextField
                                    autoComplete="off"
                                    style={{maxWidth:'90vw'}}
                                    label="Buscar"
                                    id="standard-start-adornment"
                                    size="small"
                                    sx={{ m: 1, width: '500px' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                                    }}
                                    onChange={(e) => setfiltro(e.target.value)}
                                />
                            </div>

                            <Divider />
                        {/* { loading ?  
                            <p style={{width:'100%'}}>carregando</p>
                                :
                            <div>
                                {renderLocatarios()}
                            </div>
                         } */}

                            <div>
                                {renderLocatarios()}
                            </div>
                </div>

            </HolderApp>
        </>
       
      )
}

export const getStaticPaths = async() => {

    //buscando todos os menros da rocket seat
    const response = await fetch(`${process.env.LINK_API}/condominios`);
    const data = await response.json();

    const paths = data.map(condominio => {
        return { params :{ idcondominio: condominio.idcondominio}}
    })

    //podemos deixar o path vazio e fallback true para ser gerado na busca
    return{
    //    path:[
    //        { params: { login:}}
    //    ],
        paths,
       fallback:true 
    }

}

export const getStaticProps = async (context) => {

    const { idcondominio } = context.params;

    const response = await fetch(`${process.env.LINK_API}/locatarios/${idcondominio}`);
    const data = await response.json();

    return{
        props:{
           locatarios: data
        }
    }
}