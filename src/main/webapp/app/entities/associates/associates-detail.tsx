import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './associates.reducer';
import { IAssociates } from 'app/shared/model/associates.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAssociatesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AssociatesDetail extends React.Component<IAssociatesDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { associatesEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Associates [<b>{associatesEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="associate">Associate</span>
              <UncontrolledTooltip target="associate">fieldName</UncontrolledTooltip>
            </dt>
            <dd>{associatesEntity.associate}</dd>
            <dt>Bskills</dt>
            <dd>
              {associatesEntity.bskills
                ? associatesEntity.bskills.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.skills}</a>
                      {i === associatesEntity.bskills.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/associates" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/associates/${associatesEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ associates }: IRootState) => ({
  associatesEntity: associates.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssociatesDetail);
