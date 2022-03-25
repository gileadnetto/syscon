import Link from 'next/link'
import Head from 'next/head'
import styled from 'styled-components'
import { Divider } from 'primereact/divider';



const HolderApp = styled.div`
  padding: 1rem 0;
  max-width: 1300px;
  margin: 10px auto ;
  min-height: 95vh;

  background: white;
  padding: 10px;

  box-shadow: 0px 0px 14px 2px silver;
 
`;

const HolderCondominios = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Titulo = styled.h1`
  color: #2ba1db;
  font-size: .9rem;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 138px;
  border: 1px solid lightgrey;
  margin: 20px;
  padding: 10px;
  box-shadow: 1px 2px 4px silver;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: all .2s linear;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 1px 9px silver;

  img{
    margin: 0 15px;
    width: 60px;
    height: 60px;
  }

  :hover{
    background: #ededee;
  }

  p{
    color: #686868;
  }
  .conteiner-info{
    flex: 1 ;
  }

	@media only screen and (max-width: 600px) {
    flex-direction: column;
		font-size: 88%;

		.img{
			margin-top: 50px;
   	 margin-bottom: 20px;
		}
	}

`;

const LogsContainer = styled.div`
  display: flex;
  padding: 1rem 5px;

  :nth-child(odd){
    background: #ededee;
  }

  .data-info{
    margin: 0 2rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  .info{
    flex:1;

    h1{
      font-size: 100%;

      small{
        color: #999;
      }
    }
    small{
      font-size: 12px;
    }
  }

  .tipo{
    p{
      margin: 0;
      background: #4c7b9d;
      border-radius: 20px;
      font-size: .7rem;
      font-weight: bold;
      padding: 4px 10px;
      color: white;
      letter-spacing: 3px;
    }
   
  }

	@media only screen and (max-width: 600px) {
    flex-direction: column;
		font-size: 88%;

		.tipo{
			display: none ;
		}
	}
	

`;



export default function Condominios({ condominios, logs }) {

  const renderCondominios = () => {
    let render = [];

    for(let i in condominios){
      let dataCondominio = condominios[i];

      render.push(
        <Link  key={'cond_'+i} href={'/condominio/'+dataCondominio.idcondominio} >
          <Container >
            <img src="imagens/construcao.png"/>
            <div className='conteiner-info'>
              <Titulo>{dataCondominio.nmcondominio}</Titulo>
              <p>{dataCondominio.nmresponsavel}</p>
              <p><small>{dataCondominio.dslogradouro} - {dataCondominio.nmbairro} - {dataCondominio.nmcidade} / {dataCondominio.cduf}</small></p>
            </div>
          </Container>
        </Link>
        
      )
    }

    return render;

  }

  const renderLogs = () => {
    let render = [];

    for(let i in logs){
      let datalogs = logs[i];

      render.push(
        <LogsContainer key={i}>
          <div className="data-info">
            <p>{datalogs.iddata.substring(0, 10).split('-').reverse().join('/')}</p>
            <p>{datalogs.idhora.substring(0,5)}</p>
          </div>
          <div className="info">
            <h1>{datalogs.nmusuario} - <small>{datalogs.sistemaorigem}</small></h1>
            <i> {datalogs.nmdescricao}</i>
            <p><small>{datalogs.nmdetalhe}</small></p>
          </div>
          <div className="tipo">
            <p>{datalogs.nmcategoria}</p>
          </div>
        </LogsContainer>
      )
    }

    return render;

  }
  return (
    <>
     <Head>
        <title>Condominios</title>
      </Head>
    
      <HolderApp>
        <HolderCondominios>
          {renderCondominios()}
        </HolderCondominios>

        <Divider align="left">
            <div className="inline-flex align-items-center">
              <i className="pi pi-history mr-2"></i> Logs
            </div>
        </Divider>
          {renderLogs()}
      </HolderApp>
			
    </>
  )
}

export const getStaticProps = async () => {

  const response = await fetch(process.env.LINK_API+'/condominios')
  const data = await response.json();

  const responseLogs = await fetch(process.env.LINK_API+'/logs')
  const dataLogs = await responseLogs.json();

  return{
    props:{
      condominios:data,
      logs:dataLogs
    },
    revalidate: 10
  }

}
