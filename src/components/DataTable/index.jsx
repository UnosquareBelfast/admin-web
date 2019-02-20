import React, { Component, Fragment } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Filter } from '../common';
import ReactTable from 'react-table';

class DataTable extends Component {
  static propTypes = {
    data: PT.array.isRequired,
    columns: PT.array.isRequired,
    cells: PT.object.isRequired,
    onRowClick: PT.func,
    pageSize: PT.number,
    emptyMessage: PT.string,
    loading: PT.bool,
  };

  static defaultProps = {
    onRowClick: () => {},
    pageSize: 10,
    emptyMessage: 'No data found',
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      filter: { value: '', key: '' },
      page: 0,
      pageSize: 10,
    };
  }

  componentDidMount = () => {
    this.setState({ pageSize: this.props.pageSize });
  }

  buildColumns = columns => {
    const { cells } = this.props;
    const formattedColumns = columns.reduce((acc, column) => {
      return acc.concat(cells[column]);
    }, []);

    return formattedColumns;
  };

  renderTable = formattedColumns => {
    const { data, pageSize: defaultPageSize, onRowClick } = this.props;
    const { page, pageSize } = this.state;
    return (
      <ReactTable
        {...this.props}
        filtered={[
          { id: this.state.filter.key, value: this.state.filter.value },
        ]}
        data={data}
        columns={formattedColumns}
        defaultPageSize={defaultPageSize}
        page={page}
        pageSize={pageSize}
        className="-striped -highlight"
        getTrProps={(state, rowInfo) => {
          return {
            onClick: () => onRowClick(rowInfo.original),
            style: {
              cursor: rowInfo ? 'pointer' : 'null',
            },
          };
        }}
        onPageChange={page => this.setState({ page })}
        onPageSizeChange={(pageSize, page) => this.setState({ page, pageSize })}
      />
    );
  };

  render() {
    const { data, columns, emptyMessage, loading } = this.props;
    
    const formattedColumns = this.buildColumns(columns);
  

    const labels = formattedColumns.reduce((acc, column) => {
      acc.push(column.Header);
      return acc;
    }, []);

    if (data.length < 0 && !loading) {
      return <p>{emptyMessage}</p>;
    } else {
      return (
        <Fragment>
          <Filter
            columns={columns}
            labels={labels}
            onChange={filter => this.setState({ filter })}
          />
          {this.renderTable(formattedColumns)}
        </Fragment>
      );
    }
  }
}

export default DataTable;
