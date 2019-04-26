import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAssociates } from 'app/shared/model/associates.model';
import { getEntities as getAssociates } from 'app/entities/associates/associates.reducer';
import { getEntity, updateEntity, createEntity, reset } from './skills.reducer';
import { ISkills } from 'app/shared/model/skills.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISkillsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISkillsUpdateState {
  isNew: boolean;
  askillsId: string;
}

export class SkillsUpdate extends React.Component<ISkillsUpdateProps, ISkillsUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      askillsId: '0',
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

    this.props.getAssociates();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { skillsEntity } = this.props;
      const entity = {
        ...skillsEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/skills');
  };

  render() {
    const { skillsEntity, associates, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="testApp.skills.home.createOrEditLabel">Create or edit a Skills</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : skillsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="skills-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="skillsLabel" for="skills">
                    Skills
                  </Label>
                  <AvField id="skills-skills" type="text" name="skills" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/skills" replace color="info">
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
  associates: storeState.associates.entities,
  skillsEntity: storeState.skills.entity,
  loading: storeState.skills.loading,
  updating: storeState.skills.updating,
  updateSuccess: storeState.skills.updateSuccess
});

const mapDispatchToProps = {
  getAssociates,
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
)(SkillsUpdate);
