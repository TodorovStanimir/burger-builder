import React, { Component } from 'react';

import Auxilliary from '../../hoc/Auxilliary';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <Auxilliary>
                <div>Burger</div>
                <div>Buld Controls</div>
            </Auxilliary>
        );
    }
}

export default BurgerBuilder;