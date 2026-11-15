import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageMeta } from "./PageMeta";
import { ScrollToTop } from "./ScrollToTop";

type LayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  /** Campaign pages use a slimmer header and footer. */
  focused?: boolean;
};

export function Layout({
  children,
  title,
  description,
  focused = false,
}: LayoutProps) {
  return (
    <>
      <PageMeta title={title} description={description} />
      <ScrollToTop />
      <Header focused={focused} />
      <main>{children}</main>
      <Footer focused={focused} />
    </>
  );
}
