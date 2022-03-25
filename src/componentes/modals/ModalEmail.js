import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import IconButton from '@mui/material/IconButton';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';


const  DialogDemo = ({idContext, title, subtitle = ''}) => {
  
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [loader, setLoader] = useState(true);
    const [itens, setItens] = useState({});


    useEffect( async () => {

        const response = await fetch(`${process.env.LINK_API}/emails/unidade/${idContext}`)
        const dadosCobrancas = await response.json();

        setItens(dadosCobrancas);
        setLoader(false);
      }, [])


    const renderFooter = () => {
        return (
            <div>
                <Button variant="contained" onClick={() => setDisplayBasic2(false)} >Sair</Button>

                {/* <Button label="Sair" icon="pi pi-check" onClick={() => setDisplayBasic2(false)} autoFocus /> */}
            </div>
        );
    }


    const formatData = (data) => {
        if(data){
            return data.substring(0, 10).split('-').reverse().join('/')
        }

        return '';
    }

    const renderCobranca = () =>{

        let render = [];

        if(itens){
            for(let i in itens){
                let data = itens[i];

                render.push(
                    <div  key={'cob_'+i} style={{borderBottom:"1px solid silver", marginBottom:"0px", display:'flex'}}>
                        <div style={{display: "flex", alignItems: "center", margin: "0 20px"}}>
                            { data?.dtvisualizado ? <MarkEmailReadIcon /> : <CancelScheduleSendIcon /> } 
                        </div>
                        <div style={{flex: "1"}}>
                            <p>Enviado em: {formatData(data.dtsaidafila)}</p>
                            <p>Para: {data.dsemaildestinatario}</p>
                            <p>Por: {data.dsemailremetente}</p>
                            <p>Usuario: {data.dsnomeusuario}</p>
                            <p>Visualizado: {data?.dtvisualizado ? 'Sim em -'+formatData(data.dtvisualizado) : 'Não' } </p>
                        </div>
                    </div>
                )
            }
        }

        return render;
    }

    return (
        <div className="card">
            <IconButton aria-label="delete"  onClick={() => setDisplayBasic2(true)} >
                <EmailIcon />
            </IconButton>

            <Dialog 
                header={
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={`https://avatars.dicebear.com/api/avataaars/${title}.svg`} width={40} style={{ borderRadius: "50%", marginRight: "40px", background: "#d7d7d7" }}></img>
                        <div>
                            <p>{title}</p> 
                            {subtitle && <small style={{color:"#bfbfbf"}}>{subtitle}</small>}
                        </div>
                    </div>
                } 
                visible={displayBasic2} 
                style={{ width: '50vw' }} 
                footer={renderFooter()} 
                onHide={() =>setDisplayBasic2(true)}>
                
                { loader ?
                    <p>carregando ...</p>
                    :
                    renderCobranca()
                }
               
            </Dialog>
        </div>
    )
}

export default DialogDemo;