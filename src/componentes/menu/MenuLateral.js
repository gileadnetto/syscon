import { useRouter } from 'next/router'
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import styled from 'styled-components';


const Container = styled.div`
    margin: 0;
    padding:0;
    outline: 0;
    appearance: none;
    border: 0;
    list-style: none;
    box-sizing: border-box;
    font-size: 14px ;
    width:  100vw;

    height: 100vh;
    display: grid;
    
    gap: 1.8rem;

    grid-template-columns:  14rem auto 23rem;
   

    a{
        text-decoration: none;
        color: var(--color-dark);
        
    }

    img{
        display: block;
        width: 100% ;
    }

    h1{font-weight: 800;font-size: 1.8rem;}
    h2{font-weight: 1.4rem;}
    h3{font-weight: 0.87rem;}
    h4{font-weight: 0.8rem;}
    h4{font-weight: 0.77rem;}
    small{font-size: 0.75rem;}
    
    .profile-photo{
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 50%;
        overflow: hidden ;
    }

    .text-muted{color: var(--color-info-dark);}

    p{color: var(--color-dark-variant);}

    b{color: var(--color-dark);}

    .primary{color: var(--color-primary);}
    .danger{color: var(--color-danger);}
    .success{color: var(--color-success);}
    .warning{color: var(--color-warning);}

    aside{
     
        .top{
            display: flex ;
            align-items: center ;
            justify-content: space-between ;
            margin-top: 1.4rem ;
        }

        .logo{
            display: flex ;
            gap:  0.8rem;
        }

        .logo img{
            width: 2rem;
            height: 2rem ;
        }


        .sidebar{
           display: flex;
           flex-direction: column;
           height: 86vh ;
           position:  relative;
           top: 3rem ;

           a{
                display : flex ;
                color: var(--color-info-dark);
                margin-left: 2rem;
                gap: 1rem ;
                align-items: center ;
                position:  relative;
                height: 3.7rem;
                transition: all 300ms ease;

                span{
                    font-size: 1.6rem ;
                }

                :last-child{
                    position: absolute ;
                    bottom:  2rem;
                    width: 100% ;
                }
                
                &.active{
                    background: var(--color-light);
                    color: var(--color-primary);
                    margin-left: 0;

                    :before{
                        content: '';
                        width: 6px;
                        height: 100% ;
                        background: var(--color-primary);
                    }

                    svg{
                        color: var(--color-primary);
                        margin-left: calc(1rem - 3px) ;
                    }

                    
                }

                svg{
                    transition: all 300ms ease ;
                }

                :hover{
                    color: var(--color-primary);

                    svg{
                        margin-left: 1rem ;
                    }
                }
            }

            .message-count{
                background:var(--color-danger);
                color: var(--color-white);
                padding:  2px 10px;
                font-size: 11px ;
                border-radius: var(--border-radius-1);
            }



        }

        h3{
            font-weight: 500;
        }

    }


    main{
        margin-top: 1.4rem ;

        .insights{
            display: grid;
            grid-template-columns: repeat(3, 1fr) ;
            gap: 1.6rem ;

            > div{
                background: var(--color-white);
                padding: var(--card-padding) ;
                border-radius: var(--card-border-radius) ;
                margin-top: 1rem ;
                box-shadow: var(--box-shadow) ;
                transition: all 300ms ease ;

                &:hover{
                    box-shadow: none ;
                }

                .spanIcon{
                    background: var(--color-primary) ;
                    padding: .5rem ;
                    border-radius: 50%;
                    color: var(--color-white) ;
                    font-size: 2rem ;
                }
                
                &.expensive .spanIcon{
                    background: var(--color-danger) ;
                }

                &.income .spanIcon{
                    background: var(--color-success) ;
                }

                .middle{
                  display  :flex ;
                  align-items: center ;
                  justify-content: space-between ;
                }

                h3{
                    margin: 1rem 0 .6rem ;
                    font-size: 1rem ;
                }

                .progress{
                    position: relative ;
                    width: 92px ;
                    height: 92px ;
                    border-radius: 50% ;

                    svg{
                        width: 7rem ;
                        height: 7rem ;

                        circle{
                            fill: none;
                            stroke: var(--color-primary) ;
                            stroke-width: 14;
                            stroke-linecap: round;
                            transform: translate( 5px, 5px) ;
                            stroke-dasharray: 110;
                            stroke-dashoffset: 92; 

                        }
                    }

                    .number{
                        position: absolute ;
                        top:  0;
                        left: 0;
                        height: 100%;
                        width: 100% ;
                        display: flex ;
                        justify-content: center ;
                        align-items: center ;


                    }


                }

                &.sales .progress svg circle{
                    stroke-dashoffset: -30; 
                    stroke-dasharray: 200;
                }
                &.expensive .progress svg circle{
                    stroke-dashoffset: 20; 
                    stroke-dasharray: 80;
                  
                }
                &.income .progress svg circle{
                    stroke-dashoffset: 35; 
                    stroke-dasharray: 110;
                }
            }

           


        }
    }
  
`;


