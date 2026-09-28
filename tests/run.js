import assert from "node:assert";
import { termAt, truncatedAt, appendedInto } from "../raftlog.js";
import { step, close } from "../raftrun.js";
import { render } from "../app.js";

const base = {
  budget: 1,
  state: { log: [], rejects: [], cut: 0, gets: [], ledger: [], applied: [] },
  events: [{ id: 1, kind: "append", prev: 0, term: 1, items: ["a"] }],
  bad_prev_code: "E_BAD_PREV", bad_term_code: "E_BAD_TERM",
  bad_items_code: "E_BAD_ITEMS", bad_seq_code: "E_BAD_SEQ",
  no_prev_code: "E_NO_PREV", no_entry_code: "E_NO_ENTRY",
  event_error_code: "E_BAD_EVENT"
};

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("termAt returns a number", () => {
  assert.strictEqual(typeof termAt([[1, 3, "a"]], 1), "number");
});

check("truncatedAt returns a list", () => {
  assert.ok(Array.isArray(truncatedAt([[1, 1, "a"]], 1)));
});

check("appendedInto returns a list", () => {
  assert.ok(Array.isArray(appendedInto([], 0, 1, ["x"])));
});

check("step returns a state", () => {
  assert.strictEqual(typeof step(base).state, "object");
});

check("render counts events", () => {
  assert.strictEqual(typeof render(base).count_events, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
