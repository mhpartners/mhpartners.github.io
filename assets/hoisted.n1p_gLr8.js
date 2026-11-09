import"./hoisted.CpP1qF00.js";const v=document.getElementById("badgesForm"),e=document.getElementById("badgesHtml"),o=document.getElementById("badgesEnabled"),m=document.getElementById("statusLabel"),l=document.getElementById("previewBadgesArea"),g=document.getElementById("charCount"),i=document.getElementById("saveBadgesBtn"),d=document.getElementById("saveBtnText"),a=document.getElementById("previewContainer"),r=document.getElementById("previewCopyright"),f=document.getElementById("previewBgLight"),h=document.getElementById("previewBgDark"),b=document.getElementById("presetImageLink"),y=document.getElementById("presetTextLink"),x=document.getElementById("presetTrustSeal"),w=document.getElementById("clearHtmlBtn");function n(){const t=e?.value||"";if(g&&(g.textContent=`${t.length} chars`),!l)return;const c=o?.checked??!0;t.trim()?c?l.innerHTML=t:l.innerHTML=`
          <div class="text-xs text-amber-600 dark:text-amber-400 italic py-2 flex items-center gap-2">
            <i class="fa-solid fa-eye-slash"></i>
            <span>Badges are currently disabled. Toggle visibility above to show them on public pages.</span>
          </div>
        `:l.innerHTML=`
          <div class="text-xs text-slate-400 italic py-2 flex items-center gap-2">
            <i class="fa-solid fa-circle-info"></i>
            <span>No badges added yet. Paste your custom HTML above or choose a quick template.</span>
          </div>
        `}o?.addEventListener("change",()=>{m&&(m.textContent=o.checked?"Active":"Disabled",m.className=o.checked?"ml-3 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400":"ml-3 text-xs font-bold uppercase tracking-wider text-slate-400"),n()});e?.addEventListener("input",n);f?.addEventListener("click",()=>{a&&r&&(a.style.backgroundColor="#ffffff",a.style.borderColor="#e2e8f0",r.style.color="#94a3b8",r.style.borderColor="#e2e8f0")});h?.addEventListener("click",()=>{a&&r&&(a.style.backgroundColor="#0b0f19",a.style.borderColor="#1e293b",r.style.color="#64748b",r.style.borderColor="#1e293b")});b?.addEventListener("click",()=>{const t=`<a href="https://example.com" target="_blank" rel="noopener noreferrer" title="Featured Partner">
  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&h=48&fit=crop" alt="Partner Badge" height="32" />
</a>
`;e.value=(e.value.trim()?e.value.trim()+`

`:"")+t,n(),e.focus()});y?.addEventListener("click",()=>{const t=`<a href="https://example.com" target="_blank" rel="noopener noreferrer" class="font-medium hover:underline text-xs text-slate-500 hover:text-[#ff2d20] flex items-center gap-1">
  <span>Directory Partner</span>
  <svg class="w-3 h-3 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
</a>
`;e.value=(e.value.trim()?e.value.trim()+`

`:"")+t,n(),e.focus()});x?.addEventListener("click",()=>{const t=`<div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-medium">
  <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  <span>Verified & SSL Protected</span>
</div>
`;e.value=(e.value.trim()?e.value.trim()+`

`:"")+t,n(),e.focus()});w?.addEventListener("click",()=>{confirm("Are you sure you want to clear the custom badges HTML?")&&(e.value="",n(),e.focus())});v?.addEventListener("submit",async t=>{t.preventDefault();const c=e?.value??"",p=!!o?.checked;i&&(i.disabled=!0),d&&(d.textContent="Saving...");try{if((await fetch("/api/admin/site-settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({badgesHtml:c,badgesEnabled:p})})).ok){const s=window;s.showToast?s.showToast("Badges Saved","Footer badges configuration updated successfully."):alert("Badges saved successfully!")}else{const s=window;s.showToast?s.showToast("Error","Failed to save badges settings.",!0):alert("Failed to save badges settings.")}}catch(u){console.error(u);const s=window;s.showToast?s.showToast("Error","An unexpected error occurred while saving.",!0):alert("An unexpected error occurred while saving.")}finally{i&&(i.disabled=!1),d&&(d.textContent="Save Badges")}});n();
