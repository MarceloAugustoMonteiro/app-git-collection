import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const DashBoard = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "dashboard" */ '../pages/Dashboard'),
    );

const Repo = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "repo" */ '../pages/Repo'),
    );

export const Routes: React.FC = () => {
  return (
    <Suspense fallback={'Loading...'}>
      <Switch>
        <Route component={DashBoard} path="/" exact />
        <Route component={Repo} path="/repositories/:repository+" />
      </Switch>
    </Suspense>
  );
};


