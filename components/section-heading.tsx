type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  copy
}: SectionHeadingProps) {
  return (
    <div className="mb-10 border-b border-supreme-ink/10 pb-6 lg:flex lg:items-end lg:justify-between lg:gap-8">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title mt-3">{title}</h2>
      </div>
      {copy ? <p className="section-copy mt-4 lg:mt-0">{copy}</p> : null}
    </div>
  );
}
