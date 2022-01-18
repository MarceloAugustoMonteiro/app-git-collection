import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { api } from '../../services/api';
import { Header, RepoInfo, Issues } from './styles';
import logo from '../../assets/logo-github.png';
import { Image } from '../Dashboard/styles';

interface RepositoryParams {
  repository: string;
}

interface GitHubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

export const Repo: React.FC = () => {
  const [repository, setRepository] = useState<GitHubRepository | null>(null);
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api
      .get(`repos/${params.repository}`)
      .then(response => setRepository(response.data));

    api
      .get(`repos/${params.repository}/issues`)
      .then(response => setIssues(response.data));
  }, [params.repository]);

  return (
    <>
      <Header>
        <Image>
          <img src={logo} alt='GitCollection' />
        </Image>

        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepoInfo>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepoInfo>
      )}

      <Issues>
        {issues.map(issues => (
          <a href={issues.html_url} key={issues.id}>
          <div>
            <strong>{issues.title}</strong>
            <p>{issues.user.login}</p>
          </div>
          <FiChevronRight size={25} />
        </a>
        ))}
      </Issues>
    </>
  );
};


