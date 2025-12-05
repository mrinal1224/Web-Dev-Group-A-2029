
---

# 🔵 Problem 1 – Tabbed Interface

### ✅ **Problem Statement**

You have three tabs: **Home**, **Profile**, **Settings** and three corresponding panels.
When a tab is clicked:

* That tab becomes active (via a class)
* Its panel becomes visible and all other panels are hidden
* Update `aria-selected` on tabs (true for the active tab, false for others)

You must use:

* `dataset` or `data-*` on tabs to map to panels
* `.classList.add()` / `.classList.remove()`
* `setAttribute()` for ARIA

---

### 🔍 **Subtle Hint**

* Give each tab a `data-target="#panel-id"` value.
* Use event delegation on the tab container.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Tabs</title>
  <style>
    .tabs { display:flex; gap:8px; }
    .tab { padding:8px 12px; cursor:pointer; border:1px solid #ccc; }
    .tab.active { background: #007bff; color:white; }
    .panel { display:none; padding:12px; border:1px solid #ccc; margin-top:8px; }
    .panel.active { display:block; }
  </style>
</head>
<body>
  <div class="tabs" role="tablist">
    <button class="tab" data-target="#home" aria-selected="true">Home</button>
    <button class="tab" data-target="#profile" aria-selected="false">Profile</button>
    <button class="tab" data-target="#settings" aria-selected="false">Settings</button>
  </div>

  <div id="home" class="panel active">Home content</div>
  <div id="profile" class="panel">Profile content</div>
  <div id="settings" class="panel">Settings content</div>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Clicking a tab activates it and shows its panel only.
* `aria-selected` reflects the active tab.
* Keyboard activation optional (click-based required).

---

### 🧑‍🏫 **Instructor Solution**

```js
const tabs = document.querySelector('.tabs');
const tabButtons = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;

  tabButtons.forEach(t => {
    t.classList.remove('active');
    t.setAttribute('aria-selected', 'false');
  });

  panels.forEach(p => p.classList.remove('active'));

  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');

  const target = document.querySelector(tab.dataset.target);
  if (target) target.classList.add('active');
});
```

---

### 🧪 **Test Cases**

1. Click Home → Home tab active, home panel visible, other panels hidden.
2. Click Profile → Profile active, `aria-selected` true only on Profile.
3. Clicking outside tabs does nothing.

---

# 🔵 Problem 2 – Modal Dialog

### ✅ **Problem Statement**

Create an **Open Modal** button. When clicked:

* Dynamically insert a modal overlay and dialog into DOM
* Modal must have a close button
* Close the modal on overlay click or `Esc` key

You must use:

* `document.createElement()`
* `appendChild()` / `removeChild()`
* `keydown` event for `Esc`

---

### 🔍 **Subtle Hint**

* Add `role="dialog"` and `aria-modal="true"` to the dialog.
* Focus the close button when modal opens.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Modal</title>
  <style>
    .overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;}
    .dialog{background:white;padding:16px;border-radius:6px;min-width:200px;}
  </style>
</head>
<body>
  <button id="open-modal">Open Modal</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Modal created dynamically and removed on close.
* Esc closes modal; clicking outside dialog closes modal.
* Focus moves to close button when opened.

---

### 🧑‍🏫 **Instructor Solution**

```js
const openBtn = document.getElementById('open-modal');

function closeModal(overlay) {
  if (overlay && overlay.parentNode) {
    document.body.removeChild(overlay);
    document.removeEventListener('keydown', onKey);
  }
}

function onKey(e) {
  if (e.key === 'Escape') {
    const overlay = document.querySelector('.overlay');
    closeModal(overlay);
  }
}

openBtn.addEventListener('click', () => {
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const dialog = document.createElement('div');
  dialog.className = 'dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');

  const btn = document.createElement('button');
  btn.textContent = 'Close';
  btn.addEventListener('click', () => closeModal(overlay));

  dialog.appendChild(document.createTextNode('Modal content'));
  dialog.appendChild(document.createElement('br'));
  dialog.appendChild(btn);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  btn.focus();
  document.addEventListener('keydown', onKey);
});
```

---

### 🧪 **Test Cases**

1. Click "Open Modal" → overlay appears, close button focused.
2. Click overlay outside dialog → modal removed.
3. Press Esc → modal removed.

---

# 🔵 Problem 3 – Inline Editing with contentEditable

### ✅ **Problem Statement**

You have a list of items. When an item is **double-clicked**:

* It becomes editable (`contentEditable`)
* Pressing `Enter` or blurring commits the change and exits edit mode
* Empty edits revert to previous text

You must use:

* `.contentEditable`
* `dblclick`, `keydown`, and `blur` events

---

### 🔍 **Subtle Hint**

* Use a temporary variable to store original text in case user clears it.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Inline Edit</title>
</head>
<body>
  <ul id="items">
    <li>Learn DOM</li>
    <li>Practice events</li>
    <li>Build projects</li>
  </ul>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Double-click an `<li>` → becomes editable.
* Enter commits and stops editing; blur also commits.
* If empty, revert to previous text.

---

### 🧑‍🏫 **Instructor Solution**

```js
const list = document.getElementById('items');

list.addEventListener('dblclick', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  const prev = li.textContent;
  li.contentEditable = 'true';
  li.focus();

  function finish() {
    li.contentEditable = 'false';
    if (li.textContent.trim() === '') {
      li.textContent = prev;
    }
    li.removeEventListener('blur', onBlur);
    li.removeEventListener('keydown', onKey);
  }

  function onBlur() { finish(); }
  function onKey(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      finish();
    }
  }

  li.addEventListener('blur', onBlur);
  li.addEventListener('keydown', onKey);
});
```

---

### 🧪 **Test Cases**

1. Double-click item → editable.
2. Type new text + Enter → update shown.
3. Clear text + blur → old text restored.

---

# 🔵 Problem 4 – Counter with Cooldown

### ✅ **Problem Statement**

Create a counter display with **+** and **−** buttons.

* Each button click updates the value
* After a click, the clicked button is disabled for 500ms to prevent rapid clicks

You must use:

* `.disabled` property
* `setTimeout`

---

### 🔍 **Subtle Hint**

* Don't disable both buttons — only the one clicked.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Counter Cooldown</title>
</head>
<body>
  <button id="dec">−</button>
  <span id="val">0</span>
  <button id="inc">+</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Clicking + increments, − decrements.
* The clicked button disables for 500ms.

---

### 🧑‍🏫 **Instructor Solution**

```js
const inc = document.getElementById('inc');
const dec = document.getElementById('dec');
const val = document.getElementById('val');

function cooldown(button) {
  button.disabled = true;
  setTimeout(() => button.disabled = false, 500);
}

inc.addEventListener('click', () => {
  val.textContent = String(Number(val.textContent) + 1);
  cooldown(inc);
});

dec.addEventListener('click', () => {
  val.textContent = String(Number(val.textContent) - 1);
  cooldown(dec);
});
```

---

### 🧪 **Test Cases**

1. Click + → value increments by 1 and + disabled briefly.
2. Click − → value decrements and − disabled briefly.
3. Rapid clicking disabled during cooldown.

---

# 🔵 Problem 5 – Sortable Table Columns

### ✅ **Problem Statement**

You have a table of **Name** and **Age** rows.
When a column header is clicked:

* Sort the rows by that column (toggle asc/desc)
* Update header with an arrow indicator

You must use:

* Reading rows into an array
* Sorting and re-appending rows to `<tbody>`

---

### 🔍 **Subtle Hint**

* Use `parseInt` for numeric column sort and `localeCompare` for strings.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Sortable Table</title>
  <style>
    th { cursor:pointer; }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr><th data-col="name">Name</th><th data-col="age">Age</th></tr>
    </thead>
    <tbody id="tbody">
      <tr><td>Alice</td><td>30</td></tr>
      <tr><td>Bob</td><td>22</td></tr>
      <tr><td>Charlie</td><td>25</td></tr>
    </tbody>
  </table>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Click Name → sort alphabetically (toggle).
* Click Age → numeric sort (toggle).
* Arrow indicator shows direction.

---

### 🧑‍🏫 **Instructor Solution**

```js
const headers = document.querySelectorAll('th');
const tbody = document.getElementById('tbody');

headers.forEach(header => {
  header.dataset.order = 'asc';
  header.addEventListener('click', () => {
    const col = header.dataset.col;
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const asc = header.dataset.order === 'asc';
    rows.sort((a, b) => {
      const aText = a.querySelectorAll('td')[col === 'age' ? 1 : 0].textContent;
      const bText = b.querySelectorAll('td')[col === 'age' ? 1 : 0].textContent;

      if (col === 'age') {
        return asc ? (Number(aText) - Number(bText)) : (Number(bText) - Number(aText));
      } else {
        return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      }
    });

    header.dataset.order = asc ? 'desc' : 'asc';
    headers.forEach(h => h.textContent = h.textContent.replace(' ▲','').replace(' ▼',''));
    header.textContent += asc ? ' ▲' : ' ▼';

    rows.forEach(r => tbody.appendChild(r));
  });
});
```

---

### 🧪 **Test Cases**

1. Click Age → rows sorted numerically ascending, indicator shown.
2. Click Age again → toggles descending.
3. Click Name → sorts alphabetically.

---

# 🔵 Problem 6 – Form Validation Highlights

### ✅ **Problem Statement**

Create a small form: **Email** and **Password**. On submit:

* Validate fields and highlight invalid ones with a red border
* Use `setCustomValidity()` to show custom messages
* Prevent form submission if invalid

You must use:

* `reportValidity()`, `setCustomValidity()`
* `.classList` to toggle invalid styles

---

### 🔍 **Subtle Hint**

* Clear custom validity before checking to avoid stale messages.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Form Validation</title>
  <style>
    .invalid { border: 1px solid red; }
  </style>
</head>
<body>
  <form id="form">
    <input type="email" id="email" placeholder="Email">
    <input type="password" id="pw" placeholder="Password (min 6)">
    <button type="submit">Submit</button>
  </form>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Invalid fields show red border and prevent submit.
* Valid submission proceeds (you can `alert('Submitted')`).

---

### 🧑‍🏫 **Instructor Solution**

```js
const form = document.getElementById('form');
const email = document.getElementById('email');
const pw = document.getElementById('pw');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  email.classList.remove('invalid');
  pw.classList.remove('invalid');
  email.setCustomValidity('');
  pw.setCustomValidity('');

  if (!email.checkValidity()) {
    email.setCustomValidity('Please enter a valid email.');
    email.classList.add('invalid');
  }

  if (pw.value.length < 6) {
    pw.setCustomValidity('Password must be at least 6 characters.');
    pw.classList.add('invalid');
  }

  if (!form.reportValidity()) return;
  alert('Form submitted');
});
```

---

### 🧪 **Test Cases**

1. Empty fields → invalid and messages shown.
2. Short password → blocked.
3. Valid inputs → alert appears.

---

# 🔵 Problem 7 – Live Character Progress Bar

### ✅ **Problem Statement**

A textarea with `maxlength=200`. As the user types:

* Show `X / 200` count and a visual progress bar
* When remaining characters <= 20, bar turns red

You must use:

* `input` event
* `<progress>` or styled div width changes

---

### 🔍 **Subtle Hint**

* Use `textarea.value.length` and set the bar's width percentage.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Char Progress</title>
  <style>
    #bar { height:8px; background:#eee; width:100%; margin-top:8px; }
    #fill { height:100%; width:0%; background:green; transition:width 0.1s; }
  </style>
</head>
<body>
  <textarea id="ta" maxlength="200"></textarea>
  <div id="bar"><div id="fill"></div></div>
  <div id="count">0 / 200</div>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Live count updates.
* Fill width corresponds to percent used.
* When >=180 used, fill turns red.

---

### 🧑‍🏫 **Instructor Solution**

```js
const ta = document.getElementById('ta');
const fill = document.getElementById('fill');
const count = document.getElementById('count');

ta.addEventListener('input', () => {
  const len = ta.value.length;
  const pct = (len / 200) * 100;
  fill.style.width = pct + '%';
  fill.style.background = len >= 180 ? 'red' : 'green';
  count.textContent = `${len} / 200`;
});
```

---

### 🧪 **Test Cases**

1. Typing updates count and bar.
2. > =180 characters → bar red.
3. Deleting reduces fill accordingly.

---

# 🔵 Problem 8 – Persist Theme with localStorage

### ✅ **Problem Statement**

A **Toggle Theme** button switches `dark` class on `<body>`.

* Save the user's choice to `localStorage`
* On page load, read preference and apply theme

You must use:

* `localStorage.setItem()` / `getItem()`
* `DOMContentLoaded` or immediate script

---

### 🔍 **Subtle Hint**

* Store `'dark'` or `'light'` strings.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Persist Theme</title>
  <style>
    .dark { background:#222; color:#fff; }
  </style>
</head>
<body>
  <button id="theme">Dark Mode</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Theme toggles and persists across reload.

---

### 🧑‍🏫 **Instructor Solution**

```js
const btn = document.getElementById('theme');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    btn.textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark');
    btn.textContent = 'Dark Mode';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
});

btn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  const theme = isDark ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  applyTheme(theme);
});
```

---

### 🧪 **Test Cases**

1. Toggle to dark → reload → still dark.
2. Toggle back → reload → light.

---

# 🔵 Problem 9 – Image Preview from File Input

### ✅ **Problem Statement**

When the user picks an image file:

* Show a preview thumbnail on the page
* Replace previous preview upon new selection
* Only accept image files

You must use:

* `input[type=file]` and `URL.createObjectURL()`

---

### 🔍 **Subtle Hint**

* Check `file.type.startsWith('image/')`.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Image Preview</title>
</head>
<body>
  <input type="file" id="file" accept="image/*">
  <div id="preview"></div>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Image preview shows chosen image; non-image shows an error.

---

### 🧑‍🏫 **Instructor Solution**

```js
const fileInput = document.getElementById('file');
const preview = document.getElementById('preview');

fileInput.addEventListener('change', () => {
  preview.innerHTML = '';
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    preview.textContent = 'Please select an image file.';
    return;
  }
  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  img.style.maxWidth = '200px';
  preview.appendChild(img);
});
```

---

### 🧪 **Test Cases**

1. Select an image → thumbnail appears.
2. Select non-image → error message.
3. Re-select image → preview replaces previous.

---

# 🔵 Problem 10 – Keyboard Shortcut to Focus Search

### ✅ **Problem Statement**

Implement **Ctrl+K / ⌘+K** shortcut to focus the search input.

You must use:

* `keydown` listener
* `event.ctrlKey` / `event.metaKey` and `.focus()`

---

### 🔍 **Subtle Hint**

* `event.preventDefault()` to stop browser default behavior.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Shortcut Focus</title>
</head>
<body>
  <input id="search" placeholder="Search...">

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Pressing Ctrl+K (or Cmd+K on Mac) focuses the search input and prevents default.

---

### 🧑‍🏫 **Instructor Solution**

```js
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    document.getElementById('search').focus();
  }
});
```

---

### 🧪 **Test Cases**

1. Press Ctrl+K → input focused.
2. On Mac, Cmd+K → input focused.

---

# 🔵 Problem 11 – Live Clock with Start/Stop

### ✅ **Problem Statement**

Create a digital clock display with **Start** and **Stop** buttons:

* Start begins updating every second
* Stop pauses updates

You must use:

* `setInterval` / `clearInterval`

---

### 🔍 **Subtle Hint**

* Keep interval id in a variable so you can clear it.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Clock</title>
</head>
<body>
  <div id="clock">00:00:00</div>
  <button id="start">Start</button>
  <button id="stop">Stop</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Start updates clock every second. Stop freezes it.

---

### 🧑‍🏫 **Instructor Solution**

```js
const clock = document.getElementById('clock');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
let timerId = null;

function update() {
  const d = new Date();
  const s = String(d.getSeconds()).padStart(2,'0');
  const m = String(d.getMinutes()).padStart(2,'0');
  const h = String(d.getHours()).padStart(2,'0');
  clock.textContent = `${h}:${m}:${s}`;
}

start.addEventListener('click', () => {
  if (timerId) return;
  update();
  timerId = setInterval(update, 1000);
});

stop.addEventListener('click', () => {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
});
```

---

### 🧪 **Test Cases**

1. Click Start → clock updates every second.
2. Click Stop → clock stops updating.

---

# 🔵 Problem 12 – Dependent Selects (Country → City)

### ✅ **Problem Statement**

Two `<select>` inputs: Country and City.

* Selecting a country populates the City select with appropriate options.

You must use:

* `change` event
* `document.createElement('option')`

---

### 🔍 **Subtle Hint**

* Keep a simple object map of country → cities.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Dependent Selects</title>
</head>
<body>
  <select id="country">
    <option value="">Select country</option>
    <option value="in">India</option>
    <option value="jp">Japan</option>
  </select>

  <select id="city">
    <option value="">Select city</option>
  </select>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Country selection updates city options accordingly.

---

### 🧑‍🏫 **Instructor Solution**

```js
const map = {
  in: ['Mumbai','Delhi','Bengaluru'],
  jp: ['Tokyo','Osaka','Kyoto']
};
const country = document.getElementById('country');
const city = document.getElementById('city');

country.addEventListener('change', () => {
  city.innerHTML = '<option value="">Select city</option>';
  const list = map[country.value] || [];
  list.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.toLowerCase();
    opt.textContent = c;
    city.appendChild(opt);
  });
});
```

---

### 🧪 **Test Cases**

1. Choose India → cities populated.
2. Choose Japan → Japan cities shown.
3. Choose blank → city resets.

---

# 🔵 Problem 13 – Image Gallery Lightbox

### ✅ **Problem Statement**

A grid of thumbnails. Clicking a thumbnail:

* Opens a full-screen overlay showing the larger image
* Overlay closes on click or `Esc`

You must use:

* Event delegation
* Dynamic overlay creation

---

### 🔍 **Subtle Hint**

* Use `e.target.closest('img')` to find clicked thumbnail.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Lightbox</title>
  <style>
    .thumb { width:100px; cursor:pointer; margin:4px; }
  </style>
</head>
<body>
  <div id="gallery">
    <img class="thumb" src="https://via.placeholder.com/150" data-full="https://via.placeholder.com/600">
    <img class="thumb" src="https://via.placeholder.com/150/ff0" data-full="https://via.placeholder.com/600/ff0">
    <img class="thumb" src="https://via.placeholder.com/150/0ff" data-full="https://via.placeholder.com/600/0ff">
  </div>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Clicking thumbnail shows overlay with full image; close via click or Esc.

---

### 🧑‍🏫 **Instructor Solution**

```js
const gallery = document.getElementById('gallery');

function closeOverlay(ov) {
  if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
  document.removeEventListener('keydown', onKey);
}

function onKey(e) {
  if (e.key === 'Escape') {
    closeOverlay(document.querySelector('.overlay'));
  }
}

gallery.addEventListener('click', (e) => {
  const img = e.target.closest('.thumb');
  if (!img) return;

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  overlay.style = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.8);';

  const big = document.createElement('img');
  big.src = img.dataset.full || img.src;
  big.style.maxWidth = '90%';
  big.style.maxHeight = '90%';

  overlay.addEventListener('click', (ev) => {
    if (ev.target === overlay) closeOverlay(overlay);
  });

  overlay.appendChild(big);
  document.body.appendChild(overlay);
  document.addEventListener('keydown', onKey);
});
```

---

### 🧪 **Test Cases**

1. Click thumbnail → overlay shows full image.
2. Click overlay background → overlay removed.
3. Press Esc → overlay removed.

---

# 🔵 Problem 14 – Read Computed Style

### ✅ **Problem Statement**

Given a box, clicking **Read Styles** should display its computed width, height, padding, and `background-color`.

You must use:

* `getComputedStyle()`
* `offsetWidth` / `offsetHeight`

---

### 🔍 **Subtle Hint**

* `getComputedStyle(el).getPropertyValue('padding-top')`, etc.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Computed Style</title>
  <style>
    #box { width:150px; height:100px; padding:10px; background:lightblue; }
  </style>
</head>
<body>
  <div id="box">Box</div>
  <button id="read">Read Styles</button>
  <pre id="out"></pre>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Clicking shows numeric width/height and computed padding and background color.

---

### 🧑‍🏫 **Instructor Solution**

```js
const box = document.getElementById('box');
const read = document.getElementById('read');
const out = document.getElementById('out');

read.addEventListener('click', () => {
  const cs = getComputedStyle(box);
  out.textContent = `
offsetWidth: ${box.offsetWidth}
offsetHeight: ${box.offsetHeight}
padding-top: ${cs.getPropertyValue('padding-top')}
background-color: ${cs.getPropertyValue('background-color')}
  `.trim();
});
```

---

### 🧪 **Test Cases**

1. Click Read Styles → shows computed values matching layout.
2. If inline style changes, reading again reflects updates.

---

# 🔵 Problem 15 – Clone Node and Reattach Events

### ✅ **Problem Statement**

You have an item with a click handler that alerts its text.
Click **Clone Last** to duplicate the last item.

* Ensure the cloned node also responds to clicks (explain why `cloneNode(true)` doesn't copy JS listeners)

You must use:

* `cloneNode(true)` followed by re-attaching event listeners

---

### 🔍 **Subtle Hint**

* `cloneNode(true)` clones DOM structure and attributes but not attached JS listeners.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Clone Node</title>
</head>
<body>
  <div id="list">
    <div class="item">Item 1</div>
  </div>
  <button id="clone">Clone Last</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Cloned item responds to click just like original.

---

### 🧑‍🏫 **Instructor Solution**

```js
const list = document.getElementById('list');
const cloneBtn = document.getElementById('clone');

function attachClick(el) {
  el.addEventListener('click', () => alert(el.textContent));
}

attachClick(list.querySelector('.item'));

cloneBtn.addEventListener('click', () => {
  const last = list.lastElementChild;
  const clone = last.cloneNode(true);
  clone.textContent = 'Item ' + (list.children.length + 1);
  attachClick(clone); // reattach listener
  list.appendChild(clone);
});
```

---

### 🧪 **Test Cases**

1. Click original → alert shown.
2. Click Clone Last → new item added and alerts on click.
3. Explain in comment that listeners are not cloned by `cloneNode`.

---

# 🔵 Problem 16 – Use `<template>` to Render Cards

### ✅ **Problem Statement**

Use a `<template>` for a card. When **Add Product** is clicked:

* Clone template content, fill in title and price, and append to container.

You must use:

* `<template>` and `content.cloneNode(true)`

---

### 🔍 **Subtle Hint**

* Use `querySelector` on the cloned fragment to find placeholders.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Template Cards</title>
  <style>.card{border:1px solid #ccc;padding:8px;margin:8px;display:inline-block}</style>
</head>
<body>
  <input id="title" placeholder="Title">
  <input id="price" placeholder="Price">
  <button id="add">Add Product</button>

  <div id="container"></div>

  <template id="card-tpl">
    <div class="card">
      <div class="card-title"></div>
      <div class="card-price"></div>
    </div>
  </template>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Clicking Add Product appends a populated card.

---

### 🧑‍🏫 **Instructor Solution**

```js
const tpl = document.getElementById('card-tpl');
const container = document.getElementById('container');
const add = document.getElementById('add');

add.addEventListener('click', () => {
  const clone = tpl.content.cloneNode(true);
  clone.querySelector('.card-title').textContent = document.getElementById('title').value || 'Untitled';
  clone.querySelector('.card-price').textContent = document.getElementById('price').value || '0';
  container.appendChild(clone);
});
```

---

### 🧪 **Test Cases**

1. Fill title/price → click Add → card appears with values.
2. Add multiple cards → all appended.

---

# 🔵 Problem 17 – Scoped Live Search

### ✅ **Problem Statement**

There are 3 sections each with a list. A search input and section radio selector:

* Typing filters only the selected section's list (case-insensitive)

You must use:

* `input` event and `querySelectorAll()` scoped to selected section

---

### 🔍 **Subtle Hint**

* Use `sectionSelector.querySelectorAll('li')` to limit scope.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Scoped Search</title></head>
<body>
  <label><input type="radio" name="sec" value="a" checked> A</label>
  <label><input type="radio" name="sec" value="b"> B</label>
  <label><input type="radio" name="sec" value="c"> C</label>

  <input id="search" placeholder="Search...">

  <section id="a"><ul><li>Alice</li><li>Adam</li></ul></section>
  <section id="b"><ul><li>Bob</li><li>Bill</li></ul></section>
  <section id="c"><ul><li>Carol</li><li>Carl</li></ul></section>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Only items in chosen section filtered; other sections unchanged.

---

### 🧑‍🏫 **Instructor Solution**

```js
const search = document.getElementById('search');
const radios = document.querySelectorAll('input[name="sec"]');

function getSelected() {
  return document.querySelector('input[name="sec"]:checked').value;
}

search.addEventListener('input', () => {
  const q = search.value.toLowerCase();
  const sel = getSelected();
  const items = document.querySelectorAll(`#${sel} li`);
  items.forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});

radios.forEach(r => r.addEventListener('change', () => search.dispatchEvent(new Event('input'))));
```

---

### 🧪 **Test Cases**

1. Select section A, type `ad` → shows `Adam`.
2. Switch section → filter applies there.

---

# 🔵 Problem 18 – Drag & Drop Reorder

### ✅ **Problem Statement**

Make a list of draggable items. The user can drag to reorder list items.

You must use:

* HTML5 Drag & Drop events (`dragstart`, `dragover`, `drop`)

---

### 🔍 **Subtle Hint**

* Store dragged element in a variable during `dragstart`.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Drag Reorder</title>
  <style>li{padding:6px;border:1px solid #ccc;margin:4px;cursor:move}</style>
</head>
<body>
  <ul id="list">
    <li draggable="true">One</li>
    <li draggable="true">Two</li>
    <li draggable="true">Three</li>
  </ul>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Dragging and dropping reorders DOM nodes.

---

### 🧑‍🏫 **Instructor Solution**

```js
const list = document.getElementById('list');
let dragged = null;

list.addEventListener('dragstart', (e) => {
  dragged = e.target;
  e.dataTransfer.effectAllowed = 'move';
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const target = e.target.closest('li');
  if (!target || target === dragged) return;
  const rect = target.getBoundingClientRect();
  const next = (e.clientY - rect.top) > rect.height / 2;
  list.insertBefore(dragged, next ? target.nextSibling : target);
});

list.addEventListener('drop', (e) => {
  e.preventDefault();
  dragged = null;
});
```

---

### 🧪 **Test Cases**

1. Drag item to new position → DOM order changes accordingly.
2. Drag to end or start works.

---

# 🔵 Problem 19 – Show / Hide Password Toggle

### ✅ **Problem Statement**

Password input with a toggle button:

* Clicking toggle switches input type between `password` and `text`
* Toggle button updates `aria-pressed` and label text

You must use:

* `.type` property of input
* `aria-pressed` attribute

---

### 🔍 **Subtle Hint**

* Keep track of current state and adjust both `type` and button text.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Show Password</title></head>
<body>
  <input id="pw" type="password" placeholder="Password">
  <button id="toggle" aria-pressed="false">Show</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Clicking toggles visibility and `aria-pressed`.

---

### 🧑‍🏫 **Instructor Solution**

```js
const pw = document.getElementById('pw');
const toggle = document.getElementById('toggle');

toggle.addEventListener('click', () => {
  const shown = pw.type === 'text';
  pw.type = shown ? 'password' : 'text';
  toggle.textContent = shown ? 'Show' : 'Hide';
  toggle.setAttribute('aria-pressed', String(!shown));
});
```

---

### 🧪 **Test Cases**

1. Click Show → password visible and button says Hide.
2. Click Hide → password hidden.

---

# 🔵 Problem 20 – Countdown Timer

### ✅ **Problem Statement**

User enters seconds and clicks **Start**:

* Countdown displays remaining seconds each second
* On reaching zero, display `"Time's up!"`
* Provide **Reset** to stop and reset

You must use:

* `setInterval` / `clearInterval` and DOM updates

---

### 🔍 **Subtle Hint**

* Disable Start while running to prevent multiple intervals.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Countdown</title></head>
<body>
  <input id="sec" type="number" placeholder="Seconds">
  <button id="start">Start</button>
  <button id="reset">Reset</button>
  <div id="display"></div>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Counts down to zero then shows message. Reset cancels and clears.

---

### 🧑‍🏫 **Instructor Solution**

```js
const sec = document.getElementById('sec');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const display = document.getElementById('display');
let id = null;
let remaining = 0;

start.addEventListener('click', () => {
  if (id) return;
  remaining = Math.max(0, Number(sec.value) || 0);
  display.textContent = remaining;
  id = setInterval(() => {
    remaining--;
    if (remaining <= 0) {
      clearInterval(id);
      id = null;
      display.textContent = "Time's up!";
      return;
    }
    display.textContent = remaining;
  }, 1000);
});

reset.addEventListener('click', () => {
  clearInterval(id);
  id = null;
  remaining = 0;
  display.textContent = '';
});
```

---

### 🧪 **Test Cases**

1. Start with 3 → 3,2,1,"Time's up!".
2. Reset mid-count → stops and clears.

---

# 🔵 Problem 21 – Accordion (Single Open)

### ✅ **Problem Statement**

Multiple accordion headers and panels:

* Clicking a header expands its panel and collapses others
* Update `aria-expanded` on headers

You must use:

* `nextElementSibling` to locate panel
* `.classList` to toggle

---

### 🔍 **Subtle Hint**

* Remove active class from all headers, then add to clicked.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Accordion</title>
  <style>.panel{display:none}.panel.open{display:block}</style>
</head>
<body>
  <div class="accordion">
    <button class="hdr" aria-expanded="false">Header 1</button>
    <div class="panel">Panel 1</div>

    <button class="hdr" aria-expanded="false">Header 2</button>
    <div class="panel">Panel 2</div>

    <button class="hdr" aria-expanded="false">Header 3</button>
    <div class="panel">Panel 3</div>
  </div>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Only one panel open at a time; headers show `aria-expanded`.

---

### 🧑‍🏫 **Instructor Solution**

```js
const headers = document.querySelectorAll('.hdr');
headers.forEach(h => {
  h.addEventListener('click', () => {
    headers.forEach(x => {
      x.setAttribute('aria-expanded', 'false');
      x.nextElementSibling.classList.remove('open');
    });
    h.setAttribute('aria-expanded', 'true');
    h.nextElementSibling.classList.add('open');
  });
});
```

---

### 🧪 **Test Cases**

1. Click Header 2 → Panel 2 open, others closed.
2. Click Header 1 → Panel 1 open.

---

# 🔵 Problem 22 – IntersectionObserver "Now Viewing"

### ✅ **Problem Statement**

On a long page with sections:

* When a section is >50% visible, show a small "Now viewing" badge in that section
* Remove badge when not visible

You must use:

* `IntersectionObserver` with `threshold: 0.5`

---

### 🔍 **Subtle Hint**

* `observer.observe(section)` for each section.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Now Viewing</title>
  <style>section{min-height:400px;border:1px solid #ccc;margin:12px;padding:12px}</style>
</head>
<body>
  <section id="s1">Section 1</section>
  <section id="s2">Section 2</section>
  <section id="s3">Section 3</section>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Scrolling shows "Now viewing" badge on section in view.

---

### 🧑‍🏫 **Instructor Solution**

```js
const sections = document.querySelectorAll('section');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.5) {
      if (!entry.target.querySelector('.badge')) {
        const b = document.createElement('div');
        b.className = 'badge';
        b.textContent = 'Now viewing';
        entry.target.appendChild(b);
      }
    } else {
      const b = entry.target.querySelector('.badge');
      if (b) entry.target.removeChild(b);
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => obs.observe(s));
```

---

### 🧪 **Test Cases**

1. Scroll to section → badge appears when >50% visible.
2. Scroll away → badge removed.

---

# 🔵 Problem 23 – ResizeObserver Box Size

### ✅ **Problem Statement**

A resizable box (CSS `resize`) should display its current width and height live as the user resizes.

You must use:

* `ResizeObserver`

---

### 🔍 **Subtle Hint**

* Observe the box element and update a display element on changes.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Resize Observer</title>
  <style>#box{resize:both;overflow:auto;padding:8px;border:1px solid #ccc;width:150px;height:120px}</style>
</head>
<body>
  <div id="box">Resizable box</div>
  <div id="size"></div>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Size display updates while resizing.

---

### 🧑‍🏫 **Instructor Solution**

```js
const box = document.getElementById('box');
const size = document.getElementById('size');
const ro = new ResizeObserver(entries => {
  for (let ent of entries) {
    size.textContent = `W: ${Math.round(ent.contentRect.width)} H: ${Math.round(ent.contentRect.height)}`;
  }
});
ro.observe(box);
```

---

### 🧪 **Test Cases**

1. Resize box via handle → size updates.
2. Programmatic style change also reflected.

---

# 🔵 Problem 24 – CSS Variable Theming

### ✅ **Problem Statement**

Add a color picker that changes a CSS variable `--accent` used across the page. Updates should reflect immediately.

You must use:

* `document.documentElement.style.setProperty()`

---

### 🔍 **Subtle Hint**

* Use `input[type="color"]` for picker.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>CSS Vars</title>
  <style>:root{--accent:#007bff} .accent{color:var(--accent)}</style>
</head>
<body>
  <input type="color" id="picker" value="#007bff">
  <p class="accent">Accent text</p>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Picker change updates `--accent` and page reflects new color.

---

### 🧑‍🏫 **Instructor Solution**

```js
const picker = document.getElementById('picker');
picker.addEventListener('input', () => {
  document.documentElement.style.setProperty('--accent', picker.value);
});
```

---

### 🧪 **Test Cases**

1. Change picker → `.accent` color updates instantly.
2. Multiple changes reflected.

---

# 🔵 Problem 25 – Search & Highlight with `<mark>`

### ✅ **Problem Statement**

Enter a search term to highlight matches inside a paragraph using `<mark>` tags.

You must use:

* `innerHTML` replacement on a stored original text
* Regex with `replace` to wrap matches in `<mark>`

---

### 🔍 **Subtle Hint**

* Store the original paragraph text to avoid nested marks on repeated searches.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Highlight</title></head>
<body>
  <input id="q" placeholder="Search">
  <p id="para">JavaScript is fun. Learning JavaScript makes you productive.</p>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Matches wrapped in `<mark>`; clearing search removes highlights.

---

### 🧑‍🏫 **Instructor Solution**

```js
const q = document.getElementById('q');
const para = document.getElementById('para');
const original = para.textContent;

q.addEventListener('input', () => {
  const term = q.value.trim();
  if (!term) {
    para.textContent = original;
    return;
  }
  const re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  para.innerHTML = original.replace(re, match => `<mark>${match}</mark>`);
});
```

---

### 🧪 **Test Cases**

1. Type `JavaScript` → both occurrences highlighted.
2. Clear input → paragraph restored.

---

# 🔵 Problem 26 – Accessible Tooltip

### ✅ **Problem Statement**

Elements with `data-tooltip` should show a tooltip on hover and focus:

* Tooltip inserted into DOM and referenced with `aria-describedby`
* Tooltip hides on blur or mouseleave

You must use:

* `mouseenter`/`mouseleave`, `focus`/`blur`, `aria-describedby`

---

### 🔍 **Subtle Hint**

* Create unique tooltip ids for each tooltip shown.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Tooltip</title></head>
<body>
  <button class="has-tip" data-tooltip="Save changes">Save</button>
  <button class="has-tip" data-tooltip="Delete item">Delete</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Tooltip appears on hover or focus, accessible via ARIA.

---

### 🧑‍🏫 **Instructor Solution**

```js
let tipId = 0;
document.addEventListener('mouseover', handler, true);
document.addEventListener('focusin', handler, true);

function handler(e) {
  const el = e.target.closest('.has-tip');
  if (!el) return;
  showTip(el);
}

function showTip(el) {
  const text = el.dataset.tooltip;
  const id = 'tip-' + (++tipId);
  const node = document.createElement('div');
  node.id = id;
  node.className = 'tooltip';
  node.textContent = text;
  node.style = 'position:fixed; background:#333;color:#fff;padding:4px;border-radius:4px;';
  document.body.appendChild(node);
  const r = el.getBoundingClientRect();
  node.style.left = (r.left) + 'px';
  node.style.top = (r.bottom + 6) + 'px';
  el.setAttribute('aria-describedby', id);

  function cleanup() {
    if (node.parentNode) node.parentNode.removeChild(node);
    el.removeAttribute('aria-describedby');
    el.removeEventListener('mouseleave', cleanup);
    el.removeEventListener('blur', cleanup);
  }

  el.addEventListener('mouseleave', cleanup);
  el.addEventListener('blur', cleanup);
}
```

---

### 🧪 **Test Cases**

1. Hover Save → tooltip appears.
2. Tab to button → tooltip appears.
3. Moving away removes tooltip.

---

# 🔵 Problem 27 – Batch Checkbox Operations

### ✅ **Problem Statement**

A list of checkboxes and three buttons: **Select All**, **Deselect All**, **Invert Selection**.

You must use:

* `.checked` property and `querySelectorAll()` for checkboxes

---

### 🔍 **Subtle Hint**

* Loop through `document.querySelectorAll('.chk')` to update states.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Batch Check</title></head>
<body>
  <label><input type="checkbox" class="chk"> A</label>
  <label><input type="checkbox" class="chk"> B</label>
  <label><input type="checkbox" class="chk"> C</label>
  <br>
  <button id="all">Select All</button>
  <button id="none">Deselect All</button>
  <button id="inv">Invert</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Buttons manipulate checkbox checked states accordingly.

---

### 🧑‍🏫 **Instructor Solution**

```js
const all = document.getElementById('all');
const none = document.getElementById('none');
const inv = document.getElementById('inv');

function boxes() { return document.querySelectorAll('.chk'); }

all.addEventListener('click', () => boxes().forEach(b => b.checked = true));
none.addEventListener('click', () => boxes().forEach(b => b.checked = false));
inv.addEventListener('click', () => boxes().forEach(b => b.checked = !b.checked));
```

---

### 🧪 **Test Cases**

1. Select All → all checked.
2. Invert → checked states flip.
3. Deselect All → all unchecked.

---

# 🔵 Problem 28 – Breadcrumbs from Path

### ✅ **Problem Statement**

Input a path like `/shop/clothing/men` and render breadcrumbs like `Home > Shop > Clothing > Men`. Clicking a crumb updates the displayed path up to that crumb.

You must use:

* `split('/')`, `createElement('a')`, and event listeners

---

### 🔍 **Subtle Hint**

* Skip empty segments from splitting.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Breadcrumbs</title></head>
<body>
  <input id="path" placeholder="/shop/clothing/men">
  <button id="gen">Generate</button>
  <nav id="crumbs"></nav>
  <div id="out"></div>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Breadcrumbs clickable; clicking updates `#out` with selected path.

---

### 🧑‍🏫 **Instructor Solution**

```js
const pathIn = document.getElementById('path');
const gen = document.getElementById('gen');
const crumbs = document.getElementById('crumbs');
const out = document.getElementById('out');

gen.addEventListener('click', () => {
  crumbs.innerHTML = '';
  const parts = pathIn.value.split('/').filter(Boolean);
  let acc = '';
  const home = document.createElement('a');
  home.href = '#';
  home.textContent = 'Home';
  home.addEventListener('click', () => out.textContent = '/');
  crumbs.appendChild(home);
  crumbs.appendChild(document.createTextNode(' > '));

  parts.forEach((p, idx) => {
    acc += '/' + p;
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = p;
    a.addEventListener('click', () => out.textContent = acc);
    crumbs.appendChild(a);
    if (idx < parts.length - 1) crumbs.appendChild(document.createTextNode(' > '));
  });
});
```

---

### 🧪 **Test Cases**

1. Input `/a/b/c` → 3 crumbs shown.
2. Click second crumb → out shows `/a/b`.

---

# 🔵 Problem 29 – Simulated Upload with requestAnimationFrame

### ✅ **Problem Statement**

Simulate an upload progress bar from 0 → 100% over 5 seconds using `requestAnimationFrame`. Provide **Start** and **Cancel** buttons.

You must use:

* `requestAnimationFrame` and time calculations

---

### 🔍 **Subtle Hint**

* Use timestamp passed to RAF callback to compute elapsed fraction.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Sim Upload</title></head>
<body>
  <div style="width:300px;border:1px solid #ccc"><div id="bar" style="height:12px;width:0%"></div></div>
  <button id="start">Start Upload</button>
  <button id="cancel">Cancel</button>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Smooth progress to 100% in ~5s. Cancel resets.

---

### 🧑‍🏫 **Instructor Solution**

```js
const bar = document.getElementById('bar');
const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
let raf = null;
let startTime = null;

function animate(ts) {
  if (!startTime) startTime = ts;
  const elapsed = ts - startTime;
  const pct = Math.min(1, elapsed / 5000);
  bar.style.width = (pct * 100) + '%';
  if (pct < 1) {
    raf = requestAnimationFrame(animate);
  } else {
    raf = null;
    startTime = null;
    alert('Complete');
  }
}

start.addEventListener('click', () => {
  if (raf) return;
  startTime = null;
  raf = requestAnimationFrame(animate);
});

cancel.addEventListener('click', () => {
  if (raf) cancelAnimationFrame(raf);
  raf = null;
  startTime = null;
  bar.style.width = '0%';
});
```

---

### 🧪 **Test Cases**

1. Start → bar moves to 100% in ~5s.
2. Cancel → bar resets to 0%.

---

# 🔵 Problem 30 – MutationObserver for Todo List

### ✅ **Problem Statement**

Watch a `<ul id="todo">` and log added/removed items or attribute changes in a log area using `MutationObserver`.

You must use:

* `MutationObserver` with `childList` and `attributes`

---

### 🔍 **Subtle Hint**

* Observe attribute changes with `attributes: true`.

---

### 📄 **Starter Code**

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Mutation Watch</title></head>
<body>
  <ul id="todo"></ul>
  <button id="add">Add</button>
  <button id="toggle">Toggle done on last</button>
  <pre id="log"></pre>

  <script>
    // Write your code here
  </script>
</body>
</html>
```

---

### 🎯 **Expected Behaviour**

* Adding/removing items or toggling `data-done` logs events to `#log`.

---

### 🧑‍🏫 **Instructor Solution**

```js
const todo = document.getElementById('todo');
const add = document.getElementById('add');
const toggle = document.getElementById('toggle');
const log = document.getElementById('log');

let i = 0;
add.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = 'Task ' + (++i);
  todo.appendChild(li);
});

toggle.addEventListener('click', () => {
  const last = todo.lastElementChild;
  if (!last) return;
  last.dataset.done = last.dataset.done === 'true' ? 'false' : 'true';
});

const obs = new MutationObserver((entries) => {
  entries.forEach(entry => {
    if (entry.type === 'childList') {
      entry.addedNodes.forEach(n => log.textContent += `Added: ${n.textContent}\n`);
      entry.removedNodes.forEach(n => log.textContent += `Removed: ${n.textContent}\n`);
    } else if (entry.type === 'attributes') {
      log.textContent += `Attribute ${entry.attributeName} changed on ${entry.target.textContent}\n`;
    }
  });
});

obs.observe(todo, { childList: true, subtree: false, attributes: true });
```

---

### 🧪 **Test Cases**

1. Click Add → log shows added item.
2. Toggle done on last → attribute change logged.

---

---


