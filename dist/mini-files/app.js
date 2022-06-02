let tvlist={"Телевизор ТВ-1":[["Модель","ТВ-1"],["Диагональ","32 дюйма"],["Цена","23000 рублей"],["data-sort","1"],["data-rating","20"]],"Телевизор ТВ-3":[["Модель","ТВ-3"],["Диагональ","50 дюйм"],["Цена","29000 рублей"],["data-sort","3"],["data-rating","25"]],"Телевизор ТВ-2":[["Модель","ТВ-2"],["Диагональ","55 дюймов"],["Цена","34000 рублей"],["data-sort","2"],["data-rating","15"]],"Телевизор ТВ-5":[["Модель","ТВ-5"],["Диагональ","22 дюйма"],["Цена","15000 рублей"],["data-sort","5"],["data-rating","32"]],"Телевизор ТВ-4":[["Модель","ТВ-4"],["Диагональ","21 дюйм"],["Цена","14000 рублей"],["data-sort","4"],["data-rating","27"]],"Телевизор ТВ-8":[["Модель","ТВ-8"],["Диагональ","23 дюйма"],["Цена","14900 рублей"],["data-sort","8"],["data-rating","31"]],"Телевизор ТВ-6":[["Модель","ТВ-6"],["Диагональ","19 дюймов"],["Цена","10000 рублей"],["data-sort","6"],["data-rating","45"]],"Телевизор ТВ-7":[["Модель","ТВ-7"],["Диагональ","50 дюймоd"],["Цена","27000 рублей"],["data-sort","7"],["data-rating","11"]],"Телевизор ТВ-9":[["Модель","ТВ-9"],["Диагональ","20 дюймоd"],["Цена","12000 рублей"],["data-sort","9"],["data-rating","53"]],"Телевизор ТВ-10":[["Модель","ТВ-10"],["Диагональ","35 дюймоа"],["Цена","23000 рублей"],["data-sort","10"],["data-rating","23"]]},keys=Object.keys(tvlist),products=document.querySelector(".products__text"),pagination=document.querySelector(".pagination"),sorting=document.querySelector(".sorting"),notesOnPage=3;function createPaginationEl(){for(let t=1;t<=Math.ceil(keys.length/notesOnPage);t++){let e=document.createElement("li");e.className="pagination__element",e.innerHTML=t,pagination.appendChild(e)}document.querySelectorAll(".pagination__element")[0].classList.add("pagination__element-active")}function startPage(t){products.innerHTML="",newPage(keys.slice(0,t).reduce(((t,e)=>(t[e]=tvlist[e],t)),{}))}function createProducts(t){let e=(+t.target.innerHTML-1)*notesOnPage,a=e+notesOnPage;newPage(keys.slice(e,a).reduce(((t,e)=>(t[e]=tvlist[e],t)),{}))}function newPage(t){for(let e in t){let a=document.createElement("div");a.innerHTML=`<p class="products-text__header">${e}</p>`,a.className="products-text__element",a.setAttribute("data-sort",t[e][3][1]),a.setAttribute("data-rating",t[e][4][1]);let n=t[e][2][1].split(" ").filter((t=>"рублей"!==t)).join(" ");a.setAttribute("data-price",n),products.appendChild(a);for(let n=0;n<3;n++){let r=document.createElement("p");r.innerHTML=`<p>${t[e][n][0]}: ${t[e][n][1]}</p>`,a.appendChild(r)}}}function sortAscending(){Array.from(products.children).sort(((t,e)=>t.getAttribute("data-price")-e.getAttribute("data-price"))).forEach((t=>products.appendChild(t)))}function sortDescending(){Array.from(products.children).sort(((t,e)=>e.getAttribute("data-price")-t.getAttribute("data-price"))).forEach((t=>products.appendChild(t)))}function sortName(){Array.from(products.children).sort(((t,e)=>t.getAttribute("data-sort")-e.getAttribute("data-sort"))).forEach((t=>products.appendChild(t)))}function sortRating(){[...document.querySelectorAll("div[data-rating")].sort(((t,e)=>e.dataset.rating-t.dataset.rating)).forEach((t=>t.closest(".products__text").append(t)))}createPaginationEl(),sorting.addEventListener("click",(t=>{t.target.classList.contains("sorting__element")&&(document.querySelectorAll(".sorting__element").forEach((t=>t.classList.remove("sorting__element-active"))),t.target.classList.add("sorting__element-active"),notesOnPage=+t.target.textContent,pagination.innerHTML="",createPaginationEl(),startPage(notesOnPage))})),pagination.addEventListener("click",(function(t){t.target.classList.contains("pagination__element")&&(document.querySelectorAll(".pagination__element").forEach((t=>t.classList.remove("pagination__element-active"))),products.innerHTML="",t.target.classList.add("pagination__element-active"),createProducts(t))})),startPage(notesOnPage),document.getElementById("ascending").addEventListener("click",sortAscending),document.getElementById("descending").addEventListener("click",sortDescending),document.getElementById("rating").addEventListener("click",sortRating),document.getElementById("name").addEventListener("click",sortName);