import React, { Component } from 'react';

import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return (
            <Auxilliary>
                <Burger ingredients={this.state.ingredients} />
                <div>Buld Controls</div>
            </Auxilliary>
        );
    }
}

export default BurgerBuilder;