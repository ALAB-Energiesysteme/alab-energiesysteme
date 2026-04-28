"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type AssetScript = {
  src: string;
  id?: string;
};

type LegacyPageEmbedProps = {
  html: string;
  cssHrefs?: string[];
  scriptSrcs?: AssetScript[];
  externalStyleHrefs?: string[];
  useIsolatedFrame?: boolean;
  inlineCssText?: string;
  frameSrc?: string;
};

const TEXT_FIXES: Array<[string, string]> = [
  ["Ã„", "Ä"],
  ["Ã¤", "ä"],
  ["Ã–", "Ö"],
  ["Ã¶", "ö"],
  ["Ãœ", "Ü"],
  ["Ã¼", "ü"],
  ["ÃŸ", "ß"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["â€ž", "„"],
  ["â€œ", "“"],
  ["â€š", "‚"],
  ["â€", "”"],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€¦", "…"],
  ["â€¢", "•"],
  ["âœ“", "✓"],
  ["â†’", "→"],
  ["âˆ’", "−"],
  ["Â·", "·"],
  ["Ï†", "φ"],
  ["Â", ""],
];

function normalizeLegacyText(input: string) {
  const normalized = TEXT_FIXES.reduce(
    (result, [searchValue, replaceValue]) =>
      result.split(searchValue).join(replaceValue),
    input
  );

  return normalized
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<\/?(html|body)\b[^>]*>/gi, "")
    .replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, "");
}

function appendStylesheet(href: string) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
  return link;
}

function appendScript({ src, id }: AssetScript) {
  const script = document.createElement("script");
  script.async = false;
  script.src = src;
  if (id) {
    script.dataset.legacyScriptId = id;
  }
  document.body.appendChild(script);
  return script;
}

