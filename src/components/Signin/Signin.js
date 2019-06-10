import React, { Component } from "react";
import { Form, Icon, Input, Button, Spin, Alert } from "antd";
import { withFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as errorMessages from "../../utils/errorMessages";
import SendResetEmail from "../ResetPassword/SendResetEmail/SendResetEmail";
import * as actions from "../../store/actions";

import "./Signin.css";

class Signin extends Component {
  state = { isVisible: false };
  toggleModalHandler = () => {
    const modalVisibility = this.state.isVisible;
    this.props.onDismissError();
    this.setState({ isVisible: !modalVisibility });
  };
  render() {
    const {
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      errors,
      error,
      loading,
      touched,
      isAuthenticated
    } = this.props;

    //reset password modal
    const isVisible = this.state.isVisible;
    let resetPasswordModal = null;
    if (isVisible)
      resetPasswordModal = (
        <SendResetEmail
          isVisible={isVisible}
          toggleModal={this.toggleModalHandler}
        />
      );

    //Check if user is auth then redirect
    let authRedirect = null;
    if (isAuthenticated) authRedirect = <Redirect to="/dashboard" />;

    //loagind icon when logging in
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    //login errors
    let formErrors = null;
    if (error)
      formErrors = <Alert message={error.message} type="error" showIcon />;

    return (
      <form className="Signin" onSubmit={handleSubmit}>
        {resetPasswordModal}
        {authRedirect}
        <div className="Signin_Form">
          <Spin spinning={loading} indicator={antIcon} className="Spinner">
            <h3 className="Form_Header">Sign In</h3>
            {formErrors}
            <Form.Item
              help={touched.email && errors.email ? errors.email : ""}
              validateStatus={
                touched.email && errors.email ? "error" : undefined
              }
            >
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
            </Form.Item>
            <Form.Item
              help={touched.password && errors.password ? errors.password : ""}
              validateStatus={
                touched.password && errors.password ? "error" : undefined
              }
            >
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Item>
            <Form.Item>
              <span className="login-form-forgot resetLink" onClick={this.toggleModalHandler}>
                Forgot Password?
              </span>
              <br />
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Spin>
        </div>
      </form>
    );
  }
}

//auth validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, errorMessages.emailNotLongEnough)
    .max(255)
    .email(errorMessages.invalidEmail)
    .required(),
  password: yup
    .string()
    .min(3, errorMessages.passwordNotLongEnough)
    .max(255)
    .required()
});

//mapping state to props
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

//mapping actions to props
const mapDispatchToProps = dispatch => {
  return {
    onAuth: ({ email, password }) => dispatch(actions.auth(email, password)),
    onDismissError: () => dispatch(actions.dismissError())
  };
};

//handling form submit
const signinHandler = (formValues, props) => {
  props.onAuth(formValues);
};

//export component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema,
    mapPropsToValues: () => ({
      email: "",
      password: ""
    }),
    handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
      const errors = await signinHandler(values, props);
      if (errors) setErrors(errors);
    }
  })(Signin)
);
