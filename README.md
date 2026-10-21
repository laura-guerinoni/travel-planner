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

## Doing it together (branch `group-voting`)

- **New plan → who and when:** the "+" under the plans asks what kind of plan it is (trip, weekend, event, just ideas), who's coming
  (pick people or invite by email), and whether the dates are known. If they aren't, it starts a **date poll**: everyone paints the days
  they're free (tap, or drag from one day to another), the best windows of the trip's length are listed with who's missing, and
  "Set these dates" puts every alternative of the plan on them. An open poll shows as a banner on the plan.
- **Shared stars:** the ribbon star is now saved with the plan. Faces of everyone who starred hang under the ribbon; the tab shows ★ and a count.
- **Who's in:** everyone who can see an alternative is in every activity by default. "Skip" (on hover, next to the activity's tag) takes
  you out; the activity then shows who skips, and the payment split only counts the people who are in (it is the same "didn't take part"
  list the split already used).
- **Idea box** (in Notes, on the right of the page; the Notes tab shows how many): ideas that aren't on a day yet. Heart them, plan one onto a day, or send an activity there from its card.
- **This or that:** from an activity's card, put it to a vote against an idea or something new. Votes show in the day; when everyone has
  voted (or someone decides) the winner goes on the day and the other goes to the idea box.

All of this is stored in the plan under `notes.__group` (stars, ideas, votes, polls) plus each activity's existing `pyx` list for skips,
so older open copies of the app pass it through untouched. In local mode a "Testing as" switcher at the bottom lets one browser act as
each of the sample people.

## Preview locally

Opening `index.html` from disk runs it in local (non-synced) mode. To serve it over http without the sign-in gate
and without touching the shared plan:

```bash
python3 .claude/preview_server.py 8098
```
