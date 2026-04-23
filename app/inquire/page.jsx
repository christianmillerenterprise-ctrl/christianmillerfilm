const INQUIRE_SIDE_IMAGE = "/images/inquire/miami-shoot-3.jpg";

export const metadata = {
  title: "Inquire — Christian Miller",
  description:
    "Begin an inquiry for portraits, pregnancy, weddings, graduations, or editorial work.",
};

// -----------------------------------------------------------------------------
// The form posts to Formspree. Set FORM_ID below after creating a free form
// at https://formspree.io — the free plan handles 50 submissions/month, no
// backend needed.
// -----------------------------------------------------------------------------
const FORM_ID = "mzdyyaob";
const FORM_ACTION = `https://formspree.io/f/${FORM_ID}`;

export default function InquirePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-12 md:gap-14 md:px-10">
        {/* Side image — fills the mat; object-cover avoids letterboxing inside the frame */}
        <div className="hidden md:col-span-6 md:block">
          <div className="md:sticky md:top-28 md:self-start">
            <div className="halation-frame overflow-hidden rounded-sm border-2 border-gold bg-paper">
              <div className="relative h-[min(88vh,920px)] w-full min-h-[560px] overflow-hidden bg-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={INQUIRE_SIDE_IMAGE}
                  alt="Editorial portrait, Miami"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_42%]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-6">
          <p className="label mb-4">Commissions & inquiries</p>
          <h1 className="font-display text-4xl md:text-5xl italic leading-tight">
            Let’s begin a conversation.
          </h1>
          <p className="mt-6 text-ink/80 max-w-prose2 text-[1.05rem] leading-relaxed">
            Tell me a little about what you have in mind — the occasion, a
            date if you have one, a place. I read every inquiry personally
            and reply within a day or two.
          </p>

          <form
            action={FORM_ACTION}
            method="POST"
            className="mt-10 space-y-6 max-w-xl"
          >
            <Field label="Your name" name="name" required />
            <Field
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
            <SelectField
              label="What’s the occasion?"
              name="occasion"
              options={[
                "Wedding",
                "Engagement",
                "Pregnancy",
                "Portrait",
                "Graduation",
                "Editorial / brand",
                "Other",
              ]}
            />
            <Field
              label="Tentative date (if any)"
              name="date"
              type="text"
              placeholder="e.g. October 2026, or flexible"
            />
            <Field
              label="Location"
              name="location"
              placeholder="City, or venue if known"
            />
            <TextArea
              label="Tell me about it"
              name="message"
              required
              placeholder="What kind of story would you like to tell? Any inspirations, references, or specifics are welcome."
            />

            {/* Honeypot anti-spam field — hidden from humans */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <button
              type="submit"
              className="label border border-ink px-8 py-4 hover:bg-ink hover:text-paper transition-colors"
            >
              Send inquiry
            </button>
            <p className="text-xs text-ink/50 italic">
              Or email directly:{" "}
              <a
                className="underline hover:text-rust"
                href="mailto:christianmillerenterprise@gmail.com"
              >
                christianmillerenterprise@gmail.com
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Field components — plain, editorial, no flashy animations                  */
/* -------------------------------------------------------------------------- */

function Field({ label, name, type = "text", required, ...rest }) {
  return (
    <label className="block">
      <span className="label block mb-2">
        {label}
        {required && <span className="text-rust"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2 text-ink placeholder:text-ink/40 font-serif text-[1.05rem]"
        {...rest}
      />
    </label>
  );
}

function SelectField({ label, name, options, required }) {
  return (
    <label className="block">
      <span className="label block mb-2">
        {label}
        {required && <span className="text-rust"> *</span>}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2 text-ink font-serif text-[1.05rem]"
      >
        <option value="" disabled>
          Select one…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, name, required, ...rest }) {
  return (
    <label className="block">
      <span className="label block mb-2">
        {label}
        {required && <span className="text-rust"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={6}
        className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2 text-ink placeholder:text-ink/40 font-serif text-[1.05rem] resize-y"
        {...rest}
      />
    </label>
  );
}
