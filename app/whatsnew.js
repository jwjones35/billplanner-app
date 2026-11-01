'use strict';
/* Bill Planner: what changed in each version, newest first.
   Shown once in a "What's new" pop-up the first time the app opens after an update, and under More › What's new.
   Every release adds an entry here, in plain words: added, changed, fixed, removed. */
const CHANGELOG = [
  {
    v: '1.1.1', date: '2026-11-01',
    changed: ['Bill Planner now has its own web page at jwjones35.github.io/billplanner-app, and the app itself is at jwjones35.github.io/billplanner-app/app. If you added the app to your Home Screen before this, it still works: the page has an "Open Bill Planner" button, or you can add the app again from its new address.']
  },
  {
    v: '1.1.0', date: '2026-11-01',
    added: ['A "Buy me a coffee" button under More, for anyone who\'d like to support the app with a tip. It\'s completely optional, and Bill Planner stays free.']
  },
  {
    v: '1.0.0', date: '2026-11-01',
    added: [
      'Bills and paydays in one place, with what\'s available to spend until your next payday.',
      'A warning when next week\'s bills are bigger than next week\'s pay, so you don\'t overspend this week.',
      'Past-due bills, autopay bills that haven\'t gone through yet, and payments the bank hasn\'t shown yet.',
      'One-time bills, bills that change each month, and transaction fees.',
      'Money set aside for something specific, and savings tips when there\'s room to save.',
      'Bill reminders in your phone\'s calendar, and backup files you keep.',
      'Optional: connect your bank through SimpleFIN so balances and paid bills update by themselves.'
    ]
  }
];

const SEEN_KEY = 'bpapp.seenVersion';
const vNum = v => v.split('.').map(Number).reduce((a, n) => a * 1000 + n, 0);
function whatsNewHtml(entries) {
  const part = (label, cls, items) => items && items.length ? `<div class="wn-part"><span class="wn-tag ${cls}">${label}</span><ul>${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>` : '';
  return entries.map(e => `<div class="wn-ver"><div class="wn-head"><b>Version ${e.v}</b><span class="muted small">${nice(e.date)}</span></div>
    ${part('New', 'wn-new', e.added)}${part('Changed', 'wn-chg', e.changed)}${part('Fixed', 'wn-fix', e.fixed)}${part('Removed', 'wn-rem', e.removed)}</div>`).join('');
}
// Right after an update: show what changed since the version this phone last ran. Returns true if shown.
function showWhatsNewIfUpdated() {
  let seen = null; try { seen = localStorage.getItem(SEEN_KEY); } catch (e) { }
  try { localStorage.setItem(SEEN_KEY, APP_VERSION); } catch (e) { }
  if (!S || !seen || seen === APP_VERSION) return false; // a brand-new install has nothing to compare with
  const entries = CHANGELOG.filter(e => vNum(e.v) > vNum(seen) && vNum(e.v) <= vNum(APP_VERSION));
  if (!entries.length) return false;
  openSheet(`<div class="wn-splash"><div class="wn-badge">Updated</div>
    <h3>Bill Planner is now version ${APP_VERSION}</h3>
    <p class="muted" style="margin-top:2px">Here's what changed${entries.length > 1 ? ` since version ${esc(seen)}` : ''}:</p></div>
    ${whatsNewHtml(entries)}
    <div class="btns"><button class="btn block" data-act="close">Got it</button></div>
    <p class="hint" style="text-align:center">See every version any time under More › What's new.</p>`);
  return true;
}
function sheetWhatsNew() {
  openSheet(`<h3>What's new</h3><p class="hint" style="margin-top:0">You're on version ${APP_VERSION}.</p>${whatsNewHtml(CHANGELOG)}
    <div class="btns"><button class="btn block" data-act="close">Done</button></div>`);
}
