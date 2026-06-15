import { Mail } from "@/mail/components/mail";
import { accounts, mails } from "@/mail/data";

export default function MailPage() {
  return <Mail accounts={accounts} mails={mails} navCollapsedSize={4} />;
}
