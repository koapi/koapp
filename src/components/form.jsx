import React from 'react';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import Joi from 'joi';
import _ from 'lodash';

var {PropTypes} = React;

export default class Form extends React.Component {
  validatorTypes = {
    username: Joi.string().alphanum().min(3).max(30).required().label('Username'),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).label('Password')
  }
  static propTypes = {
    errors: PropTypes.object,
    validate: PropTypes.func,
    isValid: PropTypes.func,
    handleValidation: PropTypes.func,
    getValidationMessages: PropTypes.func,
    clearValidations: PropTypes.func,
  }
  getValidatorData(){
    var data = {};
    _.keys(this.props.fields).map(field=>{
      try { data[field] = this.props.signup[field].value; } catch (e) {}
    });

    return data;
  }
  submit(data){
    this.props.validate(err => {
      if (err) {
        console.error(err);
      } else {
        this.props.actions.submit(data);
      }
    });
  }
  render() {
    const {signup, fields: {username, password}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <div>
          <label>User Name{this.props.isValid('username')?'valid':'invalid'}</label>
          <input type="text" placeholder="UserName" {...username}/>
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Password" {...password}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default validation(strategy)(Form);
