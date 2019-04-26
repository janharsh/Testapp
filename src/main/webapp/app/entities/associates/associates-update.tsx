import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISkills } from 'app/shared/model/skills.model';
import { getEntities as getSkills } from 'app/entities/skills/skills.reducer';
import { getEntity, updateEntity, createEntity, reset } from './associates.reducer';
import { IAssociates } from 'app/shared/model/associates.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAssociatesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAssociatesUpdateState {
  isNew: boolean;
  idsbskills: any[];
}

export class AssociatesUpdate extends React.Component<IAssociatesUpdateProps, IAssociatesUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsbskills: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getSkills();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { associatesEntity } = this.props;
      const entity = {
        ...associatesEntity,
        ...values,
        bskills: mapIdList(values.bskills)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/associates');
  };

  render() {
    const { associatesEntity, skills, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testApp.associates.home.createOrEditLabel">Create or edit a Associates</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : associatesEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="associates-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="associateLabel" for="associate">
                    Associate
                  </Label>
                  <AvField id="associates-associate" type="text" name="associate" />
                  <UncontrolledTooltip target="associateLabel">fieldName</UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label for="skills">Bskills</Label>
                  <AvInput
                    id="associates-bskills"
                    type="select"
                    multiple
                    className="form-control"
                    name="bskills"
                    value={associatesEntity.bskills && associatesEntity.bskills.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {skills
                      ? skills.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.skills}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/associates" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  skills: storeState.skills.entities,
  associatesEntity: storeState.associates.entity,
  loading: storeState.associates.loading,
  updating: storeState.associates.updating,
  updateSuccess: storeState.associates.updateSuccess
});

const mapDispatchToProps = {
  getSkills,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssociatesUpdate);
