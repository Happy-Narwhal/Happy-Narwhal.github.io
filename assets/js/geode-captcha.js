// Minimal Geode Captcha Widget
// Usage: Add <div class="geode-captcha"></div> in your form and give your submit button the class "geode-submit"
// Requires: rock2.png, hammer.png, break.gif, and wrong choice images in /assets/images/captcha/
(function(){
  // Detect base path - works for both Jekyll and static serving
  const basePath = window.location.pathname.includes('.html') 
    ? '' 
    : '/';
  const imgPath = basePath + 'assets/images/captcha/';

  // Wrong choice images - rotated randomly each time
  const wrongImages = [
    imgPath + 'desktopcomputer.png',
    imgPath + 'discoball.png',
    imgPath + 'mirror.png'
  ];
  // Shuffle and pick 2 wrong images
  const shuffled = wrongImages.sort(() => Math.random() - 0.5);
  const wrongPick1 = shuffled[0];
  const wrongPick2 = shuffled[1];

  // Randomly choose which slot (0, 1, or 2) is the correct rock
  const correctIdx = Math.floor(Math.random() * 3);

  // Build the 3 rock slots
  const slots = [0, 1, 2];
  let wrongIdx = 0;
  const wrongPicks = [wrongPick1, wrongPick2];
  const rockHtml = slots.map(i => {
    if (i === correctIdx) {
      return `<div class="geode-rock geode-hinted"><img class="geode-rock-img" src="${imgPath}rock2.png"><img class="geode-break-gif" src="${imgPath}break.gif"></div>`;
    } else {
      const img = wrongPicks[wrongIdx++];
      return `<div class="geode-rock"><img class="geode-rock-img" src="${img}"><img class="geode-break-gif" src="${imgPath}break.gif"></div>`;
    }
  }).join('\n          ');

  const html = `
    <div class="geode-captcha-box">
      <div class="geode-captcha-header">🔒 Verify you're human</div>
      <div class="geode-captcha-stage">
        <div class="geode-captcha-hint">Drag the hammer to the glowing rock</div>
        <div class="geode-captcha-rocks">
          ${rockHtml}
        </div>
        <div class="geode-hammer" draggable="false"><img src="${imgPath}hammer.png"></div>
      </div>
      <input type="hidden" name="geode_captcha_solved" value="0">
    </div>
  `;
  const box = document.querySelector('.geode-captcha');
  if (!box) return;
  box.innerHTML = html;
  const rocks = box.querySelectorAll('.geode-rock');
  const hammer = box.querySelector('.geode-hammer');
  const hint = box.querySelector('.geode-captcha-hint');
  const solvedInput = box.querySelector('input[name="geode_captcha_solved"]');
  const submitBtn = document.querySelector('.geode-submit');
  let solved = false;
  // Drag logic
  let dragging = false, lastX=0, lastY=0;
  hammer.addEventListener('pointerdown', e => {
    if (solved) return;
    dragging = true;
    lastX = e.clientX; lastY = e.clientY;
    hammer.setPointerCapture(e.pointerId);
    hammer.classList.add('dragging');
  });
  document.addEventListener('pointermove', e => {
    if (!dragging || solved) return;
    const stage = box.querySelector('.geode-captcha-stage');
    const rect = stage.getBoundingClientRect();
    let x = Math.max(0, Math.min(rect.width-50, e.clientX-rect.left-25));
    let y = Math.max(0, Math.min(rect.height-50, e.clientY-rect.top-25));
    hammer.style.left = x+'px';
    hammer.style.top = y+'px';
    hammer.style.right = 'auto';
    hammer.style.bottom = 'auto';
  });
  document.addEventListener('pointerup', e => {
    if (!dragging || solved) return;
    dragging = false;
    hammer.classList.remove('dragging');
    // Check collision
    const h = hammer.getBoundingClientRect();
    const hx = h.left + h.width/2, hy = h.top + h.height/2;
    let hit = -1;
    rocks.forEach((rock,i)=>{
      const r = rock.getBoundingClientRect();
      if (hx>=r.left && hx<=r.right && hy>=r.top && hy<=r.bottom) hit=i;
    });
    if (hit===-1) return;
    if (hit===correctIdx) {
      rocks[hit].classList.add('geode-solved');
      solved = true;
      solvedInput.value = '1';
      if (submitBtn) submitBtn.disabled = false;
      // Play GIF
      const gif = rocks[hit].querySelector('.geode-break-gif');
      if (gif) { let src=gif.src; gif.src=''; gif.src=src; }
      hint.textContent = '✓ Verified!';
    } else {
      rocks[hit].classList.add('geode-wrong');
      setTimeout(()=>rocks[hit].classList.remove('geode-wrong'),300);
      hint.textContent = 'Wrong rock!';
    }
  });
  // Block submit until solved
  if (submitBtn) submitBtn.disabled = true;
})();
