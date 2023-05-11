import React, { useState,useEffect, useMemo } from "react";
import { Form, Input, Button,Checkbox,notification } from 'antd';
import './style.css';

function Register() {
  const [email,setEmail]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [repassword,setRepassword]=useState("");


  const openNotificationWithIcon = (type,title,text) => {
    notification[type]({
      message: title,
      description:text,
    });
  };

  let handleSubmit = e => {
    e.preventDefault();
    if(email!="" && password!="" && username!="" && repassword!=""){
      if(repassword==password){
        $.ajax({
          type:"post",
          url:"http://localhost:3007/register",
          data:{
              email: email,
              password:password,
              username:username
          },
          success:function(data){
            openNotificationWithIcon('success','Register Tips',data.message);
            setTimeout(function(){
              window.location.href="/";
            },2000);
          },
          error:function(data){
            openNotificationWithIcon('error','Register Tips',data.responseJSON.message);
          }
        });
      }else{
        openNotificationWithIcon('error','Register Tips','The two passwords must be the same!');
      }
    }else{
      openNotificationWithIcon('error','Register Tips','The registration information cannot be empty');
    }
  };

  return (
    <div>
      <div className="form_box">
        <h2>Register</h2>
        <Form layout="inline">
          <Form.Item>
              <Input
                placeholder="Email"
                onChange={e=>setEmail(e.target.value)}
              />
          </Form.Item>
          <Form.Item>
              <Input
                placeholder="Username"
                onChange={e=>setUsername(e.target.value)}
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
              <Input
                type="password"
                placeholder="Re-Password"
                onChange={e=>setRepassword(e.target.value)}
              />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="register-form-button"  onClick={handleSubmit}>
              Register
            </Button>
            Or <a href="/">Back Login!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;