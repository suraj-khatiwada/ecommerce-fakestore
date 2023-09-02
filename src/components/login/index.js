import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Input, Form, CardImg } from "reactstrap";
import { ProfileImg } from "../../assets/images";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { setLocalStorage } from "../../utils/storageUtils";

function Login() {
  const history = useHistory();
  const textInput = useRef();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is empty").nullable(),
      password: Yup.string().required("Password is empty").nullable(),
    }),

    onSubmit: (values) => {
      setLocalStorage("username", values.userName);
      history.push("/dashboard");
    },
  });

  useEffect(() => {
    textInput.current.focus();
  }, []);

  return (
    <div className="mainCard">
      <Card className="formCard">
        <div className="divInsideCard">
          <div>
            <CardImg alt="profile" src={ProfileImg} className="profileImg" />
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <div className="inputDiv">
              <Input
                invalid={formik.touched.userName && formik.errors.userName}
                id="userName"
                type="text"
                placeholder="Username"
                className="loginDetailBox"
                innerRef={textInput}
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="errorMessage"> {formik.errors.userName}</div>
              ) : null}
            </div>
            <div className="inputDiv">
              <Input
                invalid={formik.touched.userName && formik.errors.userName}
                type="password"
                placeholder="Password"
                className="loginDetailBox"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="errorMessage"> {formik.errors.password}</div>
              ) : null}
              <p className="forgotPwd">Forgot Password?</p>
            </div>
            <div>
              <Button className="formBtn" type="submit">
                LOGIN
              </Button>
              <p>
                Not a member?{" "}
                <span>
                  <Link to={"/registration"}> Signup now</Link>
                </span>
              </p>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
export default Login;
