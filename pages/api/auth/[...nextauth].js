import clientPromise from "@/server-logic/db/setup";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { Session } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";

const authOption = NextAuth({
  pages: {
    verifyRequest: "/verify",
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    redirect(params) {
      switch (params.url) {
        case process.env.NEXTAUTH_URL:
          return undefined;
        default:
          return params.url;
      }
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      token.id = 'hello-world'
      return token;
    },
    async session({ session, token, user }) {
        session.user.name = 'javad'
        session.user.customID = 'hello-world'
        session.user.id = 'id field'
      // Send properties to the client, like an access_token and user id from a provider.
    
      return session;
    },
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
});

export default authOption;

async function sendVerificationRequest(params) {
  const { identifier, url, provider, theme } = params;

  const { host } = new URL(url);
  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  const transport = createTransport(provider.server);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: "ایمیل تایید حساب - وی‌پُل 🔵",
    text: text({ url, host }),
    html: html({ url, host, theme }),
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params) {
  let { url, host, theme } = params;
  return `
        <body>
            <p dir='rtl'>برای تایید حساب، لطفا لینک زیر رو کپی و در مرورگرت وارد کن.</p>
            <a href="${url}">${url}</a>           
        </body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }) {
  return "ایمیل تایید حساب - وی‌پُل 🔵";
}
