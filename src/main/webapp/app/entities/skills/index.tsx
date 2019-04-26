import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Skills from './skills';
import SkillsDetail from './skills-detail';
import SkillsUpdate from './skills-update';
import SkillsDeleteDialog from './skills-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SkillsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SkillsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SkillsDetail} />
      <ErrorBoundaryRoute path={match.url} component={Skills} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SkillsDeleteDialog} />
  </>
);

export default Routes;
