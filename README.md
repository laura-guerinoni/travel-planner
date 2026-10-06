# travel-planner — original look, fixed

A copy of [laura-guerinoni/travel-planner](https://github.com/laura-guerinoni/travel-planner) (`main` at `3c06968`)
with the same design, colors and features, and these defects fixed:

- **Calendar top spacing collapsing.** `syncBarLayout()` measured `.wrap` including the margin it had itself set on the
  previous call, so every second call (resize, content change, font load) reset the margin to 0 and the alternatives
  bar and sticky weekday header sat on top of the first week.
- **Stale payment overview.** Switching alternative via a month tab, or by adding a month/alternative, kept showing the
  previous alternative's totals.
- **Month tabs cut off.** The open month's tab and the year tabs ran off the left edge on windows narrower than ~1400px.
- **Tab label under its "⋯".** The expanded tab was a fixed 140px, so the menu button covered the end of the label.
- **Place names broken mid-word** in narrow columns; day numbers can no longer wrap character by character.
- **Phone:** the month ribbon's "⋯" no longer sits under the top-right menu button.

CSS fixes are one block at the end of `<style>` ("Fixes on top of the original look"); the two JS fixes are in
`syncBarLayout()` and next to `renderPaymentOverview()`.

Preview without sign-in and without touching the shared Firebase plan:

```bash
python3 .claude/preview_server.py 8098
```

Note: hosted as-is this copy would sign in to and edit the **same** Firebase plan as the original.
