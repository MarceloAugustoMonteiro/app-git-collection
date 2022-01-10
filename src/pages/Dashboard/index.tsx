import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Image, Form, Repos } from './styles';
import logo from '../../assets/logo-github.png';

export const DashBoard: React.FC = () => {
  return (
    <>
      <Image>
        <img src={logo} alt='GitCollection'/>
      </Image>

      <Title>Catálogo de repositórios do GitHub</Title>

      <Form>
        <input type="text" placeholder='username/repository_name' />
        <button type='submit'>Buscar</button>
      </Form>

      <Repos>
        <a href="/repositories">
          <img src="https://avatars.githubusercontent.com/u/62626014?v=4" alt="Repositório" />
          <div>
            <strong>aluiziodeveloper/mini-curso-reactjs</strong>
            <p>Repositório do mini curso gratuito de reactjs</p>
          </div>
          <FiChevronRight size={25} />
        </a>
      </Repos>
    </>
  );
};


