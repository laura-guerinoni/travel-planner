# travel-planner

Single-file trip planner (`index.html`, no build step), hosted on GitHub Pages and synced through Firebase.

## October 2026 redesign

- **Book look:** the calendar is a page in a stack, on a pastel backdrop (Menu → Background: starry or minimal; both follow the theme).
  Alternatives are tabs along the top, months are tabs on the left edge, and switching either turns the page.
- **Plans and alternatives:** a month can hold several separate plans, each with one or more alternatives. Alternatives of one plan sit
  close together; "+" asks whether you're adding an alternative or a new plan; a tab's menu can join it to / split it from a plan.
  Saved per alternative as `pl` / `pn`; older data (no `pl`) is one plan per tab.
- **Spans:** "Add holiday period" and "Add location" (tab menu) take a from/to range and can run into later months.
- **Month column:** full month names, years as headings, other years collapsed (Menu → Collapse other years), "+" adds a month.
- **Star ribbon:** star the alternatives you prefer (stored per browser).
- **Fixes:** calendar top spacing collapsing on every second layout pass, stale payment overview after switching, tabs running off-screen.

## Preview locally

Opening `index.html` from disk runs it in local (non-synced) mode. To serve it over http without the sign-in gate
and without touching the shared plan:

```bash
python3 .claude/preview_server.py 8098
```
