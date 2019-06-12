import React, { Component } from "react";
import { Modal } from "antd";

export class CustomModal extends Component {
  render() {
    const { title, visible, handleSubmit, handleCancel, children } = this.props;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    );
  }
}

export default CustomModal;
