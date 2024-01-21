import{S as m,i as c}from"./assets/vendor-5b791d57.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const d="https://pixabay.com/api/",f="41901135-804299004675a38bc43612a92",o={form:document.querySelector(".js-form"),input:document.querySelector(".js-form-input"),btn:document.querySelector(".js-form-btn"),card:document.querySelector(".js-card-container"),loader:document.querySelector(".js-loader")},p=new m(".gallery a",{captionsData:"alt",captionDelay:250});h();o.form.addEventListener("submit",g);function g(n){n.preventDefault();const s=o.input.value.trim();if(s===""){c.warning({message:"Please enter a search query",position:"topRight"});return}const a=`${d}?key=${f}&q=${s}&image_type=photo&orientation=horizontal&safesearch=true`;fetch(a).then(r=>r.json()).then(r=>{r.hits.length||c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),o.card.innerHTML=y(r.hits),p.refresh()}).finally(()=>o.form.reset()),o.loader.classList.remove("loader")}function y(n){return n.map(s=>{const{webformatURL:a,largeImageURL:r,tags:e,likes:t,views:i,comments:l,downloads:u}=s;return`
  <li class="card-item">
    <div class="card-img js-card-img gallery">
      <a href="${r}" class="big-img js-big-img">
        <img
          src="${a}"
          alt="${e}"
          class="small-img js-small-img"
        />
      </a>
    </div>
    <div class="stats-container js-stats-container">
      <p class="stats">Likes: ${t}</p>
      <p class="stats">Views: ${i}</p>
      <p class="stats">Comments: ${l}</p>
      <p class="stats">Downloads: ${u}</p>
    </div>
  </li>
`}).join("")}function h(){o.card.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
