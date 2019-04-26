import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Associates from './associates';
import AssociatesDetail from './associates-detail';
import AssociatesUpdate from './associates-update';
import AssociatesDeleteDialog from './associates-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AssociatesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AssociatesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AssociatesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Associates} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AssociatesDeleteDialog} />
  </>
);

export default Routes;
