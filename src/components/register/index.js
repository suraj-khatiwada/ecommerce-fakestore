import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Input } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { LoginCover } from "../../assets/images";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function Registration() {
  const textInput = useRef();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().required("Email is required").email("Invalid email"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password does not match"
      ),
    }),
    onSubmit: (userRegisterDetails) => {
      history.push("/");
    },
  });

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <div className="mainCard">
      <div className="login-leftside">
        <img src={LoginCover} />
      </div>
      <Card className="formCard">
        <div className="divInsideCard">
          <div>
            <h1 className="login_info">Create an account</h1>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <div className="inputDiv">
              <Input
                invalid={formik.touched.username && formik.errors.username}
                type="text"
                placeholder="Username"
                name="username"
                innerRef={textInput}
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="errorMessage">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="inputDiv">
              <Input
                invalid={formik.touched.email && formik.errors.email}
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="errorMessage">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="inputDiv">
              <Input
                invalid={formik.touched.password && formik.errors.password}
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="errorMessage">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="inputDiv">
              <Input
                invalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="errorMessage">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div>
              <Button className="formBtn" type="submit">
                REGISTER
              </Button>
            </div>
            <div style={{ display: "flex" }}>
              <p>
                Already Have an Account?{" "}
                <span>
                  <Link to={"/"}>Login</Link>
                </span>
              </p>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
export default Registration;
