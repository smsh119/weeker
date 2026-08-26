import { useEffect } from "react";

const SITE_NAME = "Weeker";

const upsertMetaTag = (name, content) => {
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const usePageMeta = ({ title, description, noindex = false } = {}) => {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) {
      document.title = `${SITE_NAME} – ${title}`;
    }
    if (description) {
      upsertMetaTag("description", description);
    }
    upsertMetaTag("robots", noindex ? "noindex, follow" : "index, follow");
    return () => {
      document.title = previousTitle;
    };
  }, [title, description, noindex]);
};

export default usePageMeta;
