import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DashBoard } from '../pages/Dashboard';
import { Repo } from '../pages/Repo';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={DashBoard} path="/" exact />
      <Route component={Repo} path="/repositories/:repository+" />
    </Switch>
  );
};


