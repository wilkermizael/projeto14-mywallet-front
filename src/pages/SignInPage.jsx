import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../Contex/UserContext"
import { TokenContext } from "../Contex/TokenContext"


export default function SignInPage() {
  
  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const {token} = useContext(TokenContext)
 function login(event){
    event.preventDefault()
    const dadosLogin ={
      email:emailLogin,
      senha:senhaLogin
    }
      
      axios.post("http://localhost:5000/", dadosLogin)
      .then(resposta => {
        
        const {nome, token, _id} = resposta.data
        setUser({nome,token, _id})
        localStorage.setItem('user', JSON.stringify({nome, token,_id}))
        navigate('/home')
      }) 
      .catch((error) => {
        if(!token){
          alert(error.response.data)
          navigate('/')
        }else{
          alert(error.response.data)
        }
        
      })
    
   

}
  
  
  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" value={emailLogin} onChange={e =>setEmailLogin(e.target.value)}/>
        <input placeholder="Senha" required type="password" autoComplete="new-password" value={senhaLogin} onChange={e => setSenhaLogin(e.target.value)}/>
        <button>Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
