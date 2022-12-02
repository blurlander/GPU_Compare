const itemlist = document.querySelectorAll(".list-item");
const compares = document.querySelectorAll(".compare-col");
var search2 = document.querySelector("#search2");
const comparebtn = document.querySelector("#compare");
const list = document.querySelector(".gpu-list");
const alertbody = document.querySelector("#alert-body");
var checkNumber = 0;


//alert gösterir
function showAlert(type,message){
    if (alertbody.firstElementChild === null){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;//bootstrap 5 alert class
    alert.setAttribute("style","position: fixed !important;")
    alert.textContent = message;
    alertbody.appendChild(alert);

    setTimeout(function (){
        alert.remove();
    },1500)
}
}

function noResult(){
    if (list.lastElementChild.firstElementChild.textContent === "No Result"){
        list.removeChild(list.lastElementChild);
    }
    let count = 0;
    for (i = 0; i<itemlist.length ; i++){
        if (itemlist[i].className.includes("hidden")){
            count++;
        }
    }
    console.log(count);
    if (itemlist.length == count){
    const alertlist = document.createElement("li");
    const alert1 = document.createElement("div");
    alertlist.setAttribute("style","padding-bottom: 2rem;");
    alert1.className = "alert alert-warning";//bootstrap 5 alert class
    alert1.textContent = "No Result";
    alert1.setAttribute("style","font-size: 1.5rem;");
    alert1.setAttribute("style","width: 70%;");
    alertlist.appendChild(alert1);
    list.appendChild(alertlist);


    }
}


function removeSpaces(val) {
    return val.split(' ').join('');
 }



list.addEventListener("click",checkFunc);
comparebtn.addEventListener("click",comparePage);


function comparePage(){
    if(parseInt(comparebtn.firstElementChild.textContent) < 2 ){//seçilen ürün sayısı 2 değilse hiçbirşey yapma
        showAlert("danger","You must select at least 2 GPU for comparison !");
    }
    else {
        //ürün listesinden seçili ürünlerin ismini local storage üstüne yazar
        itemlist.forEach(function(item){
            if (item.getElementsByTagName("button")[0].textContent.includes("Checked")){
            let name = item.getElementsByTagName("p")[1].textContent.toLowerCase();
            name = removeSpaces(name);
            addUrlStorage(name);
            }

        }
    )
    
    window.location.href = "compare.html";
}
}

function getUrlsFroomStorage(){//url leri local stroge dan alma işlemi
    let urls;
    if (localStorage.getItem("urls") === null){
        urls = [];
    }
    else {
        urls = JSON.parse(localStorage.getItem("urls"));
    }
    return urls;

}
function addUrlStorage(url){//ürün isimlerini local strorage a yazar
    let urls = getUrlsFroomStorage();
    urls.push(url);
    localStorage.setItem("urls",JSON.stringify(urls));
   
}

    


function checkFunc(e){
    if (e.target.tagName === "BUTTON"){
        
    if(e.target.textContent.includes("Checked")){
        e.target.removeChild(e.target.lastElementChild);
        e.target.className = "btn btn-secondary align-self-center ms-auto compare-check";//tekrar gri renk yapma 
        e.target.textContent = "compare";//tik işaretini kaldırma 
        checkNumber = checkNumber - 1;
        comparebtn.firstElementChild.textContent = checkNumber;//seçilen ürün sayısını güncelle


    }
    else {  //min 2 ürün seçilebilir
            //tik ikonu ekleme
            let checkicon = document.createElement("i");//<i class="far fa-check-square"></i> 
            checkicon.className = "far fa-check-square";
            e.target.className = "btn btn-success align-self-center ms-auto compare-check";
            e.target.textContent = "Checked ";
            e.target.appendChild(checkicon);

            checkNumber = checkNumber + 1;
            comparebtn.firstElementChild.textContent = checkNumber;//seçilen ürün sayısını güncelle
    }

}
}



