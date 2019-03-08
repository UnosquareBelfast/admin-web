import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { ContainerStyle } from './styled';

const index = ({ clients, selectTeam, selectedTeam }) => {
  const renderSidebar = () => {
    return clients.map( (client, index) => {
      return (
        <Fragment key={client + index}>
          <h4 className="client">{client.clientName}</h4>
          {renderTeamLinks(client.teams)}
        </Fragment>
      );
    });
  };

  const renderTeamLinks = clientTeams => {
    return clientTeams.map( (team, index) => (
      <p
        key={team.teamName + index}
        className={
          selectedTeam && selectedTeam.teamName === team.teamName ? 'team-link active' : 'team-link'
        }
        onClick={() => selectTeam(team)}
      >
        {team.teamName}
      </p>
    ));
  };

  const renderEmpty = <p>You have not been assigned to a team yet.</p>;

  return (
    <ContainerStyle>
      <h3 className="title">Your Teams</h3>
      {clients.length > 0 ? renderSidebar() : renderEmpty}
    </ContainerStyle>
  );
};

index.propTypes = {
  clients: PT.array.isRequired,
  selectedTeam: PT.object,
  selectTeam: PT.func.isRequired,
};

export default index;
