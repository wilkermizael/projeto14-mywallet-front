import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext } from "react"
import { UserContext } from "../Contex/UserContext"
import { Link} from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
export default function HomePage() {
const {user} = useContext(UserContext)
const [caixa, setCaixa] = useState()
const [total, setTotal] = useState()
let somaTotal ={}
let fluxoCaixa=[]

  useEffect(()=>{
   
    axios.get("http://localhost:5000/home")
    .then(res =>{
      fluxoCaixa =res.data
      console.log(fluxoCaixa)
      
      const entrada = fluxoCaixa.map(item => item.fluxo ==="entrada"? Number(item.valor) : 0)
      const initialValue = 0;
      let sumWithInitial = entrada.reduce(
      (accumulator, currentValue) => accumulator + currentValue,initialValue );
      console.log(sumWithInitial)
    
    
      const saida = fluxoCaixa.map(item => item.fluxo === 'saida'? Number(item.valor):0)
      const valorInicial =0
      let somaSaida = saida.reduce((acumulador, valorAtual) => acumulador + valorAtual, valorInicial);
      console.log(somaSaida)
    
      somaTotal=(Number(sumWithInitial) - Number(somaSaida))

      console.log(somaTotal)
      setCaixa([...fluxoCaixa, somaTotal])
      console.log(caixa[caixa.length -1] )
    })
    .catch(error =>{
      console.log(error)
    })
    console.log(caixa)
  
 
  },[])

  /*if(caixa){
    const entrada = caixa.map(item => item.fluxo ==="entrada"? Number(item.valor) : 0)
    const initialValue = 0;
    const sumWithInitial = entrada.reduce(
    (accumulator, currentValue) => accumulator + currentValue,initialValue );
    console.log(sumWithInitial)
  
  
    const saida = caixa.map(item => item.fluxo === 'saida'? Number(item.valor):0)
    const valorInicial =0
    const somaSaida = saida.reduce((acumulador, valorAtual) => acumulador + valorAtual, valorInicial);
    console.log(somaSaida)
  
    somaTotal=(Number(sumWithInitial) - Number(somaSaida))
    console.log(somaTotal)
    
    }*/
  

if(caixa){
  
  return (
    <HomeContainer>
      <Header>
        <h1> Olá {user.nome}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          
            {caixa.map(item => (
              <ListItemContainer key={item._id}>
            
                <div>
                  <span>{item.data}</span>
                  <strong>{item.descricao}</strong>
                </div>
              <Value color={item.fluxo === "entrada"? "entrada" : "saida"}>{item.valor}</Value>
          </ListItemContainer>
            ))}
            
        
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={caixa[caixa.length -1] > 0 ? "entrada" : "saida"}>{caixa[caixa.length -1]}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        
            <button>
              <Link to={`/nova-transacao/entrada`}>
                <AiOutlinePlusCircle />
                <p>Nova <br /> entrada</p>
              </Link>
            </button>
        
       
        
          <button>
            <Link to={'/nova-transacao/saida'}>
              <AiOutlineMinusCircle />
              <p>Nova <br />saída</p>
            </Link>
          </button>
        
      </ButtonsContainer>

    </HomeContainer>
  )
}
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "#00ff1a" : "#ff0000")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
