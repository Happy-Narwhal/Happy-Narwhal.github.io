// Geode Captcha Widget
// Usage: Add <div class="geode-captcha"></div> in your form and give your submit button the class "geode-submit"
// Requires: break.gif, desktopcomputer.png, hammer.png, mirror.png, rock.png, sandcastle.png in /assets/images/captcha/
(function(){
  'use strict';

  const box = document.querySelector('.geode-captcha');
  if (!box) return;

  // Wrong choice images - shuffled randomly
  const wrongImages = [
    '/assets/images/captcha/desktopcomputer.png',
    '/assets/images/captcha/sandcastle.png',
    '/assets/images/captcha/mirror.png'
  ];
  
  // Shuffle and pick 2 wrong images
  const shuffled = wrongImages.sort(() => Math.random() - 0.5);
  const wrongPick1 = shuffled[0];
  const wrongPick2 = shuffled[1];

  // Randomly choose which slot (0, 1, or 2) is the correct image
  const correctIdx = Math.floor(Math.random() * 3);

  // Build the 3 image slots
  const slots = [0, 1, 2];
  let wrongIdx = 0;
  const wrongPicks = [wrongPick1, wrongPick2];
  const rockHtml = slots.map(i => {
    if (i === correctIdx) {
      return `<div class="geode-rock"><img class="geode-rock-img" src="/assets/images/captcha/rock.png"><img class="geode-break-gif" src="/assets/images/captcha/break.gif"></div>`;
    } else {
      const img = wrongPicks[wrongIdx++];
      return `<div class="geode-rock"><img class="geode-rock-img" src="${img}"><img class="geode-break-gif" src="/assets/images/captcha/break.gif"></div>`;
    }
  }).join('\n          ');

  const html = `
    <div class="geode-captcha-box">
      <div class="geode-captcha-header">🔒 Verify you're human</div>
      <div class="geode-captcha-stage">
        <div class="geode-captcha-hint">Drag the hammer to the geode</div>
        <div class="geode-captcha-rocks">
          ${rockHtml}
        </div>
        <div class="geode-hammer" draggable="false"><img src="/assets/images/captcha/hammer.png"></div>
      </div>
      <input type="hidden" name="geode_captcha_solved" value="0">
      <input type="hidden" name="geode_captcha_token" value="">
    </div>
  `;
  box.innerHTML = html;
  
  const rocks = box.querySelectorAll('.geode-rock');
  const hammer = box.querySelector('.geode-hammer');
  const hint = box.querySelector('.geode-captcha-hint');
  const solvedInput = box.querySelector('input[name="geode_captcha_solved"]');
  const tokenInput = box.querySelector('input[name="geode_captcha_token"]');
  const submitBtn = document.querySelector('.geode-submit');
  
  const state = {
    dragging: false,
    solved: false,
    attempts: 0,
    maxAttempts: 2,
    dragDistance: 0,
    lastPos: null,
    startTime: Date.now()
  };

  // Drag logic
  hammer.addEventListener('pointerdown', e => {
    if (state.solved || state.attempts >= state.maxAttempts) return;
    state.dragging = true;
    state.lastPos = { x: e.clientX, y: e.clientY };
    state.dragDistance = 0;
    hammer.setPointerCapture(e.pointerId);
    hammer.classList.add('dragging');
  });
  
  document.addEventListener('pointermove', e => {
    if (!state.dragging || state.solved) return;
    
    // Track drag distance
    if (state.lastPos) {
      const dx = e.clientX - state.lastPos.x;
      const dy = e.clientY - state.lastPos.y;
      state.dragDistance += Math.sqrt(dx*dx + dy*dy);
      state.lastPos = { x: e.clientX, y: e.clientY };
    }
    
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
    if (!state.dragging || state.solved) return;
    state.dragging = false;
    hammer.classList.remove('dragging');
    
    if (state.attempts >= state.maxAttempts) return;
    
    // Must have dragged minimum distance
    if (state.dragDistance < 30) {
      hint.textContent = 'Drag the hammer to the geode';
      return;
    }
    
    // Check collision
    const h = hammer.getBoundingClientRect();
    const hx = h.left + h.width/2, hy = h.top + h.height/2;
    let hit = -1;
    rocks.forEach((rock,i)=>{
      const r = rock.getBoundingClientRect();
      if (hx>=r.left && hx<=r.right && hy>=r.top && hy<=r.bottom) hit=i;
    });
    if (hit===-1) return;
    
    state.attempts++;
    
    if (hit===correctIdx) {
      const elapsed = Date.now() - state.startTime;
      rocks[hit].classList.add('geode-solved');
      state.solved = true;
      solvedInput.value = '1';
      tokenInput.value = btoa(JSON.stringify({ t: state.startTime, e: elapsed }));
      if (submitBtn) submitBtn.disabled = false;
      // Play GIF
      const gif = rocks[hit].querySelector('.geode-break-gif');
      if (gif) { let src=gif.src; gif.src=''; gif.src=src; }
      hint.textContent = '✓ Verified!';
      hammer.classList.add('done');
    } else {
      rocks[hit].classList.add('geode-wrong');
      setTimeout(()=>rocks[hit].classList.remove('geode-wrong'),300);
      
      if (state.attempts >= state.maxAttempts) {
        hint.textContent = 'Too many attempts - refresh to retry';
        hammer.classList.add('done');
        rocks.forEach(r => r.style.pointerEvents = 'none');
      } else {
        hint.textContent = `Wrong! ${state.maxAttempts - state.attempts} attempt${state.maxAttempts - state.attempts === 1 ? '' : 's'} left`;
      }
    }
  });
  
  // Block submit until solved
  if (submitBtn) submitBtn.disabled = true;
})();
