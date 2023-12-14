import { z } from "zod";
import { signIn } from "../../../auth";

const schema = z.object({
  username: z.string({
    invalid_type_error: "Invalid Username",
  }),
  password: z.string({
    invalid_type_error: "Invalid Password",
  }),
});

export const POST = async (req: Request) => {
  const body = await req.json();
  const validatedFields = schema.safeParse(body);
  if (!validatedFields.success) {
    return Response.json(
      { error: validatedFields.error },
      { status: 400, statusText: "Invalid credentials" }
    );
  }

  try {
    await signIn("credentials", {
      ...validatedFields.data,
      redirect: false,
    });
    return Response.json({ loggedIn: true });
  } catch (err) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }
};
