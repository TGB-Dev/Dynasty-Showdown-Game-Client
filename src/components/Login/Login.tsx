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
          <Card.Title>Sign up</Card.Title>
          <Card.Description>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field label="Username" errorText={errors.username?.message}>
              <Input
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
              />
            </Field>
            <Field label="Password" errorText={errors.password?.message}>
              <Input
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
            </Field>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" variant="solid">
            Log in
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
}

export default Login;