const MenuLateral = () => {
    
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


    return (
        <Container>
             <aside>
                 <div>
                    <div className='top'>
                        <div className='logo'>
                            <img src="https://logodownload.org/wp-content/uploads/2017/05/google-chrome-logo-2.png"></img>
                        </div>
                        <h2>SISCO<span className='danger'>NETT</span></h2>
                        <div className='close' id="close-btn">
                            <CloseIcon />
                        </div>
                    </div>
                    
                    <div className='sidebar'>
                        <a href="#">
                            <DashboardIcon />
                            <h3>Dashboard</h3>
                        </a>
                        <a href="#">
                            <PersonOutlineIcon />
                            <h3>Usuarios</h3>
                        </a>
                        <a href="#">
                            <DashboardIcon />
                            <h3>Orders</h3>
                        </a>
                        <a href="#" className='active'>
                            <LeaderboardIcon />
                            <h3>Analitcs</h3>
                        </a>
                      
                        <a href="#">
                            <MailOutlineIcon />
                            <h3>Messages</h3>
                            <span className='message-count'>26</span>
                        </a>
                        <a href="#">
                            <LogoutIcon />
                            <h3>Sair</h3>
                        </a>
                    </div>
                </div>
            </aside>
            <main>
                <h1>Dashboard</h1>

                <div className='date'>
                    <input type="date"></input>
                </div>

                <div className='insights'>

                    <div className='sales'>
                        <LeaderboardIcon className='spanIcon' />
                        <div className='middle'>
                            <div className='left'>
                                <h3>Total Sales</h3>
                                <h1>$23,001</h1>
                            </div>
                            <div className='progress'>
                                <svg>
                                    <circle cx='40' cy="40" r="38"></circle>
                                </svg>
                                <div className='number'>
                                    <p>81%</p>
                                </div>
                            </div>
                        </div>

                        <small className='text-muted'> Last 24 hours</small>
                    </div>

                    <div className='expensive'>
                        <LeaderboardIcon className='spanIcon' />
                        <div className='middle'>
                            <div className='left'>
                                <h3>Total expenses</h3>
                                <h1>$14,993</h1>
                            </div>
                            <div className='progress'>
                                <svg>
                                    <circle cx='40' cy="40" r="38"></circle>
                                </svg>
                                <div className='number'>
                                    <p>20%</p>
                                </div>
                            </div>
                        </div>

                        <small className='text-muted'> Last 24 hours</small>
                    </div>

                    <div className='income'>
                        <LeaderboardIcon className='spanIcon' />
                        <div className='middle'>
                            <div className='left'>
                                <h3>Total income</h3>
                                <h1>$10,80</h1>
                            </div>
                            <div className='progress'>
                                <svg>
                                    <circle cx='40' cy="40" r="38"></circle>
                                </svg>
                                <div className='number'>
                                    <p>44%</p>
                                </div>
                            </div>
                        </div>

                        <small className='text-muted'> Last 24 hours</small>
                    </div>

                </div>
            </main>
        </Container>
    );
}

export default MenuLateral;