import type { ReactNode } from "react";

type SynergyNameHeaderProps = {
  children: ReactNode;
  count: number;
};

export default function SynergyNameHeader({
  children,
  count,
}: SynergyNameHeaderProps) {
  return <h2 className="synergy-name-header">{children} ({count})</h2>;
}
