import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {
  
  const [nome,setNome] = useState('')
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState('')
  const [confirmSenha, setConfirmSenha] = useState('')
  const navigate = useNavigate()
  function enviarCadastro(event){
    event.preventDefault();
   
      let dadosCadastro = {
        nome:nome,
        senha:senha,
        email:email
      }
      if(senha === confirmSenha){
        
        axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, dadosCadastro)
        .then(() => navigate('/')) 
        .catch((error) => alert(error.response.data))

      }else{
        navigate('/cadastro')
        alert('As senhas nao sao iguais') 
      }
  }



  return (
    <SingUpContainer>
      <form onSubmit={enviarCadastro}>
        
        <MyWalletLogo />
        <input data-test="name" placeholder="Nome" type="text" value={nome} onChange={e =>setNome( e.target.value)}/>
        <input data-test="email" placeholder="E-mail" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <input data-test="password" placeholder="Senha" type="password" autocomplete="new-password" value={senha} onChange={e => setSenha(e.target.value)}/>
        <input data-test="conf-password" placeholder="Confirme a senha" type="password" autocomplete="new-password" value={confirmSenha} onChange={e => setConfirmSenha(e.target.value)}/>
        <button data-test="sign-up-submit">Cadastrar</button>
  
      </form>

      <Link to={'/'}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
