import React from 'react';

import classes from './Modal.css';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Backdrop from '../Backdrop/Backdrop'

const modal = props => {

  return <Auxilliary>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}>
      {props.children}
    </div>
  </Auxilliary>
}

export default React.memo(modal, (prevProps, nextProps) =>
  nextProps.show === prevProps.show &&
  nextProps.children === prevProps.children
);