import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { TokenContext } from "../Contex/TokenContext"
import { UserContext } from "../Contex/UserContext"

export default function TransactionsPage() {
  const {token} = useContext(TokenContext)
  const {user} = useContext(UserContext)
  const params = useParams()
  const tipo= params.tipo.toString()
  const [valor,setValor]= useState('')
  const [descricao, setDescricao] = useState('')
  const [fluxo, setFluxo] = useState(tipo)
  const navigate = useNavigate()
  
  
  function transacao(event){
    event.preventDefault()
    //const meuvalor = Number(valor).toFixed(2)
    const transaction ={
      valor:Number(valor),
      descricao:descricao,
      fluxo: fluxo,
      userId: (user._id)
    }
  
   const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  
    axios.post(`${import.meta.env.VITE_API_URL}/transacao`, transaction,config)
    .then(() =>{
      navigate('/home')
    })
    .catch(error =>{
      alert(error.response.data)
    })

  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={transacao}>
        <input placeholder="Valor"  type="text" value={valor} onChange={e => setValor(e.target.value)}/>
        <input placeholder="Descrição" type="text" value={descricao} onChange={e => setDescricao(e.target.value)}/>
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
