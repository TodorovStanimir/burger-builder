import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

import { checkValidity, updateObject } from '../../shared/utility';


const auth = props => {

  const [controls, setControls] = useState(
    {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  )

  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
  
  useEffect(() => {
    
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControlElement = updateObject(controls[controlName], {
      value: event.target.value,
      valid: checkValidity(event.target.value, controls[controlName].validation),
      touched: true
    })
    const updatedControls = updateObject(controls, {
      [controlName]: updatedControlElement
    });

    const formIsValid = !Object.keys(updatedControls)
      .map(key => updatedControls[key].valid).includes(false);

    setControls(updatedControls);
    setFormIsValid(formIsValid);
  }

  const authHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup)
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  const formElementsArray = Object.keys(controls)
    .map(key => { return { id: key, config: controls[key] } });
  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = (<p>{props.error.message}</p>)
  }

  let authRedirect = null;

  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={authHandler}>
        {form}
        <Button btnType="Success" disabled={!formIsValid}>SUBMIT</Button>
      </form>
      <Button
        clicked={switchAuthModeHandler}
        btnType="Danger">
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);