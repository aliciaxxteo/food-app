import React, { Component } from "react";
import { getCuisines } from "../../services/cuisineService";
import { getRestaurants, saveRestaurant } from "../../services/restaurantService";
import Input from "../common/Input/Input";
import TimeInput from "../common/Input/TimeInput";
import SelectInput from "../common/Input/SelectInput";

class RestaurantForm extends Component {
    state = {
        cuisines: getCuisines(),
        data: {
            name: "",
            address: "",
            openingTime: "",
            closingTime: "",
            cuisineId: "",
            averagePrice: "",
            imageUrl: ""
        }
    };

    componentDidMount() {
        if (!this.props.match.params.hasOwnProperty('id')) {
            return
        }
        console.log(this.props.match)
        //find restaurant id that matches the params id
        const restaurantFound = getRestaurants().find(
            restaurant => restaurant._id === this.props.match.params.id
        );
        //save restaurant details to the state
        const newRestaurant = { ...restaurantFound }
        newRestaurant.cuisineId = newRestaurant.cuisine._id
        delete newRestaurant.cuisine

        this.setState({ data: newRestaurant });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { cuisineId, averagePrice } = this.state.data
        const cuisine = getCuisines().find(cuisine => cuisine._id === cuisineId);

        const restaurant = { ...this.state.data };
        delete restaurant.cuisineId;
        restaurant.cuisine = cuisine
        restaurant.averagePrice = parseFloat(averagePrice)

        saveRestaurant(restaurant);
        this.props.history.replace(this.props.returnPath);
    };

    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });
    };

    render() {
        const { cuisines } = this.state;
        const { name, address, openingTime, closingTime, cuisineId, averagePrice, imageUrl } = this.state.data;
        return (
            <div data-testid="create-page">
                <h3>New Restaurant</h3>
                <form onSubmit={this.handleSubmit}>
                    <Input name="name" label="Name" onChange={this.handleChange} value={name} />
                    <Input name="address" label="Address" onChange={this.handleChange} />
                    <TimeInput
                        name="openingTime"
                        label="Opening Time"
                        onChange={this.handleChange}
                    />
                    <TimeInput
                        name="closingTime"
                        label="Closing Time"
                        onChange={this.handleChange}
                    />
                    <SelectInput
                        name="cuisineId"
                        label="Cuisine"
                        options={cuisines}
                        onChange={this.handleChange}
                    />
                    <Input
                        name="averagePrice"
                        label="Average Price"
                        type="number"
                        onChange={this.handleChange}
                    />
                    <Input
                        name="imageUrl"
                        label="Image URL"
                        onChange={this.handleChange}
                    />
                    <button className="btn btn-primary btn-sm">Save</button>
                </form>
            </div>
        );
    }
}

export default RestaurantForm;
