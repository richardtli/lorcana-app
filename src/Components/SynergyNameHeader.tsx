import type { ReactNode } from "react";

type SynergyNameHeaderProps = {
  children: ReactNode;
};

export default function SynergyNameHeader({
  children,
}: SynergyNameHeaderProps) {
  return <h2>{children}</h2>;
}
