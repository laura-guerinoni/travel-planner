# travel-planner — original look, fixed

A copy of [laura-guerinoni/travel-planner](https://github.com/laura-guerinoni/travel-planner) (`main` at `3c06968`)
with the same colors, cards and features. The layout goes back to the earlier full-page version
(before the "white page" pass): one lilac page edge to edge, alternatives hanging from the window's top edge,
month tabs flush against its left edge showing their full names, and the calendar filling the remaining width.

Defects fixed:

- **Calendar top spacing collapsing.** `syncBarLayout()` measured `.wrap` including the margin it had itself set on the
  previous call, so every second call (resize, content change, font load) reset the margin to 0 and the alternatives
  bar and sticky weekday header sat on top of the first week.
- **Stale payment overview.** Switching alternative via a month tab, or by adding a month/alternative, kept showing the
  previous alternative's totals.
- **Month tabs cut off / label under its "⋯".** Tabs now have their own column and size to their label.
- **Empty payment overview box** for an alternative with nothing priced is hidden.
- **Place names broken mid-word** in narrow columns; day numbers can no longer wrap character by character.
- **Phone:** the month ribbon's "⋯" no longer sits under the top-right menu button.

CSS changes are one block at the end of `<style>` ("Layout pass on top of the original look"); JS changes are in
`syncBarLayout()`, `pinCurrentSegment()`/`attachSegHoverExpand()` (tabs anchored left) and next to `renderPaymentOverview()`.

Preview without sign-in and without touching the shared Firebase plan:

```bash
python3 .claude/preview_server.py 8098
```

Note: hosted as-is this copy would sign in to and edit the **same** Firebase plan as the original.
