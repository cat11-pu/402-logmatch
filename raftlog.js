// raftlog.js：某序号的任期、截断与追加（基线：一律给零与原表）
export function termAt(log, seq) {
  return 0;
}

export function truncatedAt(log, prev) {
  return log;
}

export function appendedInto(log, prev, term, items) {
  return log;
}
