"use client";

import axios from "axios";

const REQUEST_TIMEOUT = 1000;

export const requests = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  timeout: REQUEST_TIMEOUT,
});
