import React, { Component } from 'react';

import Auxilliary from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <Auxilliary>
                <Burger />
                <div>Buld Controls</div>
            </Auxilliary>
        );
    }
}

export default BurgerBuilder;