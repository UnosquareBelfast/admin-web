import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ViewTeamsForm from './form';
import { DataTable, EditTeamModal } from '../';
import TeamCells from '../DataTable/Cells/teams';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const ViewTeams = ({
  clients,
  selectTeam,
  selectedTeam,
  teamSearch,
  teams,
  navigateTo,
}) => {
  return (
    <Fragment>
      {selectedTeam && (
        <EditTeamModal 
          team={selectedTeam} 
          closeModal={selectTeam} 
        />
      )}
      <div>
        <CornerButton>
          <Button
            onClick={() => navigateTo('/admin/teams/new')}
            label="New Team"
          />
        </CornerButton>
        <h2>View Teams</h2>
        <ViewTeamsForm 
          clients={clients} 
          teamSearch={teamSearch} 
        />
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
  clients: PT.array.isRequired,
  selectTeam: PT.func.isRequired,
  selectedTeam: PT.object,
  teamSearch: PT.func.isRequired,
  teams: PT.array.isRequired,
  navigateTo: PT.func.isRequired,
};

export default container(ViewTeams);
