import React from 'react';
import { BG, Panel, CTAButton } from './styled';
import { Select } from '../../components/common_styled';
import countries from '../../constants/countries';
import { registerEmployee } from '../../services/userService';
import Swal from 'sweetalert2';

const countryOptions = [
  <option key={0} value={0}>
    Select a country
  </option>,
  ...countries.map(country => (
    <option key={country.id} value={country.id}>
      {country.name}
    </option>
  )),
];

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: 0,
    };
  }

  submitRegistration = () => {
    const { selectedCountry } = this.state;
    if (selectedCountry !== 0) {
      registerEmployee(parseInt(selectedCountry))
        .then(() => {
          location.reload();
        })
        .catch(error => {
          Swal('Error', `Error registering: ${error.message}`, 'error');
        });
    }
  };

  render() {
    const { selectedCountry } = this.state;
    return (
      <BG>
        <Panel>
          <h1>Register</h1>
          <p>
            To register a new account with Unosquare, please first select your
            country.
          </p>
          <Select
            value={selectedCountry}
            onChange={({ target }) =>
              this.setState({ selectedCountry: target.value })
            }
          >
            {countryOptions}
          </Select>
          <CTAButton
            disabled={selectedCountry === 0}
            onClick={this.submitRegistration}
          >
            Register
          </CTAButton>
        </Panel>
      </BG>
    );
  }
}
