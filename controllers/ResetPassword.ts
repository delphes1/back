import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
export default {
  async reset(email: string, username: string) {
    const client = new SmtpClient();

    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 587,
      username: "delphus1998@gmail.com",
      password: "",
    });
    await client.send({
      from: "delphus1998@gmail.com",
      to: email,
      subject: "RESET PASSWORD",
      content: "haha",
    });

    await client.close();
  },
};
