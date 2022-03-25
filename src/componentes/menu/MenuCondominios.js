import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router'
import { Menu } from 'primereact/menu';
import styled from "styled-components";


const MenuContainer = styled.div`
 
    position:fixed ;
    top: 0;
    left: 0;
    width:  250px;
    z-index: 99;
    height: 100vh;
    background: #313131;
    transition: all .3s linear ;

    .menu-itens{
        width: 100%;
        background: none;
        border: none;
        color: white ;
        margin-top: 50px ;
    }
    

  @media only screen and (max-width: 800px) {
    width: 50px;
  }
`;

export default function MenuCondominios() {

    const menu = useRef(null);
    const router = useRouter()

    const [items, setItems] = useState([]);
    const [carregando, setCarregando] = useState(true);

    console.log('LINK_API', process.env.LINK_API);


    useEffect( async () => {

   
        const response = await fetch(process.env.LINK_API+'/condominios')
        const condominios = await response.json();

        var items = [];
        for (let i in condominios){
            let data = condominios[i];
            data.nmcondominio = data.nmcondominio.replaceAll('CONDOMÍNIO DO', '');
            data.nmcondominio = data.nmcondominio.replaceAll('CONDOMÍNIO', '');
            data.nmcondominio = data.nmcondominio.replaceAll('CONDOMINIO DO', '');
            data.nmcondominio = data.nmcondominio.replaceAll('CONDOMÍNIO', '');
            data.nmcondominio = data.nmcondominio.replaceAll('CONJUNTO RESIDENCIAL', '');
            
            items.push(
                {
                    label: data.nmcondominio,
                    icon: 'pi pi-fw pi-home',
                    style: {fontSize:"16px"},
                    command:()=> {router.push('/condominio/'+data.idcondominio)}
                }
            )

        }

        setItems(items);
        setCarregando(false);
        
      }, [])
      

    const renderMenu = async () =>{

        
        return <Menu model={items} />
    }

    return (
        <MenuContainer>
            {
                carregando ?
                <p>carregando...</p>
                :
                <Menu model={items} className="menu-itens" />
            }
            
        </MenuContainer>
    );
}

