import React, { useEffect } from "react";
import { LoaderFunctionArgs, redirect, useNavigate, useNavigation } from "react-router-dom";
import { Copy, ShoppingCart } from "lucide-react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

//^ lib
import { getAuthToken } from "@/lib/is-auth";

//^ http requests
import { postLoginHandler } from "@/http/post";
import { LoginContext } from "@/http/post/types";

//^shadcn-ui
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

//^ ui-component
import TextField from "@/components/ui-component/input/TextField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ErrorAlert from "@/components/error-message";
import Spinner from "@/components/ui-component/spinner/Spinner";

export default function LoginPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  const schema = yup.object().shape({
    emailId: yup.string().email("Invalid email address").required("Email is required."),
    password: yup.string().required("Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      loginMutate({ email: values.emailId, password: values.password });
    },
  });

  const insertUserFormHandler = (
    _event: React.MouseEvent<HTMLButtonElement>,
    data: { email: string; password: string }
  ) => {
    formik.setFieldValue("emailId", data.email, false);
    formik.setFieldValue("password", data.password, false);
  };

  const {
    isPending: loginIsPending,
    isError: loginIsError,
    error: loginError,
    mutate: loginMutate,
    reset: loginReset,
  } = useMutation<any, any, LoginContext>({
    mutationKey: ["login"],
    mutationFn: postLoginHandler,
    onSuccess: (data) => {
      toast.success("200", { description: data.message, position: "bottom-right" });
      const parsedToken = JSON.stringify(data.token);
      localStorage.setItem("auth_token", parsedToken);
      navigate("/");
    },
  });

  useEffect(() => {
    if (loginIsError) {
      if (loginError.code === 422) {
        formik.setFieldError(loginError?.info?.field, loginError?.info?.message);
      }
    }
  }, [loginError, loginIsError]);

  return (
    <>
      {loginIsError && (
        <>
          {() => loginReset()}
          {loginError.code !== 422 ? (
            <ErrorAlert
              title={`Error code: ${loginError?.code || 500}`}
              subTitle={`Message: ${
                loginError?.info?.error?.message
                  ? loginError?.info?.error?.message
                  : (loginError?.info && loginError?.info?.message) || "Something went wrong"
              }`}
              onConformed={() => {
                loginReset();
              }}
              clg={loginError?.info}
            />
          ) : (
            ""
          )}
        </>
      )}
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner className="w-12 h-12 text-slate-600" />
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="flex items-center justify-center h-screen bg-gray-200">
          <Card className="md:min-w-[30rem] w-[25rem] border-none shadow-none">
            <CardHeader className="items-center">
              <div className="flex gap-3 text-slate-600 items-center">
                <ShoppingCart strokeWidth={2} className="w-8 h-8" />
                <p className="font-medium text-2xl protest-riot">Easy Mart</p>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-5">
              <CardDescription className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <TextField
                      label="Email ID"
                      name="emailId"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.emailId}
                      hasError={formik.errors.emailId && formik.touched.emailId ? true : false}
                      errorMessage={formik.errors.emailId}
                      required
                    />
                    <TextField
                      label="Password"
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      hasError={formik.errors.password && formik.touched.password ? true : false}
                      errorMessage={formik.errors.password}
                      required
                    />
                  </div>
                  <Button size={"lg"} type="submit" className="flex gap-3 items-center" disabled={loginIsPending}>
                    <span>Login</span>
                    {loginIsPending ? <Spinner /> : ""}
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center flex-col gap-4">
                  <p className="font-semibold">Demo account login credential</p>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex justify-between items-center w-full text-sm">
                      <p>User 1</p>
                      <p>johndoe@gmail.com</p>
                      <p>123456</p>
                      <div>
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger type="button">
                              <Button
                                size={"icon"}
                                variant={"outline"}
                                type="button"
                                onClick={(event) =>
                                  insertUserFormHandler(event, { email: "johndoe@gmail.com", password: "123456" })
                                }
                              >
                                <Copy className="w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent align="center">Click to copy user 1 credential</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="flex justify-between items-center w-full text-sm">
                      <p>User 2</p>
                      <p>janesmith@gmail.com</p>
                      <p>123456</p>
                      <div>
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger type="button">
                              <Button
                                size={"icon"}
                                variant={"outline"}
                                type="button"
                                onClick={(event) =>
                                  insertUserFormHandler(event, { email: "janesmith@gmail.com", password: "123456" })
                                }
                              >
                                <Copy className="w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent align="center">Click to copy user 2 credential</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </CardDescription>
            </CardContent>
          </Card>
        </form>
      )}
    </>
  );
}

export async function loader(_args: LoaderFunctionArgs) {
  const token = getAuthToken();

  if (token) {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify-user`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();

      const error: any = new Error("An Error occurred while verifying the user.");

      error.code = response.status;
      error.info = errorData;

      return null;
    }

    return redirect("/");
  }

  return null;
}
