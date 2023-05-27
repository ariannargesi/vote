import Button from "@/features/Button";
import Input, { Label } from "@/features/form";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react"

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="mt-32 px-8">
    <h1 className="text-3xl font-bold">خوش اومدی!</h1>
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Label>
        آدرس ایمیل خودت را وارد کن!
        <Input type="email" id="email" name="email" required />
      </Label>
      <Button type="submit" color="info" full>ورود</Button>
    </form>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}