"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { Button, Card, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { toaster } from "../ui/toaster";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

interface LoginFormFields {
  username: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const toastId = toaster.create({
      type: "loading",
      title: "Đăng nhập",
      description: "Đang đăng nhập...",
    });

    await login(data)
      .then((loginSuccess) => {
        if (loginSuccess) {
          toaster.upsert({
            id: toastId,
            title: "Đăng nhập",
            description: "Đăng nhập thành công",
            type: "success",
          });
          router.push("/games");
        } else {
          toaster.upsert({
            id: toastId,
            title: "Đăng nhập",
            description: "Sai thông tin đăng nhập, vui lòng thử lại",
            type: "info",
          });
        }
      })
      .catch(() => {
        toaster.upsert({
          id: toastId,
          title: "Đăng nhập",
          description: "Đã xảy ra lỗi, vui lòng thử lại",
          type: "error",
        });
      });
  };

  return (
    <Card.Root as="form" w="lg" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Card.Title>Đăng nhập tài khoản</Card.Title>
      </Card.Header>

      <Card.Body as={Stack} gap="4">
        <Field
          label="Tên đăng nhập"
          errorText={errors.username?.message}
          invalid={errors.username !== undefined}
        >
          <Input
            placeholder="Tên đăng nhập"
            disabled={isSubmitting}
            {...register("username", {
              required: "Chưa điền tên đăng nhập",
            })}
          />
        </Field>

        <Field
          label="Mật khẩu"
          errorText={errors.password?.message}
          invalid={errors.password !== undefined}
        >
          <Input
            type="password"
            placeholder="Mật khẩu"
            disabled={isSubmitting}
            {...register("password", { required: "Chưa điền mật khẩu" })}
          />
        </Field>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
        <Button type="submit" variant="solid" w="full" disabled={isSubmitting}>
          Đăng nhập
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}