//search fonksiyonu
function searchFunc2(){
    document.getElementById("brand").value = "all";
    document.getElementById("category").value = "all";
    let searchtxt = search2.firstElementChild.value.toLowerCase();
    searchtxt = removeSpaces(searchtxt);
    itemlist.forEach(function(item){
        let name1 = item.getElementsByTagName("p")[0].textContent.toLowerCase();
        let name2 = item.getElementsByTagName("p")[1].textContent.toLowerCase();
        name1 = removeSpaces(name1);
        name2 = removeSpaces(name2);
        let name = name1.concat(name2);
        if (name.includes(searchtxt)){
            item.className = "list-item d-flex";//aramayla uyuşuyorsa ürünü göster
        }
        else {
            item.className = "list-item hidden";//aramayla uyuşmuyorsa ürünü gizle
        }}
    )


     //aranan kelime filtresini ekranda gösterme ----------------------------------
    if(search2.lastElementChild.tagName === "SPAN"){
        search2.removeChild(search2.lastElementChild);
    }    //<span class="badge bg-warning text-dark">Warning</span>

    let badge = document.createElement("span");
    let icon = document.createElement("i");
    let closebtn = document.createElement("button"); //filteyi kapatma butonu
   
    closebtn.className = "close-btn";    //  .close-btn { border-style: none; margin: 0; padding: 0; background-color: #FFC107;}
   
    closebtn.setAttribute("onclick", "closeSearchFilter()");  //filteyi kapatma butonu için fonksiyon
    
    icon.className = "fas fa-times close-icon"; //filteyi kapatma butonu için icon
    icon.setAttribute("style", "margin: 0.5rem;");
    closebtn.appendChild(icon);
    badge.className = "badge bg-warning text-dark";
    badge.appendChild(document.createTextNode(searchtxt));
    badge.appendChild(closebtn);
    
    

    search2.appendChild(badge);
    search2.firstElementChild.value = "";
    noResult();
    



}

//filteyi kapatma butonu için fonksiyon
function closeSearchFilter(){
    if (search2.lastElementChild.className.includes("badge")){
    search2.removeChild(search2.lastElementChild);//filteyi ekrandan kaldırır
    

    //tüm ürünleri listele
    itemlist.forEach(function(item){
        
        item.className = "list-item d-flex";
        }
    )
    noResult();
}

}



//filtreleme fonksiyonu (brand ve category için)
function itemFilter(){
    if (search2.lastElementChild.className.includes("badge")){
        search2.removeChild(search2.lastElementChild);//filteyi ekrandan kaldırır
    }
    
    let brand = document.getElementById("brand").value;
    let cat = document.getElementById("category").value;
    
    let hideByBrand = true; //brand e göre gizle
    let hideByCat = true; //category e göre gizle

    
    itemlist.forEach(function(item){
        if (item.firstElementChild.className === brand){
            hideByBrand = false;     
        }


        //skor a göre kategori belirleme-----------------------------------------------------
        let score = parseInt(item.lastElementChild.getAttribute("title"));//score u int e çevirir
        let title = "Low";
        if (score > 74){
            title = "Mid";
        }
        if (score > 84){
            title = "High";
        }
        //-----------------------------------------------------
        if (title === cat){
            hideByCat = false;
        }

        if (brand === "all"){
            hideByBrand = false;
            if (hideByCat === false) {
                item.className = "list-item d-flex";
            }
            else {
                item.className = "list-item hidden";
            }
        }
        if (cat === "all"){
            hideByCat = false;
            if (hideByBrand === false) {
                item.className = "list-item d-flex";
            }
            else {
                item.className = "list-item hidden";
            }
        }
        if (brand !== "all" && cat !== "all"){
            if(hideByCat || hideByBrand === true){
                item.className = "list-item hidden";
            }
            else {
                item.className = "list-item d-flex";
            }
        }

        hideByBrand = true;
        hideByCat = true;

    })
    
    




}

//tüm ürünlerin skorlarını alan fonksiyon
function getScores(){
    let scores = [];
    itemlist.forEach(function(item){
        let score = item.lastElementChild.getAttribute("title");
        scores.push(score);
    })
    return scores;
}



function orderByScore(){
    let order = document.getElementById("order").value;//sıralama türünü belirleme
    let scoreList = getScores();//tüm skorların listesi
   
    //sıralamanın belirlenmesi
    if (order !== "all"){
        scoreList.sort();
    }
    if (order === "first"){
        scoreList.reverse();
    }


    
    for (let i = 0; i < scoreList.length; i++){
        itemlist.forEach(function(item){
            if(item.lastElementChild.getAttribute("title") === scoreList[i]){
                item.parentNode.insertBefore(item,item.parentNode.querySelectorAll[i]);
                return;
            }
        })
    }
}