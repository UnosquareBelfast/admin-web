import React, { Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { ContainerStyle } from './styled';

const index = ({ clients, selectTeam }) => {
  const renderSidebar = () => {
    return clients.map(client => {
      return (
        <Fragment key={client}>
          <h4 className="client">{client.clientName}</h4>
          {renderTeamLinks(client.teams)}
        </Fragment>
      );
    });
  };

  const renderTeamLinks = clientTeams => {
    return clientTeams.map(team => (
      <p
        key={team.teamName}
        className="team-link"
        onClick={() => selectTeam(team)}
      >
        {team.teamName}
      </p>
    ));
  };

  const renderEmpty = <p>You have not be assigned to a team yet.</p>;

  return (
    <ContainerStyle>
      <h3 className="title">Your Teams</h3>
      {clients.length > 0 ? renderSidebar() : renderEmpty}
    </ContainerStyle>
  );
};

index.propTypes = {
  clients: PT.array.isRequired,
  selectTeam: PT.func.isRequired,
};

export default index;
