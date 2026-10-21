(() => {
  'use strict';
  const data = window.LESSON_SLIDES;
  if (!data || !Array.isArray(data.titles) || !data.chapters) return;
  const total = data.titles.length;
  const $ = (id) => document.getElementById(id);
  const el = { image:$('slideImage'), zoomImage:$('zoomImage'), currentNumber:$('currentNumber'), totalNumber:$('totalNumber'), currentChapter:$('currentChapter'), title:$('currentSlideTitle'), progress:$('slideProgress'), progressFill:$('progressFill'), pageIndicator:$('pageIndicator'), prev:$('prevSlide'), next:$('nextSlide'), chapterList:$('chapterList'), thumbPanel:$('thumbnailPanel'), thumbs:$('thumbnailGrid'), toggleThumbs:$('toggleThumbnails'), closeThumbs:$('closeThumbnails'), lightbox:$('lightbox'), zoomCaption:$('zoomCaption'), zoomPrev:$('zoomPrev'), zoomNext:$('zoomNext') };
  let current=1, thumbsBuilt=false;
  const imagePath=(n)=>`assets/slides/slide-${String(n).padStart(2,'0')}.webp`;
  const thumbPath=(n)=>`assets/thumbs/slide-${String(n).padStart(2,'0')}.webp`;
  const currentSection=(n)=>data.chapters.findIndex(ch => n>=ch.start && n<=ch.end);
  function fromHash(){ const match=location.hash.match(/^#slide=(\d+)$/); return match?Math.min(total,Math.max(1,parseInt(match[1],10))):1; }
  function selectSlide(n,options={}){
    n=Math.min(total,Math.max(1,n)); current=n;
    const title=data.titles[n-1];
    const chapter=data.chapters[currentSection(n)];
    const src=imagePath(n);
    el.image.src=src;
    el.image.alt=`スライド${n}：${title}`;
    el.currentNumber.textContent=String(n).padStart(2,'0');
    el.totalNumber.textContent=total;
    el.currentChapter.textContent=chapter?.title || '';
    el.title.textContent=title;
    el.pageIndicator.textContent=`${n} / ${total}`;
    el.progressFill.style.width=(n/total*100)+'%';
    el.progress.setAttribute('aria-valuenow',String(n));
    el.prev.disabled=n===1; el.next.disabled=n===total;
    el.zoomPrev.disabled=n===1; el.zoomNext.disabled=n===total;
    if(el.lightbox.open){el.zoomImage.src=src;el.zoomImage.alt=el.image.alt;el.zoomCaption.textContent=`${title} · ${n} / ${total}`;}
    [...el.chapterList.children].forEach((btn,i)=>{
      const active = i===currentSection(n); btn.classList.toggle('active',active); if(active) btn.setAttribute('aria-current','true'); else btn.removeAttribute('aria-current');
    });
    if(thumbsBuilt){ [...el.thumbs.children].forEach((btn,i)=>{btn.classList.toggle('active',i+1===n);if(i+1===n)btn.setAttribute('aria-current','true');else btn.removeAttribute('aria-current');});}
    if(options.updateUrl!==false) history.replaceState(null,'','#slide='+n);
    for(const index of [n+1,n-1]){ if(index>=1 && index<=total){const preload = new Image();preload.src=imagePath(index);} }
  }
  data.chapters.forEach((chapter,i)=>{
    const btn=document.createElement('button');btn.type='button';btn.className='chapter-link';btn.setAttribute('aria-label',`${chapter.title}、スライド${chapter.start}から`);
    const code = String(i+1).padStart(2,'0');
    btn.innerHTML=`<span class="chapter-num">${code}</span><span class="chapter-main"><strong>${chapter.title}</strong><small>${chapter.desc}</small></span><span class="chapter-page">${chapter.start}–${chapter.end}</span>`;
    btn.addEventListener('click',()=>{selectSlide(chapter.start);$('viewer').scrollIntoView({behavior:'smooth',block:'start'});});
    el.chapterList.appendChild(btn);
  });
  function buildThumbs(){
    if(thumbsBuilt)return;thumbsBuilt=true;
    const fragment=document.createDocumentFragment();
    data.titles.forEach((title,index)=>{
      const n=index+1;const btn=document.createElement('button');btn.type='button';btn.className='thumb-item';btn.setAttribute('aria-label',`スライド${n}：${title}`);
      const img=document.createElement('img');img.src=thumbPath(n);img.alt='';img.loading='lazy';img.width=448;img.height=252;const meta=document.createElement('span');meta.className='thumb-meta';
      const b=document.createElement('b');b.textContent=String(n).padStart(2,'0');const label=document.createElement('span');label.textContent=title;
      meta.append(b,label);btn.append(img,meta);
      btn.addEventListener('click',()=>{selectSlide(n);toggleThumbnails(false);$('viewer').scrollIntoView({behavior:'smooth',block:'start'});});fragment.appendChild(btn);
    });
    el.thumbs.appendChild(fragment);
  }
  function toggleThumbnails(show){
    if(show){buildThumbs();el.thumbPanel.hidden=false;el.toggleThumbs.setAttribute('aria-expanded','true');[...el.thumbs.children].forEach((b,i)=>b.classList.toggle('active',i+1===current));el.thumbPanel.scrollIntoView({behavior:'smooth',block:'start'});}
    else{el.thumbPanel.hidden=true;el.toggleThumbs.setAttribute('aria-expanded','false');}
  }
  el.toggleThumbs.addEventListener('click',()=>toggleThumbnails(el.thumbPanel.hidden));
  el.closeThumbs.addEventListener('click',()=>{toggleThumbnails(false);$('viewer').scrollIntoView({behavior:'smooth',block:'start'});});
  el.prev.addEventListener('click',()=>selectSlide(current-1));el.next.addEventListener('click',()=>selectSlide(current+1));
  function openZoom(){el.zoomImage.src=imagePath(current);el.zoomImage.alt=el.image.alt;el.zoomCaption.textContent=`${data.titles[current-1]} · ${current} / ${total}`;el.lightbox.showModal();}
  $('openZoom').addEventListener('click',openZoom);
  el.image.addEventListener('click',openZoom);
  el.image.style.cursor='zoom-in';
  $('closeZoom').addEventListener('click',()=>el.lightbox.close());
  el.lightbox.addEventListener('click',(evt)=>{if(evt.target===el.lightbox)el.lightbox.close();});
  el.zoomPrev.addEventListener('click',()=>selectSlide(current-1));el.zoomNext.addEventListener('click',()=>selectSlide(current+1));
  document.addEventListener('keydown',(event)=>{
    if(event.altKey||event.ctrlKey||event.metaKey)return;
    if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
    if(event.key==='ArrowRight'){event.preventDefault();selectSlide(current+1);}
    else if(event.key==='ArrowLeft'){event.preventDefault();selectSlide(current-1);}
    else if(event.key==='Home'){event.preventDefault();selectSlide(1);}
    else if(event.key==='End'){event.preventDefault();selectSlide(total);}
  });
  function bindSwipe(target){
    let startX=0,startY=0;
    target.addEventListener('touchstart',(evt)=>{if(evt.touches.length!==1)return;startX=evt.touches[0].clientX;startY=evt.touches[0].clientY;},{passive:true});
    target.addEventListener('touchend',(evt)=>{
      if(evt.changedTouches.length!==1)return;
      const dx=evt.changedTouches[0].clientX-startX;const dy=evt.changedTouches[0].clientY-startY;
      if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)selectSlide(current+(dx<0?1:-1));
    },{passive:true});
  }
  bindSwipe($('slideStage'));bindSwipe(document.querySelector('.lightbox-image-wrap'));
  window.addEventListener('hashchange',()=>selectSlide(fromHash(),{updateUrl:false}));
  selectSlide(fromHash(),{updateUrl:false});
})();
