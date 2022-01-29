import React, { ChangeEvent, FormEvent , useEffect, useRef, useState } from 'react';
import { api } from '../../services/api';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
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

const DashBoard: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepository[]>(() => {
    const storageRepos = localStorage.getItem('@GitCollection:repositories');
    if (storageRepos){
      return JSON.parse(storageRepos);
    }
    return [];
  });

  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const formEl = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    localStorage.setItem('@GitCollection:repositories', JSON.stringify(repos));
  }, [repos]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
    event.preventDefault();
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
      setInputError('Repositório não encontrado no Github!');
    }
  }

  return (
    <>
      <Image>
        <img src={logo} alt='GitCollection'/>
      </Image>

      <Title>Catálogo de repositórios do GitHub</Title>

      <Form ref={formEl} hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input type="text" placeholder='username/repository_name' onChange={handleInputChange} />
        <button type='submit'>Buscar</button>
      </Form>

      {inputError && <Error>{inputError}</Error> }

      <Repos>
        {repos.map((repository, index) => (
          <Link to={`/repositories/${repository.full_name}`} key={repository.full_name + index}>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
          />
          <div style={{wordBreak: 'break-word'}}>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
          <FiChevronRight size={25} />
        </Link>
        ))}
      </Repos>
    </>
  );
};

export default DashBoard;
