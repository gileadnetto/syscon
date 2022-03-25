import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button as ButtonPrime } from 'primereact/button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Button from '@mui/material/Button';


const  ModalCobrancasUnidade = ({idContext, title, subtitle = ''}) => {
  
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [loader, setLoader] = useState(true);
    const [itens, setItens] = useState({});


    useEffect( async () => {

        const response = await fetch(`${process.env.LINK_API}/cobrancas/unidade/${idContext}`)
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
                    <div  key={'cob_'+i} style={{borderBottom:"1px solid silver", marginBottom:"40px"}}>
                        <p>dtemissao: {formatData(data.dtemissao)}</p>
                        <p>dtvencimento: {formatData(data.dtvencimento)}</p>
                        <p>dtbaixa: {formatData(data.dtbaixa)}</p>
                        <p>vltotal: {data.vltotal}</p>
                        <p>vljuros: {data.vljuros}</p>
                        <p>vldesconto: {data.vldesconto}</p>
                        <p>vlpago: {data.vlpago}</p>
                        <p>agencia: {data.nmagencia}</p>
                        <p>vlacrescimo: {data.vlacrescimo}</p>
                        <p>codigobarras: {data.codigobarras}</p>
                        <p>linhadigitavel: {data.linhadigitavel}</p>
                        <p>nrdac: {data.nrdac}</p>

                        <p>dsobservacao: {data.dsobservacao}</p>
                        <p>nrdac: {data.nrdac}</p>
                    </div>
                )
            }
        }

        return render;
    }

    return (
        <div className="card">
            <IconButton aria-label="delete"  onClick={() => setDisplayBasic2(true)} >
                <MonetizationOnIcon />
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

export default ModalCobrancasUnidade;