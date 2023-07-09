import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { TokenContext } from "../Contex/TokenContext"

export default function TransactionsPage() {
  const {token} = useContext(TokenContext)
  const params = useParams()
  const tipo= params.tipo.toString()
  const [valor,setValor]= useState('')
  const [descricao, setDescricao] = useState('')
  const [fluxo, setFluxo] = useState(tipo)
  const navigate = useNavigate()
  
  
  function transacao(event){
    event.preventDefault()
    const transaction ={
      valor:valor,
      descricao:descricao,
      fluxo: fluxo
    }
  
   const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  
    axios.post(`http://localhost:5000/transacao`, transaction,config)
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
