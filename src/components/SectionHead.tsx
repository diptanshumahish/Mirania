import type { ReactNode } from "react";

export default function SectionHead({
  title,
  count,
  children,
  id,
}: {
  title: string;
  count?: number | string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <div className="sec-head" id={id}>
      <div className="sec-head__title">
        <h2 className="h2">{title}</h2>
        {count !== undefined && <span className="counter sec-head__count">{count}</span>}
      </div>
      {children && <div className="sec-head__desc t-lg balance">{children}</div>}
    </div>
  );
}
