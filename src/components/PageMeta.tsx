import { useEffect } from "react";

type PageMetaProps = { title: string; description: string };

/** Sets document.title and the meta description for the current page, restoring them on unmount. */
export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    const previousTitle = document.title;
    let meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const created = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.append(meta);
    }
    const previousDescription = meta.content;
    document.title = title;
    meta.content = description;
    return () => {
      document.title = previousTitle;
      if (created) meta?.remove();
      else if (meta) meta.content = previousDescription;
    };
  }, [title, description]);
  return null;
}
