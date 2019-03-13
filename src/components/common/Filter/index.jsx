import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { FilterContainer } from './styled';
import { SearchGroup, SelectContainer, Label, Select, Input } from '../Formik/styled';

class Filter extends Component {
  static propTypes = {
    columns: PT.array.isRequired,
    labels: PT.array.isRequired,
    onChange: PT.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      options: [],
      value: '',
      key: '',
    };
  }

  componentWillMount() {
    this.options = this.constructOptions();
  }

  handleChange = event => {
    const { value } = event.target;
    const { onChange } = this.props;
    const { key } = this.state;

    this.setState({ value }, () => {
      onChange({ key, value });
    });
  };

  constructOptions = () => {
    const { columns, labels } = this.props;
    const options = columns.reduce((acc, column, index) => {
      acc.push({
        value: column,
        label: labels[index],
      });
      return acc;
    }, []);
    this.setState({
      options,
      key: options[0].value, 
    });
  };

  switchKey = event => {
    const { value } = event.target;
    this.setState({ key: value, value: '' });
  };

  render() {

    const { options, key, value } = this.state;
    const searchByOption = options.filter((option) => option.value === key);
    const searchByLabel = searchByOption[0].label.toLowerCase();

    return (
      <FilterContainer>
        <SearchGroup>
          <SelectContainer>
            <Select value={key} onChange={this.switchKey}>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </SelectContainer>
          <Input
            type="text"
            placeholder={`Search by ${searchByLabel}`}
            value={value}
            onChange={this.handleChange}
          />
        </SearchGroup>
      </FilterContainer>
    );
  }
}

export default Filter;
