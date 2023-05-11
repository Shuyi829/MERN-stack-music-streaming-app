import React, { useState,useEffect, useMemo } from "react";
import { Form, Input, Button,Checkbox,Alert,notification } from 'antd';
import './style.css';

  
function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const openNotificationWithIcon = (type,title,text) => {
    notification[type]({
      message: title,
      description:text,
    });
  };

  let handleSubmit = e => {
    e.preventDefault();
    if(email!="" && password!=""){
      $.ajax({
        type:"post",
        url:"http://localhost:3007/login",
        data:{
            email: email,
            password:password
        },
        success:function(data){
           openNotificationWithIcon('success','Login Tips',data.message);
           localStorage.setItem("token",data.token);
           localStorage.setItem("access_token",data.access_token);
           setTimeout(function(){
            window.location.href="/search";
          },2000);
        },
        error:function(data){
          openNotificationWithIcon('error','Login Tips',data.responseJSON.message);
        }
      });
    }else{
      openNotificationWithIcon('error','Login Tips','The password and Email address cannot be empty');
    }
  };

  return (
    <div>
      <div className="form_box">
        <h2>Login</h2>
        <Form layout="inline" >
          <Form.Item>
              <Input
                placeholder="Email"
                onChange={e=>setEmail(e.target.value)}
              />
          </Form.Item>
          <Form.Item>
              <Input
                type="password"
                placeholder="Password"
                onChange={e=>setPassword(e.target.value)}
              />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <Button type="primary" className="login-form-button" onClick={handleSubmit}>
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;