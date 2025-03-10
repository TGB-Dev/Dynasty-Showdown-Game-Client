"use client";

import { useForm } from "react-hook-form";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card.Root maxW="sm">
        <Card.Header>
          <Card.Title>Đăng nhập tài khoản</Card.Title>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field label="Tên đăng nhập" errorText={errors.username?.message}>
              <Input
                placeholder="Tên đăng nhập"
                {...register("username", {
                  required: "Chưa điền tên đăng nhập",
                })}
              />
            </Field>
            <Field label="Mật khẩu" errorText={errors.password?.message}>
              <Input
                placeholder="Mật khẩu"
                {...register("password", { required: "Chưa điền mật khẩu" })}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">Thoát</Button>
          <Button type="submit" variant="solid">
            Đăng nhập
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
}

export default Login;
