"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { useAuthStore } from "@/hooks/auth/useAuthStore";
import { toaster } from "../ui/toaster";
import { useRouter } from "next/navigation";

interface FormValues {
  username: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const fetch = useAuthStore((state) => state.fetch);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await fetch(data.username);
    const { chosen } = useAuthStore.getState();

    console.log(chosen, data);

    if (
      chosen.username === data.username &&
      chosen.password === data.password
    ) {
      toaster.create({
        title: "Success",
        description: "Log in successful",
        type: "success",
      });
      router.push("/games");
    } else {
      toaster.create({
        title: "Error",
        description: "Log in failed",
        type: "error",
      });
    }
  };

  return (
    <Card.Root size="lg">
      <Card.Header>
        <Card.Title>Đăng nhập tài khoản</Card.Title>
      </Card.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <PasswordInput
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
      </form>
    </Card.Root>
  );
}

export default Login;
