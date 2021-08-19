import React, { useCallback, useContext, useState } from "react";
import { app } from "../../config/base";
import { AuthContext } from "./Auth.js";
import {
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  notification,
  message,
  Modal,
} from "antd";
import {
  WarningOutlined,
  SmileOutlined,
  MailOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

const Login = ({ history, isVisible, onMasterClose }) => {
  const [status, setStatus] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formText, setFormText] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onClose = () => {
    console.log("closing!");
  };

  const handleLogin = useCallback(
    async (values) => {
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(values.username, values.password)
          .then(() => {
            let user = app.auth().currentUser;
            if (user.emailVerified === false) {
              notification.open({
                message: "Please verify your email",
                duration: 10,
                description: (
                  <div>
                    <p>
                      Email verification is required to keep your account secure
                    </p>
                    <Button
                      type="primary"
                      onClick={() => {
                        app
                          .auth()
                          .currentUser.sendEmailVerification()
                          .then(() => {
                            message.info("Please check your email");
                          });
                      }}
                    >
                      Send Email
                      <MailOutlined />
                    </Button>
                  </div>
                ),
                icon: <WarningOutlined />,
              });
            } else {
              onMasterClose();
            }
          });
        setStatus(false);
      } catch (error) {
        setStatus(false);
        try {
          if (error.code === "auth/wrong-password") {
            message.error("Wrong Username or Password");
          }
        } catch (e) {
          message.error("Something went wrong!");
        }
      }
    },
    [history]
  );

  const showModal = () => {
    setIsModalVisible(true);
    console.log("hello");
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(formText);
    let auth = app.auth();
    auth
      .sendPasswordResetEmail(formText)
      .then(() => message.success("Password reset link sent"))
      .catch((e) => {
        if (e.code === "auth/user-not-found") {
          message.error("There is no account associated with this email");
        } else {
          message.error("An unexpected error has occurred");
        }
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div>
      <Row style={{ padding: 20 }}>
        <Col span={8} offset={6}>
          <div style={{ textAlign: "center", padding: 30 }}>
            <h1 style={{ textAlign: "center" }}>
              Login to access!
              <SmileOutlined style={{ marginLeft: 10 }} />
            </h1>
            <Form
              name="basic"
              onFinish={handleLogin}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  style={{ width: 250 }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{ width: 250 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 120 }}
                  onClick={() => {
                    setStatus(true);
                  }}
                >
                  Sign In {status ? <LoadingOutlined /> : <></>}
                </Button>
                <br />
                <br />
                <span>Don't have an account? Create one</span>
                <p onClick={showModal}>
                  <a style={{ color: "#69c0ff" }}>Forgotten Password</a>
                </p>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Modal
          title="Reset Password"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          Email:{" "}
          <Input
            type="email"
            placeholder="john@gmail.com"
            value={formText}
            onChange={(e) => setFormText(e.target.value)}
            style={{ width: 400 }}
          />
        </Modal>
      </Row>
    </div>
  );
};

export default Login;
