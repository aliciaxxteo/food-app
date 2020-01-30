import React from "react";


function RestaurantTable(props) {
    const allRestaurants = props.restaurants;
    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Opening Hours</th>
                    <th scope="col">Cuisine</th>
                    <th scope="col">AveragePrice</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                    allRestaurants.map(restaurant => (
                        <tr>
                            <td>
                                {restaurant.name}
                            </td>
                            <td>{restaurant.address}</td>
                            <td>{restaurant.openingTime}AM - {restaurant.closingTime}PM</td>
                            <td>{restaurant.cuisine.name}</td>
                            <td>${restaurant.averagePrice.toFixed(2)}</td>
                            <td>
                                <button type="button" class="btn btn-danger" onClick={() => props.handleDelete(restaurant._id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default RestaurantTable;
