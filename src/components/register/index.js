import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, Input } from "reactstrap";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

function Registration() {
  const textInput = useRef();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is empty"),
      email: Yup.string().required("Email is empty"),
      password: Yup.string().required("Password is empty"),
      confirmPassword: Yup.string().required("Password is empty"),
    }),
    onSubmit: (userRegisterDetails) => {},
  });

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <div className="mainCard">
      <Card className="formCard">
        <div className="divInsideCard">
          <div>
            <h3>Create an account</h3>
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
            <p>
              Already Have an Account?{" "}
              <span>
                <Link to={"/"}>Login</Link>
              </span>
            </p>
          </Form>
        </div>
      </Card>
    </div>
  );
}
export default Registration;
