let main = document.querySelector('main');
let select = document.querySelector('select');
let options = document.querySelectorAll('.options');
let input = document.querySelector('input');
input.value = "";
let queryheader = document.querySelector('.query-header');
let mainheader = document.querySelector('.main-header');
let mode = document.querySelector('.mode');
let glass = document.querySelector('.fa-solid');


let url = "https://restcountries.com/v3.1/all";

mode.addEventListener('click',(e)=>{
    e.target.classList.toggle('darkmode');
    main.classList.toggle('darkmode');
    mainheader.classList.toggle('darkmode');
    queryheader.classList.toggle('darkmode');
    document.querySelector('body').classList.toggle('darkmode');
    input.classList.toggle('darkmode');
    let div = document.querySelectorAll('main > div');
    div.forEach((item)=>{
        item.classList.toggle('darkmode2');
    })
    
})

function grab(item){
    let div = document.createElement('div');
        let section1 = document.createElement('section');
        section1.setAttribute('class','section1');
        let countryflag = document.createElement('img');
        section1.appendChild(countryflag);
        countryflag.setAttribute('src',`${item.flags.png}`)
        let section2 = document.createElement('section');
        section2.setAttribute('class','section2');
        let countryName = document.createElement('h2');
        countryName.textContent = `${item.name.common}`;
        countryName.setAttribute('class','countryname');
        let population = document.createElement('p');
        population.setAttribute('class','population');
        population.textContent = `${item.population}`
        let region = document.createElement('p');
        region.setAttribute('class','region');
        region.textContent = `${item.region}`
        let capital = document.createElement('p');
        capital.setAttribute('class','capital');
        capital.textContent = `${item.capital}`
        section2.appendChild(countryName);
        section2.appendChild(population);
        section2.appendChild(region);
        section2.appendChild(capital);
        div.appendChild(section1);
        div.appendChild(section2);
        main.appendChild(div);
}

fetch(url)
.then(response=>response.json())
.then(result=>{

    result.map(item=>{
        grab(item);
    })

})

    select.addEventListener('change',(e)=>{
        while(main.childElementCount!=0){
            main.lastElementChild.remove();
        }
        url = `https://restcountries.com/v3.1/region/${select.value}`;
        fetch(url).then(response=>response.json())
        .then(result=>{
            result.map(item=>{
                grab(item);
            })
        })
    })

    input.addEventListener('change',()=>{
        url = `https://restcountries.com/v3.1/name/${input.value}?fullText=true`;
        queryheader.classList.toggle('hidden');
        main.classList.toggle('countryresult');
        fetch(url).then(response=>response.json())
        .then(result=>{
            while(main.childElementCount!=0) {
                main.lastElementChild.remove();
            }
            let back = document.createElement('button');
            back.textContent = "Back";
            back.setAttribute('class','back');
            if(mode.classList.contains('darkmode')) {
                back.classList.add('darkmode2');
            }else {
                back.classList.remove('darkmode2');
            }

            back.addEventListener('click',()=>{
                location.reload();
            })
            
            main.appendChild(back);
            let div1 = document.createElement('div');
            let div2 = document.createElement('div');
            div1.setAttribute('class','countrydiv1');
            div2.setAttribute('class','countrydiv2');
            mode.addEventListener('click',()=>{
                back.classList.toggle('darkmode');
                div2.classList.toggle('darkmode');
            })
            let flag = document.createElement('img');
            div1.appendChild(flag);
            flag.setAttribute('src',`${result[0].flags.png}`)
            flag.setAttribute('class','countryflag');
            let heading = document.createElement('h2');
            heading.textContent = `${result[0].name.common}`;
            
            let section1 = document.createElement('section');
            let section2 = document.createElement('section');
            let section3 = document.createElement('section');
            section1.setAttribute('class','resultsection1');
            section2.setAttribute('class','resultsection2');
            section3.setAttribute('class','bordercountries');
            let para1 = document.createElement('p');
            if(typeof result[0].name.nativeName==="object") {
                let key = Object.keys(result[0].name.nativeName);
                if(key.length>0){
                para1.textContent = `${result[0].name.nativeName[key[0]].official}`;
                }else {
                    para1.textContent = `${result[0].name.nativeName.official}`;
                }
            }
            section1.appendChild(heading);
            para1.setAttribute('class','resultingname')
            section1.appendChild(para1);
            let para2 = document.createElement('p');
            para2.textContent = `${result[0].population}`;
            para2.setAttribute('class','resultingpopulation');
            section1.appendChild(para2);
            let para3 = document.createElement('p');
            para3.textContent = `${result[0].region}`;
            para3.setAttribute('class','resultingregion');
            section1.appendChild(para3);
            let para4 = document.createElement('p');
            para4.textContent = `${result[0].subregion}`;
            para4.setAttribute('class','resultingsubregion');
            section1.appendChild(para4);
            let para5 = document.createElement('p');
            para5.textContent = `${result[0].capital[0]}`;
            para5.setAttribute('class','resultingcapital');
            section1.appendChild(para5);
            let para6 = document.createElement('p');
            para6.textContent = `${result[0].tld}`;
            para6.setAttribute('class','resultingtld');
            section2.appendChild(para6);
            let para7 = document.createElement('p');
            let currencykeys = Object.keys(result[0].currencies);
            if(currencykeys.length>0){
                para7.textContent = `${result[0].currencies[currencykeys[0]].name}`;
            }else {
                para7.textContent = result[0].currencies.name;
            }
            para7.setAttribute('class','resultingcurrencies');
            section2.appendChild(para7);
            let para8 = document.createElement('p');
            let langkeys = Object.keys(result[0].languages);
            if(langkeys.length>0){
                para8.textContent = `${result[0].languages[langkeys[0]]}`;
            }else {
                para8.textContent = `${result[0].languages.eng}`;
            }
            para8.setAttribute('class','resultinglanguage');
            section2.appendChild(para8);
            div2.appendChild(section1);
            div2.appendChild(section2);
            div2.appendChild(section3);
            let borderheading = document.createElement('h3');
            borderheading.textContent = `Borders: `;
            section3.appendChild(borderheading);
            let borders = result[0].borders;
            borders.map(item=>{
                fetch(`https://restcountries.com/v3.1/alpha/${item}`).then(response=>response.json())
                .then(result=>{
                    let button= document.createElement('button');
                button.setAttribute('class',`border${borders.indexOf(item)+1}`);
                button.textContent = result[0].name.common;
                section3.appendChild(button);
                })
            })
            main.appendChild(div1);
            main.appendChild(div2);
            console.log(result);
        })
    })