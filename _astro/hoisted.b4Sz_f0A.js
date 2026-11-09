import"./hoisted.CpP1qF00.js";let n=1,ee=10,L="",te="created_at",ae="desc",A=1,D=null;const $=document.getElementById("users-tbody"),p=document.getElementById("table-loading"),h=document.getElementById("no-results"),u=document.getElementById("search-input"),l=document.getElementById("clear-search-btn"),U=document.getElementById("sort-select"),S=document.getElementById("limit-select"),P=document.getElementById("refresh-btn"),x=document.getElementById("refresh-icon"),j=document.getElementById("stat-total-users"),N=document.getElementById("stat-active-creators"),q=document.getElementById("stat-latest-user"),F=document.getElementById("pag-start"),H=document.getElementById("pag-end"),O=document.getElementById("pag-total"),y=document.getElementById("prev-page-btn"),v=document.getElementById("next-page-btn"),C=document.getElementById("page-numbers-container"),o=document.getElementById("user-details-modal"),R=document.getElementById("modal-user-avatar"),J=document.getElementById("modal-user-name"),_=document.getElementById("modal-user-email"),z=document.getElementById("modal-user-joined"),V=document.getElementById("modal-user-brackets-count"),W=document.getElementById("modal-brackets-badge"),T=document.getElementById("modal-brackets-list"),G=document.getElementById("close-details-modal-btn"),K=document.getElementById("close-details-modal-btn2"),d=document.getElementById("edit-user-modal"),Q=document.getElementById("edit-user-form"),E=document.getElementById("edit-user-id"),k=document.getElementById("edit-username"),B=document.getElementById("edit-email"),b=document.getElementById("edit-password"),X=document.getElementById("close-edit-modal-btn"),Y=document.getElementById("cancel-edit-btn");function f(e,t,a=!1){const s=document.getElementById("toast-notification"),g=document.getElementById("toast-title"),c=document.getElementById("toast-message"),m=document.getElementById("toast-icon");!s||!g||!c||!m||(g.textContent=e,c.textContent=t,a?m.className="fa-solid fa-circle-exclamation text-rose-400 text-xl":m.className="fa-solid fa-circle-check text-emerald-400 text-xl",s.classList.remove("hidden"),setTimeout(()=>{s.classList.add("hidden")},3e3))}async function r(){p&&p.classList.remove("hidden"),x&&x.classList.add("fa-spin");const e=new URLSearchParams({page:String(n),limit:String(ee),search:L,sortBy:te,sortOrder:ae});try{const t=await fetch(`/api/admin/users?${e.toString()}`);if(!t.ok)throw new Error("Failed to load users");const a=await t.json();re(a.data),oe(a.pagination),a.stats&&ne(a.stats)}catch(t){f("Error",t.message||"Failed to fetch users",!0)}finally{p&&p.classList.add("hidden"),x&&x.classList.remove("fa-spin")}}function ne(e){e&&(j&&(j.textContent=String(e.totalUsers||0)),N&&(N.textContent=String(e.activeCreators||0)),q&&(q.textContent=e.latestUser?e.latestUser.username:"None"))}function re(e){if($){if(!e||e.length===0){$.innerHTML="",h&&h.classList.remove("hidden");return}h&&h.classList.add("hidden"),$.innerHTML=e.map(t=>{const a=new Date(t.createdAt).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"}),s=t.bracketsCount>0?"bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800":"bg-slate-100 text-slate-500 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";return`
        <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
          <td class="py-3 px-4 font-medium text-slate-900 dark:text-white flex items-center gap-2.5">
            <img
              src="https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(t.username)}"
              alt="${t.username}"
              class="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0"
              loading="lazy"
            />
            <div class="min-w-0">
              <span class="font-bold block truncate">${t.username}</span>
              <span class="text-[10px] text-slate-400 font-mono">ID: #${t.id}</span>
            </div>
          </td>
          <td class="py-3 px-4 font-mono text-slate-600 dark:text-slate-300">
            ${t.email}
          </td>
          <td class="py-3 px-4 text-center">
            <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${s}">
              <i class="fa-solid fa-trophy text-[9px]"></i>
              ${t.bracketsCount}
            </span>
          </td>
          <td class="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">
            ${a}
          </td>
          <td class="py-3 px-4 text-right">
            <div class="inline-flex items-center gap-1.5">
              <button
                type="button"
                data-view-id="${t.id}"
                class="view-user-btn p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#2271b1] transition-colors"
                title="View Details & Brackets"
              >
                <i class="fa-solid fa-eye text-xs"></i>
              </button>
              <button
                type="button"
                data-edit-id="${t.id}"
                data-username="${t.username}"
                data-email="${t.email}"
                class="edit-user-btn p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors"
                title="Edit User Profile"
              >
                <i class="fa-solid fa-pen-to-square text-xs"></i>
              </button>
              <button
                type="button"
                data-delete-id="${t.id}"
                data-username="${t.username}"
                class="delete-user-btn p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors"
                title="Delete User"
              >
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          </td>
        </tr>
      `}).join(""),se()}}function oe(e){if(!e)return;n=e.page||1,A=e.totalPages||1;const t=e.total===0?0:(e.page-1)*e.limit+1,a=Math.min(e.page*e.limit,e.total);if(F&&(F.textContent=String(t)),H&&(H.textContent=String(a)),O&&(O.textContent=String(e.total)),y&&(y.disabled=!e.hasPrevPage),v&&(v.disabled=!e.hasNextPage),C){let s="",c=Math.max(1,n-2),m=Math.min(A,c+5-1);m-c<4&&(c=Math.max(1,m-5+1));for(let i=c;i<=m;i++)s+=`
          <button
            type="button"
            data-page="${i}"
            class="page-num-btn w-7 h-7 rounded-md text-xs font-bold transition-all ${i===n?"bg-[#2271b1] text-white shadow-xs":"border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"}"
          >
            ${i}
          </button>
        `;C.innerHTML=s,C.querySelectorAll(".page-num-btn").forEach(i=>{i.addEventListener("click",()=>{const w=parseInt(i.getAttribute("data-page")||"1",10);w!==n&&(n=w,r())})})}}function se(){document.querySelectorAll(".view-user-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=e.getAttribute("data-view-id");if(t)try{const a=await fetch(`/api/admin/users/${t}`);if(!a.ok)throw new Error("User not found");const s=await a.json();de(s.data)}catch(a){f("Error",a.message,!0)}})}),document.querySelectorAll(".edit-user-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-edit-id")||"",a=e.getAttribute("data-username")||"",s=e.getAttribute("data-email")||"";ie(t,a,s)})}),document.querySelectorAll(".delete-user-btn").forEach(e=>{e.addEventListener("click",async()=>{const t=e.getAttribute("data-delete-id"),a=e.getAttribute("data-username");if(t&&confirm(`Are you sure you want to permanently delete user "${a}"? All brackets created by this user will also be removed.`))try{if(!(await fetch(`/api/admin/users/${t}`,{method:"DELETE"})).ok)throw new Error("Failed to delete user");f("Deleted",`User "${a}" was removed successfully.`),r()}catch(s){f("Error",s.message,!0)}})})}function de(e){!o||!e||(R&&(R.src=`https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(e.username)}`),J&&(J.textContent=e.username),_&&(_.textContent=e.email),z&&(z.textContent=new Date(e.createdAt).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})),V&&(V.textContent=`${e.bracketsCount} Saved Brackets`),W&&(W.textContent=`${e.brackets?e.brackets.length:0} Tournaments`),T&&(!e.brackets||e.brackets.length===0?T.innerHTML='<p class="text-slate-400 italic py-4 text-center">No tournaments created yet by this user.</p>':T.innerHTML=e.brackets.map(t=>`
          <div class="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-3">
            <div class="min-w-0">
              <span class="font-bold text-slate-800 dark:text-slate-200 block truncate">${t.name}</span>
              <span class="text-[10px] text-slate-500 font-mono">${t.teamsCount} Teams • ${t.format==="double"?"Double Elim":"Single Elim"} • Winner: ${t.champion||"In Progress"}</span>
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <a href="/bracket/${t.shareToken}" target="_blank" class="px-2 py-1 rounded bg-[#2271b1] text-white font-bold text-[10px] hover:bg-blue-600 transition-colors flex items-center gap-1">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>Open</span>
              </a>
            </div>
          </div>
        `).join("")),o.classList.remove("hidden"),o.classList.add("flex"))}function M(){o&&(o.classList.add("hidden"),o.classList.remove("flex"))}function ie(e,t,a){d&&(E&&(E.value=e),k&&(k.value=t),B&&(B.value=a),b&&(b.value=""),d.classList.remove("hidden"),d.classList.add("flex"))}function I(){d&&(d.classList.add("hidden"),d.classList.remove("flex"))}u&&u.addEventListener("input",()=>{const e=u.value;l&&(e?l.classList.remove("hidden"):l.classList.add("hidden")),clearTimeout(D),D=setTimeout(()=>{L=e,n=1,r()},250)});l&&l.addEventListener("click",()=>{u&&(u.value=""),l.classList.add("hidden"),L="",n=1,r()});const Z=document.getElementById("reset-filter-btn");Z&&Z.addEventListener("click",()=>{u&&(u.value=""),l&&l.classList.add("hidden"),L="",n=1,r()});U&&U.addEventListener("change",()=>{const[e,t]=U.value.split(":");te=e,ae=t,n=1,r()});S&&S.addEventListener("change",()=>{ee=parseInt(S.value,10)||10,n=1,r()});y&&y.addEventListener("click",()=>{n>1&&(n--,r())});v&&v.addEventListener("click",()=>{n<A&&(n++,r())});P&&P.addEventListener("click",()=>{r()});G&&G.addEventListener("click",M);K&&K.addEventListener("click",M);o&&o.addEventListener("click",e=>{e.target===o&&M()});X&&X.addEventListener("click",I);Y&&Y.addEventListener("click",I);d&&d.addEventListener("click",e=>{e.target===d&&I()});Q&&Q.addEventListener("submit",async e=>{e.preventDefault();const t=E?E.value:"",a={username:k?k.value.trim():"",email:B?B.value.trim():""};b&&b.value.trim()&&(a.password=b.value.trim());try{const s=await fetch(`/api/admin/users/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!s.ok){const g=await s.json();throw new Error(g.error||"Failed to update user")}f("Updated","User profile updated successfully."),I(),r()}catch(s){f("Error",s.message,!0)}});se();
