import Link from 'next/link'

export default function Home() {
  return (
    <div>
      
      <div  style={{display: "flex" , flexFlow:"column", alignItems:"center", justifyContent:"center", minWidth:"100%"}} >
        <Link href="/condominios">
          Condominios
        </Link>
        <img alt="logo" src="imagens/logo.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} style={{width: "100%",maxWidth:"500px" }} className="mr-2"></img>
      </div>
    </div>
  )
}


