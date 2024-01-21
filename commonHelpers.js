import{S as m,i as c}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const d="https://pixabay.com/api/",f="41901135-804299004675a38bc43612a92",o={form:document.querySelector(".js-form"),input:document.querySelector(".js-form-input"),btn:document.querySelector(".js-form-btn"),card:document.querySelector(".js-card-container"),loader:document.querySelector(".loader")};o.loader.style.display="none";const p=new m(".gallery a",{captionsData:"alt",captionDelay:250});b();o.form.addEventListener("submit",g);function y(a){const s=`${d}?key=${f}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true`;return fetch(s).then(t=>{if(!t.ok)throw new Error(t.status);return t.json()}).then(t=>(t.hits.length||c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),t.hits))}function g(a){a.preventDefault(),o.loader.style.display="block";const s=o.input.value.trim();if(s===""){c.warning({message:"Please enter a search query"});return}y(s).then(t=>{o.card.innerHTML=h(t),p.refresh()}).catch(t=>console.log(t)).finally(()=>{o.loader.style.display="none",o.form.reset()})}function h(a){return a.map(s=>{const{webformatURL:t,largeImageURL:i,tags:e,likes:r,views:n,comments:l,downloads:u}=s;return`
  <li class="card-item">
    <div class="card-img js-card-img gallery">
      <a href="${i}" class="big-img js-big-img">
        <img
          src="${t}"
          alt="${e}"
          class="small-img js-small-img"
          width="360px"
          height="240px"
        />
      </a>
    </div>
    <div class="stats-container js-stats-container">
      <p class="stats"><b>Likes:</b> ${r}</p>
      <p class="stats"><b>Views:</b> ${n}</p>
      <p class="stats"><b>Comments:</b> ${l}</p>
      <p class="stats"><b>Downloads:</b> ${u}</p>
    </div>
  </li>
`}).join("")}function b(){o.card.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
