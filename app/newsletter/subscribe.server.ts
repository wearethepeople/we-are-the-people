// Provider not yet chosen (Mailchimp/Buttondown/etc. TBD). Callers only
// need this shape; swap the body for a real provider call when one lands.
export async function subscribe(email: string): Promise<void> {
  console.log(`[newsletter] subscribe: ${email}`);
}
