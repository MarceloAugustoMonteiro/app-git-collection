import React, { ChangeEvent, FormEvent , useRef, useState } from 'react';
import { api } from '../../services/api';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Image, Form, Repos, Error } from './styles';
import logo from '../../assets/logo-github.png';

interface GitHubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export const DashBoard: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const formEl = useRef<HTMLFormElement | null>(null);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
    event.preventDefault();
    // const response = await.get<GitHubRepository>(`repos/${newRepo}`);
    // const repository = response.data
    if(!newRepo) {
      setInputError('Informe o username/repositório');
      return;
    }

    try{
      const response = await api.get<GitHubRepository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepos([...repos, repository]);
      formEl.current?.reset();
      setNewRepo('');
      setInputError('');
    } catch {
      setInputError('Repositório nao encontrado no Github');
    }
  }

  return (
    <>
      <Image>
        <img src={logo} alt='GitCollection'/>
      </Image>

      <Title>Catálogo de repositórios do GitHub</Title>

      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input type="text" placeholder='username/repository_name' onChange={handleInputChange} />
        <button type='submit'>Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error> }

      <Repos>
        {repos.map(repository => (
          <a href="/repositories" key={repository.full_name}>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
          />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={25} />
        </a>
        ))}
      </Repos>
    </>
  );
};


