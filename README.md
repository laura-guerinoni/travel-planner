# travel-planner — original look, fixed

A copy of [laura-guerinoni/travel-planner](https://github.com/laura-guerinoni/travel-planner) (`main` at `3c06968`)
with the same colors, cards and features. The layout sits between the two earlier ones: still a lilac calendar
block on a white page, but the block fills the window, the alternatives' tabs stand directly on its top edge and
the month tabs are attached to its left edge (year on its own chip, so the tab column stays narrow).

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
`syncBarLayout()`, `renderMonthSidebar()` (year chip always shown) and next to `renderPaymentOverview()`.

Preview without sign-in and without touching the shared Firebase plan:

```bash
python3 .claude/preview_server.py 8098
```

Note: hosted as-is this copy would sign in to and edit the **same** Firebase plan as the original.
