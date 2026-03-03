// Minimal Geode Captcha Widget
// Usage: Add <div class="geode-captcha"></div> in your form and give your submit button the class "geode-submit"
// Requires: rock.png, rock2.png, hammer.png, break.gif in /assets/images/captcha/
(function(){
  const html = `
    <div class="geode-captcha-box">
      <div class="geode-captcha-header">🔒 Verify you're human</div>
      <div class="geode-captcha-stage">
        <div class="geode-captcha-hint">Drag the hammer to the glowing rock</div>
        <div class="geode-captcha-rocks">
          <div class="geode-rock"><img class="geode-rock-img" src="/assets/images/captcha/rock.png"><img class="geode-break-gif" src="/assets/images/captcha/break.gif"></div>
          <div class="geode-rock"><img class="geode-rock-img" src="/assets/images/captcha/rock.png"><img class="geode-break-gif" src="/assets/images/captcha/break.gif"></div>
          <div class="geode-rock"><img class="geode-rock-img" src="/assets/images/captcha/rock.png"><img class="geode-break-gif" src="/assets/images/captcha/break.gif"></div>
        </div>
        <div class="geode-hammer" draggable="false"><img src="/assets/images/captcha/hammer.png"></div>
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
  let correctIdx = Math.floor(Math.random()*rocks.length);
  rocks[correctIdx].classList.add('geode-hinted');
  rocks[correctIdx].querySelector('.geode-rock-img').src = '/assets/images/captcha/rock2.png';
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
