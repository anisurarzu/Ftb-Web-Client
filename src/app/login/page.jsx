"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "@/context/AuthContext";
import coreAxios from "@/components/coreAxios/Axios";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();

  const redirectTo = searchParams.get("redirect") || "/";

  if (user) {
    router.push(redirectTo);
    return null;
  }

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await coreAxios.post("/auth/web-login", values);

      message.success("Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify({
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        loginHistory: data.loginHistory,
      }));

      login({ ...data });
      router.push(redirectTo);
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        error.response?.data?.message || "An error occurred during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Company Logo"
            className="h-16 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-[#061A6E]">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Please login to your account</p>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="mt-6"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter your username" size="large" className="py-2" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" className="py-2" />
          </Form.Item>

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-[#061A6E] hover:bg-[#0d2b9e] h-12 font-medium text-lg"
              size="large"
            >
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              {"Don't have an account?"}{" "}
              <a href="/register" className="text-[#061A6E] hover:underline font-medium">
                Register now
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
