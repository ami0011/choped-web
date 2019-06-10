import React, { Component } from "react";
import { Form, Icon, Input, Spin, Button, Alert } from "antd";
import { withFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import queryString from "query-string";

import * as errorMessages from "../../utils/errorMessages";
import * as actions from "../../store/actions";

import "./ResetPassword.css";

export class ResetPassword extends Component {
  componentDidMount() {
    this.props.onSetOobCode(
      queryString.parse(this.props.location.search).oobCode
    );
  }

  render() {
    const {
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      errors,
      loading,
      touched,
      message,
      error
    } = this.props;

    //login errors
    let formInfos = null;
    if (error)
      formInfos = <Alert message={error.message} type="error" showIcon />;
    if (message)
      formInfos = <Alert message={message} type="success" showIcon />;

    return (
      <form className="ResetPassword" onSubmit={handleSubmit}>
        <div className="ResetPassword_Form">
          <Spin spinning={loading} className="Spinner">
            <h3 className="Form_Header">Enter New Password</h3>
            {formInfos}
            <Form.Item
              help={touched.password && errors.password ? errors.password : ""}
              validateStatus={
                touched.password && errors.password ? "error" : undefined
              }
            >
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="New Password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Confirm
              </Button>
            </Form.Item>
          </Spin>
        </div>
      </form>
    );
  }
}

//Password validation schema
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, errorMessages.passwordNotLongEnough)
    .max(255)
    .required()
});

//mapping state to props
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    oobCode: state.auth.oobCode,
    message: state.auth.message,
    error: state.auth.error
  };
};

//mapping actions to props
const mapDispatchToProps = dispatch => {
  return {
    onSetOobCode: oobCode => {
      dispatch(actions.setOobCode(oobCode));
    },
    onConfirmResetPassword: (password, oobCode) =>
      dispatch(actions.resetPassword(password, oobCode))
  };
};

//handling form submit
const confirmResetPasswordHandler = (formValues, props) => {
  props.onConfirmResetPassword(formValues, props.oobCode);
};

//export component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema,
    mapPropsToValues: () => ({
      password: ""
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      const errors = await confirmResetPasswordHandler(values, props);
      if (errors) setErrors(errors);
    }
  })(ResetPassword)
);
