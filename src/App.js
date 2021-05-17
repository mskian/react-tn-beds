import React, { Component } from "react"
import axios from "axios"
import ReactTable from "react-table-v6"
import "react-table-v6/react-table.css"
import Button from "@material-ui/core/Button"
import { matchSorter } from "match-sorter"

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: true,
    }
  }
  async getUsersData() {
    const res = await axios.get(
      "https://mskian.github.io/tamil-nadu-covid-beds-api/api.json"
    )
    console.log(res.data)
    this.setState({ loading: false, users: res.data })
  }
  addFilterPlaceholder = () => {
    const filters = document.querySelectorAll("div.rt-th > input")
    for (let filter of filters) {
      filter.placeholder = "Search"
    }
  }
  refreshPage() {
    window.location.reload()
  }
  componentDidMount() {
    this.getUsersData()
    this.addFilterPlaceholder()
  }
  render() {
    return (
      <section>
        <ReactTable
          data={this.state.users}
          noDataText="No Data"
          className="-striped -highlight"
          defaultPageSize={10}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              columns: [
                {
                  Header: "District List",
                  id: "District",
                  accessor: d => d.District,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["District"] }),
                  filterAll: true,
                },
                {
                  Header: "Hospital",
                  style: { "white-space": "unset" },
                  id: "Institution",
                  accessor: d => d.Institution,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Institution"] }),
                  filterAll: true,
                },
              ],
            },
            {
              Header: "Covid Beds",
              accessor: "COVID_BEDS_Vacant",
              getProps: (state, rowInfo, column) => {
                return {
                  style: {
                    color:
                      rowInfo && rowInfo.row.COVID_BEDS_Vacant < 10
                        ? "red"
                        : "green",
                  },
                }
              },
            },
            {
              Header: "Oxygen Beds",
              accessor: "OXYGEN_SUPPORTED_BEDS_Vacant",
              getProps: (state, rowInfo, column) => {
                return {
                  style: {
                    color:
                      rowInfo && rowInfo.row.OXYGEN_SUPPORTED_BEDS_Vacant < 10
                        ? "red"
                        : "green",
                  },
                }
              },
            },
            {
              Header: "Non-Oxygen",
              accessor: "NON_OXYGEN_SUPPORTED_BEDS_Vacant",
              getProps: (state, rowInfo, column) => {
                return {
                  style: {
                    color:
                      rowInfo &&
                      rowInfo.row.NON_OXYGEN_SUPPORTED_BEDS_Vacant < 10
                        ? "red"
                        : "green",
                  },
                }
              },
            },
            {
              Header: "ICU beds",
              accessor: "ICU_BEDS_Vacant",
              getProps: (state, rowInfo, column) => {
                return {
                  style: {
                    color:
                      rowInfo && rowInfo.row.ICU_BEDS_Vacant < 10
                        ? "red"
                        : "green",
                  },
                }
              },
            },
            {
              Header: "Ventilator",
              accessor: "VENTILATOR_Vacant",
              getProps: (state, rowInfo, column) => {
                return {
                  style: {
                    color:
                      rowInfo && rowInfo.row.VENTILATOR_Vacant < 10
                        ? "red"
                        : "green",
                  },
                }
              },
            },
            {
              Header: "Contact",
              accessor: "Contact_Number",
            },
          ]}
          sortable={true}
          resizable={true}
        />
        <br />
        <Button
          style={{ margin: "0 auto", display: "flex" }}
          variant="contained"
          color="primary"
          onClick={this.refreshPage}
        >
          Refresh Data
        </Button>
        <br />
        <br />
      </section>
    )
  }
}
