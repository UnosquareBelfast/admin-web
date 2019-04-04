import React from 'react';
import { PropTypes as PT } from 'prop-types';
import container from './container';
import { Link } from 'react-router-dom';
import { InnerLayout } from './styled';
import AdminSection from './adminSection';

const AdminDashboard = ({ clients, teams, employees }) => {

  return (
    <InnerLayout>
      <h2>Admin Dashboard</h2>
      <div className="columnWrap">

        <AdminSection
          title="Employees"
          linkTo="/admin/employees"
          config={employees}
        />

        <div>
          <h3>Holidays</h3>
          <Link to="/admin/holidays">View All Holidays</Link>
          <Link to="/admin/holidays/pending">View Pending Holidays</Link>
        </div>

        <AdminSection
          title="Clients"
          linkTo="/admin/clients"
          createLinkTo="/admin/clients/new"
          config={clients}
        />

        <AdminSection
          title="Teams"
          linkTo="/admin/teams"
          createLinkTo="/admin/teams/new"
          config={teams}
        />

        <div>
          <h3>Contracts</h3>
          <Link to="/admin/contracts">View Contracts</Link>
          <Link to="/admin/contracts/new">Create Contract</Link>
        </div>
      </div>
    </InnerLayout>
  );
};

AdminDashboard.propTypes = {
  clients: PT.object,
  teams: PT.object,
  employees: PT.object,
};

export default container(AdminDashboard);
