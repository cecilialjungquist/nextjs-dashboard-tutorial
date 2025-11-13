"use server";

import { z } from "zod"; // Handle validation
import postgres from "postgres";
import { revalidatePath } from "next/cache"; // Revalidate cache upon invoice creation
import { redirect } from "next/navigation"; // Redirect after form submission

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Then functions in this file can be included in both server and client components
// Any functions that are not used will be automatically removed from the final build

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // TODO: Add error handling

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
