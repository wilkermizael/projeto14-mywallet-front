import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { Link } from "react-router-dom"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useContext } from "react"
import { UserContext } from "../Contex/UserContext"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TokenContext } from "../Contex/TokenContext"

export default function HomePage() {
const {user} = useContext(UserContext)
const {token} = useContext(TokenContext)
const [caixa, setCaixa] = useState()
let somaTotal ={}
let fluxoCaixa=[]
const navigate = useNavigate()

function Logout(){
  localStorage.removeItem('user')
  axios.post(`${import.meta.env.VITE_API_URL}/logout`)
  .then(() => {
    navigate('/')
  })
  .catch((error) => console.log(error))
}


const config = {
  headers: {
    "Authorization": `Bearer ${token}`,
    "UserHeaders":JSON.stringify(user)
  }
}


  useEffect(()=>{
  
    axios.get(`${import.meta.env.VITE_API_URL}/home`,config)
    .then(res =>{
      fluxoCaixa =res.data
      
      const entrada = fluxoCaixa.map(item => item.fluxo ==="entrada"? Number(item.valor) : 0)
      const initialValue = 0;
      //SOMA TODOS OS VALORES POSITIVOS OU SEJA, VALORES DE ENTRADA
      let sumWithInitial = entrada.reduce(
      (accumulator, currentValue) => accumulator + currentValue,initialValue );
  
    
      //SOMA TODOS OS VALORES NEGATIVOS OU SEJA, VALORES DE SAÍDA
      const saida = fluxoCaixa.map(item => item.fluxo === 'saida'? Number(item.valor):0)
      const valorInicial =0
      let somaSaida = saida.reduce((acumulador, valorAtual) => acumulador + valorAtual, valorInicial);
    
      somaTotal=(Number(sumWithInitial) - Number(somaSaida))
      setCaixa([...fluxoCaixa, somaTotal])
   
    })
    .catch(error =>{
      console.log(error)
    })

  },[])


if(caixa){
  
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name"> Olá {user.nome}</h1>
        <div data-test="logout">
        <BiExit  onClick={Logout}/>
        </div>
      </Header>

      <TransactionsContainer>
        <ul>
            {caixa.map(item => (
              <ListItemContainer key={item._id}>
            
                <div>
                  <span>{item.data}</span>
                  <strong data-test="registry-name">{item.descricao}</strong>
                </div>
                <div data-test="registry-amount">
                <Value color={item.fluxo === "entrada"? "entrada" : "saida"}>{item.valor}</Value>
                </div>
              </ListItemContainer>
            ))}
            
        
        </ul>

        <article>
          <strong>Saldo</strong>
          <div data-test="total-amount">
          <Value color={caixa[caixa.length -1] > 0 ? "entrada" : "saida"}>{Number(caixa[caixa.length -1]).toFixed(2)}</Value>
          </div>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        
            <button data-test="new-income">
              <Link to={`/nova-transacao/entrada`}>
                <AiOutlinePlusCircle />
                <p>Nova <br /> entrada</p>
              </Link>
            </button>
        
       
        
          <button data-test="new-expense">
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
  padding: 15px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  article {
    width: 88%;
    display: flex;
    position: absolute;
    bottom: 160px;
    
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
    div{
      position: relative;
      right: -41px;
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
  color: ${(props) => (props.color === "entrada" ? "#00ff1a" : "red")};
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
