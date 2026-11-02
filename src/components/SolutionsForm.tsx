"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import { SOLUTION_TOPICS } from "@/lib/solutions";

// The /solutions contact form with its topic select. Each "Ask about this"
// link on the page is a real link to /solutions?topic=<id>#start (works with
// no JavaScript and from other pages); with JavaScript the click is caught
// here so the page does not reload: the topic is preselected, the URL updated
// and the form scrolled into view. Ids outside SOLUTION_TOPICS are ignored.
const isTopic = (v: string | null): v is string => !!v && SOLUTION_TOPICS.some((t) => t.id === v);

export default function SolutionsForm() {
  const [topic, setTopic] = useState("");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("topic");
    if (isTopic(fromUrl)) setTopic(fromUrl);

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[data-topic]");
      const id = link?.getAttribute("data-topic") ?? null;
      const start = document.getElementById("start");
      if (!isTopic(id) || !start) return;
      e.preventDefault();
      setTopic(id);
      window.history.replaceState(window.history.state, "", `?topic=${id}#start`);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      start.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      document.getElementById("cf-topic")?.focus({ preventScroll: true });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <ContactForm
      source="solutions"
      topics={SOLUTION_TOPICS}
      topic={topic}
      onTopicChange={setTopic}
      messageLabel="What's the problem?"
      messagePlaceholder="What happens today, who does it, and roughly how long it takes each week."
      submitLabel="Send it →"
    />
  );
}
