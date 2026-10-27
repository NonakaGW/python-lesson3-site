'use strict';

// チェック状態はサーバーへ送信せず、この端末だけに保存する。
const storageKey = 'python-lesson3-self-study-progress-v1';
const basicIds = ['q1', 'q2', 'q3', 'q4', 'q5'];
const allIds = [...basicIds, 'c1', 'c2', 'c3'];
const checkboxes = [...document.querySelectorAll('[data-complete]')];
const progressNumber = document.getElementById('basicCount');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressMessage = document.getElementById('progressMessage');
const toast = document.getElementById('toast');
let toastTimer;

function readSavedProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    return saved;
  } catch (_) {
    return {};
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch (_) {
    // プライベートブラウズや学校端末の制限下でも、ページは使えるようにする。
  }
}

function syncProgress() {
  const completed = checkboxes.filter(box => basicIds.includes(box.dataset.complete) && box.checked).length;
  progressNumber.textContent = String(completed);
  progressBar.setAttribute('aria-valuenow', String(completed));
  progressFill.style.width = `${(completed / basicIds.length) * 100}%`;
  progressMessage.textContent = completed === 5
    ? '基本5問クリア！ ここまでできればOK！'
    : completed === 0
      ? '1問ずつ、できたらチェックを入れよう！'
      : `${completed}問クリア！ 自分のペースで進もう。`;

  for (const checkbox of checkboxes) {
    const card = checkbox.closest('.problem');
    card?.classList.toggle('is-done', checkbox.checked);
  }
}

function initProgress() {
  const saved = readSavedProgress();
  for (const checkbox of checkboxes) {
    checkbox.checked = saved[checkbox.dataset.complete] === true;
    checkbox.addEventListener('change', () => {
      const progress = {};
      for (const box of checkboxes) progress[box.dataset.complete] = box.checked;
      saveProgress(progress);
      syncProgress();
    });
  }
  syncProgress();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2300);
}

// サンプル開始コードとバグ問題のコードだけをコピーできる。完成解答のコピー機能は設けない。
async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textArea = document.createElement('textarea');
  textArea.value = value;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand('copy');
  textArea.remove();
  if (!copied) throw new Error('コピーできませんでした');
}

function initCopyButtons() {
  for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
      const id = button.dataset.copy;
      const node = document.getElementById(id);
      if (!node) return;
      try {
        await copyText(node.textContent);
        showToast('コードをコピーしたよ！');
      } catch (_) {
        showToast('コピーできなかったので、コードを選択して使ってね。');
      }
    });
  }
}

initProgress();
initCopyButtons();
