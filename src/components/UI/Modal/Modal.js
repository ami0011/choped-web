import React, { Component } from "react";
import { Modal } from "antd";

export class CustomModal extends Component {
  render() {
    const { title, visible, handleSubmit, handleCancel, children, okButtonProps, cancelButtonProps } = this.props;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okButtonProps={okButtonProps}
        cancelButtonProps={cancelButtonProps}
      >
        {children}
      </Modal>
    );
  }
}

export default CustomModal;
