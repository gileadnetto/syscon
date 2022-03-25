import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { useEffect } from "react"
import { useRouter } from 'next/router'



const Menu = () => {
    
    const router = useRouter()

        
    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-fw pi-home',
            command:()=> {router.push('/condominios')}
        },
        {
            label: 'Logs',
            icon: 'pi pi-fw pi-history',
            command:()=> {router.push('/')}
        },
    ];


  const start = <img alt="logo" src="imagens/logo40.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
  const end = <i className="pi pi-fw pi-user mr-2"></i>;

    return (
        <div>
             <div className="card">
                <Menubar model={items} start={start} end={end} style={{ paddingLeft: "270px"}} />
            </div>
        </div>
    );
}

export default Menu;