import { useNavigation } from "react-router";
import { WrtpIcon } from "~/components/wrtp-icon";
import { WrtpTextHorizontal } from "~/components/wrtp-text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { OrangeUnderline } from "~/components/visual-grammar";
import { subscribe } from "~/newsletter/subscribe.server";
import type { Route } from "./+types/home";

export function meta() {
  return [
    { title: "We (ARE) The People" },
    {
      name: "description",
      content:
        "We (ARE) The People is a civic identity project. We are not labels. We are not parties. We are neighbors learning to hear each other again — and we begin together.",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "");

  if (!email.includes("@")) {
    return { ok: false, error: "Enter a valid email address." };
  }

  try {
    await subscribe(email);
    return { ok: true };
  } catch {
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

const PROJECTS = [
  {
    title: "It's Our Money",
    href: "https://itsourmoney.us",
    domain: "itsourmoney.us",
    body: "Your money is yours, but you've never had a chance to direct where it should go. Now you can.",
  },
  {
    title: "What's Your Take?",
    href: "https://whatsyourtake.us",
    domain: "whatsyourtake.us",
    body: "A pop-up civic guestbook crossing the country, asking everyone the same question. Together the answers become a civic mirror: who we are, and what we believe, when we speak outside of feeds and algorithms.",
  },
];

export default function Home({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const submitting = navigation.state === "submitting";
  const submitted = actionData?.ok === true;

  return (
    <div className="flex min-h-screen flex-col items-center bg-background px-6 text-foreground">
      <div className="flex w-full max-w-160 flex-col">
        <header className="flex items-center gap-3.5 pt-10">
          <WrtpIcon className="h-8 w-7.5 text-accent" />
          <WrtpTextHorizontal className="h-5 text-foreground" />
        </header>

        <main className="flex flex-col">
          <section className="pt-24 pb-18">
            <h1 className="m-0 text-pretty text-[clamp(40px,7vw,64px)] leading-[1.05] font-medium tracking-[-0.02em]">
              <OrangeUnderline>Heard</OrangeUnderline> people
              <br />
              <OrangeUnderline>hear</OrangeUnderline> people.
            </h1>
            <p className="mt-12 max-w-[46ch] text-pretty text-[clamp(17px,2.4vw,20px)] leading-[1.55]">
              We (ARE) The People is a civic identity project.<br/>No labels. No parties. We begin together.
            </p>
          </section>

          <section className="flex flex-col pb-22">
            <div className="border-b border-border pb-5 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
              What we're up to
            </div>

            {PROJECTS.map((project) => (
              <a
                key={project.href}
                href={project.href}
                target="_blank"
                rel="noopener"
                className="group block border-b border-border py-8 no-underline transition-colors duration-150"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h2 className="m-0 text-[clamp(24px,4vw,30px)] font-medium tracking-[-0.01em] text-foreground group-hover:text-accent">
                    {project.title}
                  </h2>
                  <span className="text-sm text-foreground/60 group-hover:text-accent">
                    {project.domain}&nbsp;&#8599;
                  </span>
                </div>
                <p className="mt-3 max-w-[52ch] text-pretty text-[17px] leading-[1.5] text-foreground">
                  {project.body}
                </p>
              </a>
            ))}
          </section>

          {/*<section className="pb-24">
            <h2 className="m-0 text-[clamp(24px,4vw,30px)] font-medium tracking-[-0.01em]">
              Stay updated.
            </h2>
            <p className="mt-3 mb-6 max-w-[48ch] text-pretty text-[17px] leading-[1.5] text-foreground/75">
              An occasional letter about where the table is headed and what we&rsquo;re up to. No noise,
              no spin.
            </p>

            {submitted ? (
              <div className="rounded-[2px] border border-input bg-white/40 px-5 py-[18px] text-base leading-normal">
                Thank you. You&rsquo;re in!
              </div>
            ) : (
              <form method="post" action="?index" className="flex flex-wrap gap-2.5">
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="h-auto min-w-0 flex-1 basis-60 rounded-[2px] border-input bg-white/55 px-4 py-3.5 text-base placeholder:text-foreground/40 focus-visible:border-foreground focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-auto flex-none rounded-[2px] bg-primary px-7 py-3.5 text-base font-medium text-primary-foreground hover:bg-accent hover:text-foreground"
                >
                  Join us
                </Button>
              </form>
            )}
            {actionData?.ok === false && (
              <div className="mt-3 rounded-[2px] border border-input bg-white/40 px-5 py-[18px] text-base leading-normal">
                {actionData.error}
              </div>
            )}
          </section>*/}
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-border pt-6 pb-10 text-[13px] text-foreground/60">
          <span>&copy; 2026 We (ARE) The People</span>
          <span>
            We're not red&ensp;&middot;&ensp;We're not blue&ensp;&middot;&ensp;We are the People
          </span>
        </footer>
      </div>
    </div>
  );
}
