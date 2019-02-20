import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ViewTeamsForm from './ViewTeamsForm';
import { DataTable, EditTeamModal } from '../';
import TeamCells from '../DataTable/Cells/teams';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const ViewTeams = ({
  selectTeam,
  selectedTeam,
  teamSearch,
  teams,
  history,
}) => {
  return (
    <Fragment>
      {selectedTeam && (
        <EditTeamModal team={selectedTeam} closeModal={selectTeam} />
      )}
      <div>
        <CornerButton>
          <Button
            onClick={() => history.replace('/admin/teams/new')}
            label="New Team"
          />
        </CornerButton>
        <h2>View Teams</h2>
        <ViewTeamsForm onChange={teamSearch} />
        <DataTable
          data={teams}
          cells={TeamCells}
          columns={['teamName']}
          onRowClick={data => selectTeam(data)}
          pageSize={20}
        />
      </div>
    </Fragment>
  );
};

ViewTeams.propTypes = {
  selectTeam: PT.func.isRequired,
  selectedTeam: PT.object,
  teamSearch: PT.func.isRequired,
  teams: PT.array.isRequired,
  history: PT.object.isRequired,
};

export default container(ViewTeams);
