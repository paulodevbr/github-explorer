import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Search from '../pages/Search';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Search} />
  </Switch>
);

export default Routes;
