import"./hoisted.CpP1qF00.js";const l=document.querySelectorAll(".config-tab-btn"),p=document.querySelectorAll(".config-panel");l.forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-tab");l.forEach(t=>{t.classList.remove("border-[#2271b1]","text-[#2271b1]","font-bold"),t.classList.add("border-transparent","text-slate-500","font-medium")}),e.classList.remove("border-transparent","text-slate-500","font-medium"),e.classList.add("border-[#2271b1]","text-[#2271b1]","font-bold"),p.forEach(t=>{t.classList.toggle("hidden",t.id!==`tab-${o}`)})})});function i(e,o){navigator.clipboard.writeText(e).then(()=>{window.showToast&&window.showToast("Copied to Clipboard",o)})}document.getElementById("btnCopyEndpoint")?.addEventListener("click",()=>{const e=document.getElementById("mcpEndpointInput");e&&i(e.value,"MCP Endpoint URL copied.")});document.getElementById("btnCopyKey")?.addEventListener("click",()=>{const e=document.getElementById("mcpKeyInput");e&&i(e.value,"Secret MCP Key copied to clipboard.")});document.querySelectorAll(".copy-code-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-target"),t=o?document.getElementById(o):null;t&&i(t.innerText,"Configuration snippet copied.")})});const s=document.getElementById("mcpKeyInput"),d=document.getElementById("maskIcon");document.getElementById("btnToggleKeyMask")?.addEventListener("click",()=>{!s||!d||(s.type==="password"?(s.type="text",d.className="fa-solid fa-eye-slash"):(s.type="password",d.className="fa-solid fa-eye"))});const r=document.getElementById("mcpToggle"),c=document.getElementById("statusBadge"),m=document.getElementById("mcpToggleLabel");r?.addEventListener("change",async()=>{const e=r.checked;try{if((await fetch("/api/admin/site-settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({mcpEnabled:e})})).ok)c&&(c.textContent=e?"● Active":"○ Disabled",c.className=e?"text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400":"text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400"),m&&(m.textContent=e?"Requests Allowed":"Requests Blocked"),window.showToast&&window.showToast(e?"MCP Server Enabled":"MCP Server Disabled",e?"AI Agents may now connect with secret key.":"Incoming AI agent requests are now blocked.");else throw new Error}catch{r.checked=!e,window.showToast&&window.showToast("Error","Failed to update MCP status.",!0)}});document.getElementById("btnRegenerateKey")?.addEventListener("click",async()=>{if(confirm(`Are you sure you want to regenerate the Secret MCP Key?

Existing AI clients (Claude Desktop, Cursor) using the previous key will immediately lose access until updated.`))try{const o=await fetch("/api/admin/site-settings/mcp/regenerate",{method:"POST"});if(o.ok){const t=await o.json();s&&(s.value=t.key),window.showToast&&window.showToast("Key Regenerated","New secret MCP key generated and saved.")}else throw new Error}catch{window.showToast&&window.showToast("Error","Failed to regenerate key.",!0)}});document.getElementById("btnRefreshLogs")?.addEventListener("click",async()=>{try{const e=await fetch("/api/admin/site-settings/mcp/logs?limit=25");if(e.ok){const t=(await e.json()).data||[],a=document.getElementById("logsTableBody");if(!a)return;if(t.length===0){a.innerHTML='<tr><td colspan="6" class="py-8 text-center text-slate-400 font-sans">No MCP tool invocations recorded yet. Connect an agent to begin!</td></tr>';return}a.innerHTML=t.map(n=>`
            <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
              <td class="py-2.5 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                ${new Date(n.created_at).toLocaleString()}
              </td>
              <td class="py-2.5 px-3 font-bold text-indigo-600 dark:text-indigo-400">
                ${n.tool_name}
              </td>
              <td class="py-2.5 px-3 text-slate-500 dark:text-slate-400">
                ${n.client_ip}
              </td>
              <td class="py-2.5 px-3">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${n.status==="success"?"bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400":"bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"}">
                  ${n.status}
                </span>
              </td>
              <td class="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-sans max-w-md truncate" title="${n.summary||""}">
                ${n.summary||"—"}
              </td>
              <td class="py-2.5 px-3 text-right text-slate-400">
                ${n.duration_ms}ms
              </td>
            </tr>
          `).join(""),window.showToast&&window.showToast("Logs Refreshed","Loaded recent audit log entries.")}}catch{window.showToast&&window.showToast("Error","Failed to refresh logs.",!0)}});
