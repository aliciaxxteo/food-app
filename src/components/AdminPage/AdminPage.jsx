import React, { Component } from "react";
import { getRestaurants, deleteRestaurant } from "../../services/restaurantService";
import RestaurantTable from "../RestaurantTable/RestaurantTable";


class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: getRestaurants()
    }

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(id) {
    deleteRestaurant(id)
    //set state to get the updated restaurants
    this.setState({
      restaurants: getRestaurants()
    })

  }

  render() {
    return (
      <div data-testid="admin-page">
        <h1>Admin Page</h1>
        <RestaurantTable restaurants={this.state.restaurants} handleDelete={this.handleDelete}></RestaurantTable>
      </div>
    )
  }
}

export default AdminPage;
