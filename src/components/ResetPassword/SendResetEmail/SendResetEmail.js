import React, { Component } from "react";
import { Form, Icon, Input, Spin, Alert } from "antd";
import { withFormik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";

import * as errorMessages from "../../../utils/errorMessages";
import * as actions from "../../../store/actions";
import Modal from "../../UI/Modal/Modal";

export class SendResetEmail extends Component {
  state = {
    title: "Send reset password link"
  };

  render() {
    const {
      values,
      handleSubmit,
      handleChange,
      handleBlur,
      errors,
      loading,
      touched,
      isVisible,
      toggleModal,
      error,
      message
    } = this.props;

    //login errors
    let formErrors = null;
    if (error)
      formErrors = <Alert message={error.message} type="error" showIcon />;
    if (message)
      formErrors = <Alert message={message} type="success" showIcon />;

    return (
      <div>
        <Modal
          title={this.state.title}
          visible={isVisible}
          handleSubmit={handleSubmit}
          handleCancel={toggleModal}
        >
          <form className="ResetPassword" onSubmit={handleSubmit}>
            <div className="Confirm_New_Password">
              <Spin spinning={loading} className="Spinner">
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
              </Spin>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

//email validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3, errorMessages.emailNotLongEnough)
    .max(255)
    .email(errorMessages.invalidEmail)
    .required()
});

//mapping state to props
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    message: state.auth.message
  };
};

//mapping actions to props
const mapDispatchToProps = dispatch => {
  return {
    onSendResetPasswordEmail: email =>      dispatch(actions.sendResetPasswordEmail(email))
  };
};

//handling form submit
const resetPasswordHandler = (formValues, props) => {
  props.onSendResetPasswordEmail(formValues);
};

//export component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withFormik({
    validationSchema,
    mapPropsToValues: () => ({
      email: ""
    }),
    handleSubmit: async (values, { props, setErrors }) => {
      const errors = await resetPasswordHandler(values, props);
      if (errors) setErrors(errors);
    }
  })(SendResetEmail)
);
