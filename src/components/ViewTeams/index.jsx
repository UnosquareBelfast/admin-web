import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import ViewTeamsForm from './form';
import { DataTable, EditTeamModal } from '../';
import TeamCells from '../DataTable/Cells/teams';
import { Button } from '../common';
import { CornerButton } from '../common_styled';

export const ViewTeams = ({
  clientOptions,
  selectTeam,
  selectedTeam,
  teamSearch,
  teams,
  navigateTo,
}) => {

  const renderRedirect = () => {
    if (clientOptions.length === 1) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <Fragment>
      {renderRedirect()}
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
          clientOptions={clientOptions}
          teamSearch={teamSearch}
        />
        <DataTable
          data={teams}
          cells={TeamCells}
          columns={['teamName']}
          onRowClick={({ teamId }) => selectTeam(teamId)}
          pageSize={20}
        />
      </div>
    </Fragment>
  );
};

ViewTeams.propTypes = {
  clientOptions: PT.array.isRequired,
  selectTeam: PT.func.isRequired,
  selectedTeam: PT.object,
  teamSearch: PT.func.isRequired,
  teams: PT.array.isRequired,
  navigateTo: PT.func.isRequired,
};

export default container(ViewTeams);
