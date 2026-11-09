import"./hoisted.CpP1qF00.js";let v=[],s=new Set,M="grid",w=null;const m=document.getElementById("media-grid-view"),A=document.getElementById("media-list-view"),D=document.getElementById("media-list-tbody"),E=document.getElementById("search-media-input"),k=document.getElementById("sort-media-select"),h=document.getElementById("view-grid-btn"),x=document.getElementById("view-list-btn"),z=document.getElementById("toggle-uploader-btn"),Z=document.getElementById("uploader-container"),i=document.getElementById("library-dropzone"),f=document.getElementById("library-file-input"),y=document.getElementById("upload-queue-container"),d=document.getElementById("upload-queue-list"),u=document.getElementById("bulk-actions-container"),F=document.getElementById("selected-count-badge"),j=document.getElementById("bulk-delete-btn"),S=document.getElementById("list-select-all"),U=document.getElementById("stat-total-count"),N=document.getElementById("stat-total-size"),r=document.getElementById("media-details-modal"),H=document.getElementById("close-modal-btn"),q=document.getElementById("modal-image-preview"),V=document.getElementById("modal-file-name"),P=document.getElementById("modal-file-size"),R=document.getElementById("modal-file-date"),L=document.getElementById("modal-file-url"),O=document.getElementById("modal-copy-url-btn"),B=document.getElementById("modal-snippet-html"),I=document.getElementById("modal-snippet-md"),G=document.getElementById("copy-html-snippet-btn"),Q=document.getElementById("copy-md-snippet-btn"),J=document.getElementById("modal-delete-btn"),K=document.getElementById("modal-open-link");function p(e){if(e===0)return"0 B";const t=1024,a=["B","KB","MB","GB"],n=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,n)).toFixed(1))+" "+a[n]}function l(e,t,a=!1){const n=document.getElementById("toast-notification"),o=document.getElementById("toast-title"),b=document.getElementById("toast-message"),C=document.getElementById("toast-icon");if(!n||!o||!b||!C){a&&alert(`${e}: ${t}`);return}o.textContent=e,b.textContent=t,a?C.className="fa-solid fa-circle-exclamation text-rose-400 text-xl":C.className="fa-solid fa-circle-check text-emerald-400 text-xl",n.classList.remove("hidden"),setTimeout(()=>{n.classList.add("hidden")},2800)}async function $(e,t="Copied to Clipboard"){try{await navigator.clipboard.writeText(e),l(t,e)}catch{prompt("Copy URL:",e)}}async function g(){try{const e=await fetch("/api/admin/uploads");if(!e.ok)throw new Error("Failed to load media");const t=await e.json();v=t.data||[],U&&(U.textContent=String(t.totalFiles||v.length)),N&&(N.textContent=p(t.totalBytes||0)),c()}catch(e){l("Error",e.message,!0)}}function _(){let e=[...v];const t=E?E.value.trim().toLowerCase():"";t&&(e=e.filter(n=>n.filename.toLowerCase().includes(t)));const a=k?k.value:"date-desc";return e.sort((n,o)=>a==="date-desc"?new Date(o.createdAt)-new Date(n.createdAt):a==="date-asc"?new Date(n.createdAt)-new Date(o.createdAt):a==="size-desc"?o.size-n.size:a==="size-asc"?n.size-o.size:a==="name-asc"?n.filename.localeCompare(o.filename):0),e}function c(){const e=_();M==="grid"?ee(e):te(e),X()}function ee(e){if(m){if(e.length===0){m.innerHTML=`
        <div class="col-span-full py-16 text-center text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <i class="fa-solid fa-photo-film text-4xl mb-3 text-slate-300 dark:text-slate-700 block"></i>
          <span class="text-sm font-bold text-slate-600 dark:text-slate-400 block">No matching media files</span>
          <span class="text-xs text-slate-400">Try adjusting your search query or upload new media.</span>
        </div>
      `;return}m.innerHTML=e.map(t=>{const a=s.has(t.filename),n=new Date(t.createdAt).toLocaleDateString(void 0,{month:"short",day:"numeric"});return`
        <div
          class="media-card group relative rounded-xl border ${a?"border-[#2271b1] ring-2 ring-[#2271b1]/30":"border-slate-200 dark:border-slate-800"} bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          data-filename="${t.filename}"
        >
          <!-- Thumbnail preview -->
          <div class="relative aspect-square bg-slate-100 dark:bg-slate-800/80 overflow-hidden flex items-center justify-center cursor-pointer view-details-trigger">
            <img
              src="${t.url}"
              alt="${t.filename}"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />

            <!-- Overlay Actions on Hover -->
            <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
              <button
                type="button"
                class="copy-url-btn p-2 rounded-lg bg-white/90 hover:bg-white text-slate-900 text-xs font-bold shadow hover:scale-105 transition-all"
                data-url="${t.url}"
                title="Copy URL"
              >
                <i class="fa-solid fa-copy"></i>
              </button>
              <button
                type="button"
                class="preview-modal-btn p-2 rounded-lg bg-[#2271b1] hover:bg-blue-600 text-white text-xs font-bold shadow hover:scale-105 transition-all"
                title="View Details"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
              <button
                type="button"
                class="delete-single-btn p-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow hover:scale-105 transition-all"
                data-filename="${t.filename}"
                title="Delete File"
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>

            <!-- Selection Checkbox -->
            <input
              type="checkbox"
              class="media-select-checkbox absolute top-2 left-2 w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-white/90 text-[#2271b1] cursor-pointer shadow"
              data-filename="${t.filename}"
              ${a?"checked":""}
            />
          </div>

          <!-- Card Info Footer -->
          <div class="p-2.5 flex flex-col justify-between flex-1 gap-1 border-t border-slate-100 dark:border-slate-800">
            <span class="text-xs font-medium text-slate-800 dark:text-slate-200 truncate block" title="${t.filename}">
              ${t.filename}
            </span>
            <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>${p(t.size)}</span>
              <span>${n}</span>
            </div>
          </div>
        </div>
      `}).join(""),W()}}function te(e){if(D){if(e.length===0){D.innerHTML=`
        <tr>
          <td colspan="7" class="py-12 text-center text-slate-400">
            No media files found.
          </td>
        </tr>
      `;return}D.innerHTML=e.map(t=>{const a=s.has(t.filename),n=new Date(t.createdAt).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"});return`
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${a?"bg-blue-50/40 dark:bg-blue-950/30":""}">
          <td class="p-3 text-center">
            <input
              type="checkbox"
              class="media-select-checkbox rounded w-3.5 h-3.5 cursor-pointer"
              data-filename="${t.filename}"
              ${a?"checked":""}
            />
          </td>
          <td class="p-3">
            <img
              src="${t.url}"
              alt="${t.filename}"
              class="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 cursor-pointer view-details-trigger"
            />
          </td>
          <td class="p-3 font-medium text-slate-800 dark:text-slate-200 truncate max-w-xs font-sans">
            <button type="button" class="view-details-trigger text-left hover:text-[#2271b1] transition-colors truncate block max-w-full">
              ${t.filename}
            </button>
          </td>
          <td class="p-3 text-slate-500 max-w-xs truncate text-[11px]">
            <span class="select-all">${t.url}</span>
          </td>
          <td class="p-3 text-slate-600 dark:text-slate-300">
            ${p(t.size)}
          </td>
          <td class="p-3 text-slate-400">
            ${n}
          </td>
          <td class="p-3 text-right">
            <div class="inline-flex items-center gap-1.5">
              <button
                type="button"
                class="copy-url-btn p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#2271b1]"
                data-url="${t.url}"
                title="Copy Link"
              >
                <i class="fa-solid fa-copy"></i>
              </button>
              <button
                type="button"
                class="preview-modal-btn p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-500"
                title="View Details"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
              <button
                type="button"
                class="delete-single-btn p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                data-filename="${t.filename}"
                title="Delete File"
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),W()}}function W(){document.querySelectorAll(".media-select-checkbox").forEach(e=>{e.addEventListener("change",t=>{const a=e.getAttribute("data-filename");e.checked?s.add(a):s.delete(a),X()})}),document.querySelectorAll(".copy-url-btn").forEach(e=>{e.addEventListener("click",t=>{t.stopPropagation();const a=e.getAttribute("data-url");a&&$(a,"Image URL Copied")})}),document.querySelectorAll(".preview-modal-btn, .view-details-trigger").forEach(e=>{e.addEventListener("click",t=>{if(t.target&&t.target.classList.contains("media-select-checkbox"))return;const a=e.closest("[data-filename]")||e.closest("tr"),n=a?a.getAttribute("data-filename"):null;if(n){const o=v.find(b=>b.filename===n);o&&ae(o)}})}),document.querySelectorAll(".delete-single-btn").forEach(e=>{e.addEventListener("click",async t=>{t.stopPropagation();const a=e.getAttribute("data-filename");if(a&&confirm(`Are you sure you want to permanently delete "${a}"?`))try{if(!(await fetch(`/api/admin/uploads/${encodeURIComponent(a)}`,{method:"DELETE"})).ok)throw new Error("Failed to delete file");l("Deleted",`"${a}" was removed.`),s.delete(a),g()}catch(n){l("Error",n.message,!0)}})})}function X(){const e=s.size;u&&F&&(e>0?(u.classList.remove("hidden"),u.classList.add("flex"),F.textContent=`${e} selected`):(u.classList.add("hidden"),u.classList.remove("flex")))}function ae(e){if(w=e,!r)return;q&&(q.src=e.url),V&&(V.textContent=e.filename),P&&(P.textContent=p(e.size)),R&&(R.textContent=new Date(e.createdAt).toLocaleString()),L&&(L.value=window.location.origin+e.url),K&&(K.href=e.url);const t=e.filename.replace(/\.[^/.]+$/,"").replace(/[-_]+/g," ");B&&(B.value=`<img src="${e.url}" alt="${t}" />`),I&&(I.value=`![${t}](${e.url})`),r.classList.remove("hidden"),r.classList.add("flex")}function T(){r&&(r.classList.add("hidden"),r.classList.remove("flex")),w=null}async function Y(e){if(!e||e.length===0)return;y&&d&&(y.classList.remove("hidden"),d.innerHTML="");const t=new FormData;for(let a=0;a<e.length;a++)if(t.append("images",e[a]),d){const n=document.createElement("div");n.className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700",n.innerHTML=`
          <span class="truncate font-mono text-slate-700 dark:text-slate-300 max-w-xs">${e[a].name} (${p(e[a].size)})</span>
          <span class="status-badge flex items-center gap-1 text-[#2271b1] font-bold"><i class="fa-solid fa-spinner fa-spin"></i> Uploading...</span>
        `,d.appendChild(n)}try{const a=await fetch("/api/admin/uploads",{method:"POST",body:t});if(!a.ok){const o=await a.json().catch(()=>({error:"Upload failed"}));throw new Error(o.error||"Failed to upload files")}const n=await a.json();l("Upload Complete",`Successfully uploaded ${e.length} file(s).`),d&&d.querySelectorAll(".status-badge").forEach(o=>{o.className="status-badge flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold",o.innerHTML='<i class="fa-solid fa-circle-check"></i> Done'}),setTimeout(()=>{y&&y.classList.add("hidden")},3e3),g()}catch(a){l("Upload Error",a.message,!0),d&&d.querySelectorAll(".status-badge").forEach(n=>{n.className="status-badge flex items-center gap-1 text-rose-600 font-bold",n.innerHTML='<i class="fa-solid fa-circle-exclamation"></i> Error'})}finally{f&&(f.value="")}}z&&Z&&z.addEventListener("click",()=>{f?.click()});i?.addEventListener("click",()=>f?.click());i?.addEventListener("dragover",e=>{e.preventDefault(),i.classList.add("border-[#2271b1]","bg-blue-50/60","dark:bg-blue-950/40")});i?.addEventListener("dragleave",()=>{i.classList.remove("border-[#2271b1]","bg-blue-50/60","dark:bg-blue-950/40")});i?.addEventListener("drop",e=>{e.preventDefault(),i.classList.remove("border-[#2271b1]","bg-blue-50/60","dark:bg-blue-950/40"),e.dataTransfer&&e.dataTransfer.files&&Y(e.dataTransfer.files)});f?.addEventListener("change",e=>{e.target&&e.target.files&&Y(e.target.files)});E&&E.addEventListener("input",()=>{c()});k&&k.addEventListener("change",()=>{c()});h&&x&&(h.addEventListener("click",()=>{M="grid",h.className="px-2.5 py-1 rounded text-xs font-bold bg-white dark:bg-slate-700 text-[#2271b1] shadow-xs",x.className="px-2.5 py-1 rounded text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors",m?.classList.remove("hidden"),A?.classList.add("hidden"),c()}),x.addEventListener("click",()=>{M="list",x.className="px-2.5 py-1 rounded text-xs font-bold bg-white dark:bg-slate-700 text-[#2271b1] shadow-xs",h.className="px-2.5 py-1 rounded text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors",A?.classList.remove("hidden"),m?.classList.add("hidden"),c()}));S&&S.addEventListener("change",()=>{const e=_();S.checked?e.forEach(t=>s.add(t.filename)):s.clear(),c()});j&&j.addEventListener("click",async()=>{const e=s.size;if(e!==0&&confirm(`Are you sure you want to permanently delete ${e} selected media files?`))try{if(!(await fetch("/api/admin/uploads/bulk-delete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({filenames:Array.from(s)})})).ok)throw new Error("Bulk delete failed");l("Bulk Deleted",`${e} files deleted.`),s.clear(),g()}catch(t){l("Error",t.message,!0)}});H&&H.addEventListener("click",T);r&&r.addEventListener("click",e=>{e.target===r&&T()});O&&L&&O.addEventListener("click",()=>{$(L.value,"Direct URL Copied")});G&&B&&G.addEventListener("click",()=>{$(B.value,"HTML Snippet Copied")});Q&&I&&Q.addEventListener("click",()=>{$(I.value,"Markdown Snippet Copied")});J&&J.addEventListener("click",async()=>{if(!w)return;const e=w.filename;if(confirm(`Permanently delete "${e}"?`))try{if(!(await fetch(`/api/admin/uploads/${encodeURIComponent(e)}`,{method:"DELETE"})).ok)throw new Error("Failed to delete file");l("Deleted",`"${e}" was removed.`),T(),s.delete(e),g()}catch(t){l("Error",t.message,!0)}});g();