export default function LegacyPageEmbed({
  html,
  cssHrefs = [],
  scriptSrcs = [],
  externalStyleHrefs = [],
  useIsolatedFrame = false,
  inlineCssText = "",
  frameSrc,
}: LegacyPageEmbedProps) {
  const normalizedHtml = normalizeLegacyText(html);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState(8000);
  const rawId = useId();
  const frameId = useMemo(
    () => `legacy-frame-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [rawId]
  );

  const frameSrcDoc = useMemo(() => {
    if (!useIsolatedFrame || frameSrc) {
      return "";
    }

    const stylesheetTags = [...cssHrefs, ...externalStyleHrefs]
      .map((href) => `<link rel="stylesheet" href="${href}">`)
      .join("");
    const scriptTags = scriptSrcs
      .map((script) => `<script src="${script.src}" defer><\/script>`)
      .join("");

    return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>html,body{margin:0;padding:0;background:#fff;overflow:visible;}</style>
    ${inlineCssText ? `<style>${inlineCssText}</style>` : ""}
    ${stylesheetTags}
  </head>
  <body>
    ${normalizedHtml}
    ${scriptTags}
    <script>
      (function () {
        var frameId = ${JSON.stringify(frameId)};
        var lastSentHeight = 0;
        var maxHeight = 50000;
        var pendingRaf = false;
        var settled = false;
        var settleCount = 0;

        function measureHeight() {
          /* Sum up all direct children of body to get true content height */
          var children = document.body.children;
          var total = 0;
          for (var i = 0; i < children.length; i++) {
            var child = children[i];
            /* skip script/style tags */
            var tag = child.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE') continue;
            var rect = child.getBoundingClientRect();
            var bottom = rect.top + window.scrollY + rect.height;
            if (bottom > total) total = bottom;
          }
          /* Add small padding */
          total = Math.ceil(total) + 32;
          return Math.min(total, maxHeight);
        }

        function sendHeight() {
          if (pendingRaf) return;
          pendingRaf = true;
          requestAnimationFrame(function () {
            pendingRaf = false;
            var height = measureHeight();
            if (height < 100) return; /* not rendered yet */
            if (Math.abs(height - lastSentHeight) > 5) {
              lastSentHeight = height;
              settleCount = 0;
              parent.postMessage({ type: "legacy-frame-height", frameId: frameId, height: height }, "*");
            } else {
              settleCount++;
              if (settleCount > 5) settled = true;
            }
          });
        }

        /* Only observe mutations until height settles */
        var mutationObserver = new MutationObserver(function () {
          if (!settled) sendHeight();
        });

        if (document.body) {
          mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
          });
        }

        window.addEventListener("load", function () {
          sendHeight();
          setTimeout(sendHeight, 200);
          setTimeout(sendHeight, 500);
          setTimeout(sendHeight, 1500);
          setTimeout(sendHeight, 4000);
        });

        window.addEventListener("resize", function () {
          settled = false;
          settleCount = 0;
          sendHeight();
        });
        document.addEventListener("click", function () {
          settled = false;
          settleCount = 0;
          setTimeout(sendHeight, 100);
          setTimeout(sendHeight, 500);
        });
        document.addEventListener("input", function () {
          setTimeout(sendHeight, 100);
        });
        document.addEventListener("transitionend", sendHeight);

        /* Initial measurements */
        sendHeight();
        setTimeout(sendHeight, 50);
      })();
    <\/script>
  </body>
</html>`;
  }, [
    cssHrefs,
    externalStyleHrefs,
    frameId,
    inlineCssText,
    normalizedHtml,
    scriptSrcs,
    useIsolatedFrame,
    frameSrc,
  ]);

  useEffect(() => {
    if (!useIsolatedFrame || !frameSrc) {
      return;
    }

    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let iframeCleanup: (() => void) | null = null;

    const connectFrame = () => {
      const iframe = frameRef.current;
      const doc = iframe?.contentDocument;
      const win = iframe?.contentWindow;

      if (!iframe || !doc || !win) {
        return;
      }

      const updateHeight = () => {
        const bodyHeight = doc.body ? doc.body.scrollHeight : 0;
        const docHeight = doc.documentElement ? doc.documentElement.scrollHeight : 0;
        const nextHeight = Math.max(bodyHeight, docHeight, 1000);
        setFrameHeight((prev) =>
          Math.abs(prev - nextHeight) > 2 ? nextHeight : prev
        );
      };

      if (inlineCssText && !doc.querySelector("style[data-legacy-inline-style]")) {
        const style = doc.createElement("style");
        style.setAttribute("data-legacy-inline-style", "true");
        style.textContent = inlineCssText;
        doc.head.appendChild(style);
      }

      resizeObserver = new ResizeObserver(updateHeight);
      if (doc.body) {
        resizeObserver.observe(doc.body);
      }
      if (doc.documentElement) {
        resizeObserver.observe(doc.documentElement);
      }

      mutationObserver = new MutationObserver(() => {
        win.requestAnimationFrame(updateHeight);
      });

      if (doc.body) {
        mutationObserver.observe(doc.body, {
          attributes: true,
          childList: true,
          subtree: true,
          characterData: true,
        });
      }

      const delayedUpdate = () => {
        updateHeight();
        win.setTimeout(updateHeight, 120);
        win.setTimeout(updateHeight, 600);
      };

      win.addEventListener("resize", delayedUpdate);
      doc.addEventListener("click", delayedUpdate);
      doc.addEventListener("input", delayedUpdate);
      doc.addEventListener("change", delayedUpdate);
      updateHeight();
      win.setTimeout(updateHeight, 120);
      win.setTimeout(updateHeight, 600);

      iframeCleanup = () => {
        win.removeEventListener("resize", delayedUpdate);
        doc.removeEventListener("click", delayedUpdate);
        doc.removeEventListener("input", delayedUpdate);
        doc.removeEventListener("change", delayedUpdate);
      };
    };

    const handleLoad = () => {
      iframeCleanup?.();
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      connectFrame();
    };

    const iframe = frameRef.current;
    iframe?.addEventListener("load", handleLoad);
    connectFrame();

    return () => {
      iframe?.removeEventListener("load", handleLoad);
      iframeCleanup?.();
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [frameSrc, inlineCssText, useIsolatedFrame]);

  useEffect(() => {
    if (useIsolatedFrame) {
      return;
    }

    const styleNodes = [...cssHrefs, ...externalStyleHrefs].map((href) =>
      appendStylesheet(href)
    );
    const inlineStyleNode = inlineCssText
      ? (() => {
          const style = document.createElement("style");
          style.textContent = inlineCssText;
          document.head.appendChild(style);
          return style;
        })()
      : null;
    const scriptNodes = scriptSrcs.map((script) => appendScript(script));
    let isDisposed = false;

    const whenScriptsReady = scriptNodes.map(
      (node) =>
        new Promise<void>((resolve) => {
          node.addEventListener("load", () => resolve(), { once: true });
          node.addEventListener("error", () => resolve(), { once: true });
        })
    );

    Promise.all(whenScriptsReady).then(() => {
      if (isDisposed) {
        return;
      }

      document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
      window.dispatchEvent(new Event("load"));
      window.requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
      });
    });

    return () => {
      isDisposed = true;
      styleNodes.forEach((node) => node.remove());
      inlineStyleNode?.remove();
      scriptNodes.forEach((node) => node.remove());
    };
  }, [cssHrefs, externalStyleHrefs, inlineCssText, scriptSrcs, useIsolatedFrame]);

  useEffect(() => {
    if (!useIsolatedFrame) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== frameRef.current?.contentWindow) {
        return;
      }

      if (
        typeof event.data !== "object" ||
        event.data === null ||
        event.data.type !== "legacy-frame-height" ||
        event.data.frameId !== frameId
      ) {
        return;
      }

      if (typeof event.data.height === "number" && event.data.height > 0 && event.data.height < 50000) {
        setFrameHeight((prev) => Math.abs(prev - event.data.height) > 2 ? event.data.height : prev);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [frameId, useIsolatedFrame]);

  if (useIsolatedFrame) {
    return (
      <iframe
        ref={frameRef}
        title={frameId}
        src={frameSrc}
        srcDoc={frameSrc ? undefined : frameSrcDoc}
        allow="autoplay"
        style={{ width: "100%", height: `${frameHeight}px`, border: "0", display: "block" }}
      />
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: normalizedHtml }} />;
}
