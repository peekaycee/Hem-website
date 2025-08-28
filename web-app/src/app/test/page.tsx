"use client";

import { useRef, useEffect } from "react";

export default function TestPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add("active");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const mouseLeave = () => {
      isDown = false;
      el.classList.remove("active");
    };

    const mouseUp = () => {
      isDown = false;
      el.classList.remove("active");
    };

    const mouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1; // scroll speed
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("mouseleave", mouseLeave);
    el.addEventListener("mouseup", mouseUp);
    el.addEventListener("mousemove", mouseMove);

    return () => {
      el.removeEventListener("mousedown", mouseDown);
      el.removeEventListener("mouseleave", mouseLeave);
      el.removeEventListener("mouseup", mouseUp);
      el.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Pure JS Grab Scroll</h2>
      <div
        ref={scrollRef}
        style={{
          overflowX: "scroll",
          cursor: "grab",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "100%",
          whiteSpace: "nowrap",
        }}
      >
        <table style={{ borderCollapse: "collapse", minWidth: "1200px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Col 1</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Col 2</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Col 3</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Col 4</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Col 5</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Col 6</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Data 1</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Data 2</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Data 3</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Data 4</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Data 5</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>Data 6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
