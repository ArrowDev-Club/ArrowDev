(function(){
    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry =>{
            if (entry.isIntersecting){

                entry.target.classList.add("visible");
                entry.target.classList.remove("hidden");
                if (entry.target.classList.value.split(" ").includes("warper")){
                    let DisplayVal = document.querySelectorAll(".Num");
                    let inteval = 2000;
                    

                    DisplayVal.forEach((DisplayVal) => {
                    let startVal = 0;
                    let endVal = parseInt(DisplayVal.getAttribute("data-val"));
                    let duration = Math.floor(inteval / endVal);
                    let counter = setInterval(function () {
                        startVal += 1;
                        DisplayVal.textContent = startVal+"+";
                        if (startVal == endVal) {
                        clearInterval(counter);
                        }
                    }, duration);
                    });
                }
                observer.unobserve(entry.target);
            }
            

        },{threshold:0.8})
    });
    let eles = document.getElementsByClassName("hidden");
    for (let f of eles){
        observer.observe(f);
    }
    document.getElementById("hod").onclick=function(){
        window.open("https://www.linkedin.com/in/chitra-pasupathi/");
    }
    document.getElementById("rajavel").onclick=function(){
        window.open("https://www.linkedin.com/in/rajavel-m-b47a97209/");
    }
    document.getElementById("dhiyanesh").onclick=function(){
        window.open("https://www.linkedin.com/in/dr-dhiyanesh-balasubramaniyan-85098937/");
    }
    let captions=document.getElementsByClassName("captions");
    function type(i,ele,char,timer){
        setTimeout(()=>{
            ele.innerHTML+=char;
        },timer);
    }
    function delay(i,ele){
        setTimeout(()=>{
            try{
                ele.setAttribute("class","captions");
                let name=ele.innerHTML;
                ele.innerHTML=name[0];
                let random=[];
                for (let i =0;i<name.length;i++){
                    random.push(Math.floor(Math.random(100,1000)*2500))
                }
                random.sort(function(a, b){return a-b});

                for (let k in name){
                    if (k!=0)
                    type(k,ele,name[k],random[k]);
                }
                
            }
            catch(err){}
        },500*i);
    }
    setTimeout(()=>{
        let donothing=true;
        let caps=document.querySelectorAll(".captions_hidden")
        for (let i in caps){
            delay(i,caps[i]);
        }

    },5000);
    
    function closeinfo(){
        let infodiv=document.getElementsByClassName("infocont_visible")[0];
        infodiv.classList.add("infocont");
        let div=document.getElementsByClassName("card_abnormal")[0]
        div.classList.add("card_normal")
        div.classList.remove("card_abnormal")
        document.getElementsByClassName("cards_warper")[0].classList.remove("cards_warper_open")
        for (let cards of document.querySelectorAll(".card-init_shrunk")){
            cards.classList.add("card-init")
            cards.classList.remove("card-init_shrunk");
        }
    }
    




    document.getElementById("al_engine").onclick=function showContent_1() {
        try{
            document.getElementsByClassName("infocont_visible")[0].classList.remove("infocont");
        }catch(err){}
    
        try{
            let div=document.getElementsByClassName("card_normal")[0]
            div.classList.add("card_abnormal")
            div.classList.remove("card_normal")
        }catch(err){}
        try{
            let info=document.getElementsByClassName("infocont")[0];
            info.classList.add("infocont_visible")
            info.classList.remove("infocont")
        }catch(err){}
        try{
            document.getElementsByClassName("cards_warper")[0].classList.add("cards_warper_open")
            for (let cards of document.querySelectorAll(".card-init")){
                cards.classList.remove("card-init")
                cards.classList.add("card-init_shrunk")
            }
        }catch(err){}
        let infodiv=document.getElementsByClassName("infocont_visible")[0];
        infodiv.innerHTML=`
            <div class="bg_img_al"></div>
            <button class="close_info"><span class='fa fa-solid fa-xmark'></span></button>
            <center><h2>Altruistic Engine</h2></center>
            <br>
            <center><p>
                The Altruistic Engine is like "tech for good," a philanthropic-driven approach to development that leverages technology and innovation to address societal challenges. Just as tech for good uses digital solutions to tackle issues like inequality, healthcare access, or environmental sustainability, the Altruistic Engine fuels these efforts with a core of compassion and selflessness. It combines the precision and scalability of technology with the ethical drive of philanthropy, aiming to create sustainable, positive change. This framework seeks to ensure that technological advancements benefit all, particularly underserved communities, through socially conscious and purpose-driven initiatives.
            </p></center>
        `
        document.getElementsByClassName("close_info")[0].onclick=function(){
            closeinfo();
        }
    }

    document.getElementById("demodays").onclick=function showContent_2() {
        try{
            document.getElementsByClassName("infocont_visible")[0].classList.add("infocont");
        }catch(err){}
    
        try{
            let div=document.getElementsByClassName("card_normal")[0]
            div.classList.add("card_abnormal")
            div.classList.remove("card_normal")
        }catch(err){}
        try{
            let info=document.getElementsByClassName("infocont")[0];
            info.classList.add("infocont_visible")
            info.classList.remove("infocont")
        }catch(err){}
        try{
            document.getElementsByClassName("cards_warper")[0].classList.add("cards_warper_open")
            for (let cards of document.querySelectorAll(".card-init")){
                cards.classList.remove("card-init")
                cards.classList.add("card-init_shrunk")
            }
        }catch(err){}
        let infodiv=document.getElementsByClassName("infocont_visible")[0];
        infodiv.innerHTML=`
            <button class="close_info"><span class='fa fa-solid fa-xmark'></span></button>
            <center><h2>Demo Days</h2></center>
            <br>
            <center><p>
                At ArrowDev Club, we believe every idea holds the power to shape the future. That’s why we’re thrilled to present Demo Days - a unique platform where your innovative concepts can flourish. Share your vision with our expert panel, receive valuable feedback, and connect with skilled professionals ready to help bring your ideas to life.
                From mentorship to potential funding opportunities through our college network, Demo Days is your gateway to turning concepts into reality. Whether you're an experienced developer or just starting your journey, this is the perfect opportunity to refine your ideas, learn from peers, and make a lasting impact.
            </p></center>
        `
        document.getElementsByClassName("close_info")[0].onclick=function(){
            closeinfo();
        }
    }

    document.getElementById("gen_engine").onclick=function showContent_3() {
        try{
            document.getElementsByClassName("infocont_visible")[0].classList.add("infocont");
        }catch(err){}
    
        try{
            let div=document.getElementsByClassName("card_normal")[0]
            div.classList.add("card_abnormal")
            div.classList.remove("card_normal")
        }catch(err){}
        try{
            let info=document.getElementsByClassName("infocont")[0];
            info.classList.add("infocont_visible")
            info.classList.remove("infocont")
        }catch(err){}
        try{
            document.getElementsByClassName("cards_warper")[0].classList.add("cards_warper_open")
            for (let cards of document.querySelectorAll(".card-init")){
                cards.classList.remove("card-init")
                cards.classList.add("card-init_shrunk")
            }
        }catch(err){}
        let infodiv=document.getElementsByClassName("infocont_visible")[0];
        infodiv.innerHTML=`
            <button class="close_info"><span class='fa fa-solid fa-xmark'></span></button>
            <center><h2>Generator Engine</h2></center>
            <br>
            <center><p>
                Our generator engines play a pivotal role in advancing the United Nations Sustainable Development Goals (SDGs), particularly in promoting clean and affordable energy. Engineered for efficiency and reliability, they offer innovative power solutions that support sustainable infrastructure, reduce environmental impact, and enhance energy access in remote and underserved areas. By minimizing emissions and maximizing fuel efficiency, our engines contribute to global efforts in combating climate change and fostering resilient communities. Whether for industrial, commercial, or residential applications, our generator engines are a crucial element in driving progress towards a more sustainable and equitable energy future.
            </p></center>
        `
        document.getElementsByClassName("close_info")[0].onclick=function(){
            closeinfo();
        }
    }
    

    
    let bodbg=document.getElementsByClassName("img_cont_bg")
    let bodimages=document.getElementsByClassName("img_cont");
    for (let y in bodimages){
        bodimages[y].onclick=function(){
            window.open(bodimages[y].id);

        }
        bodimages[y].onmouseover=function(){
            bodbg[y].classList.remove("img_cont_bg_movedown");
            bodbg[y].classList.add("img_cont_bg_move");
            bodbg[y].classList.remove("blindimg");


            
        }
        bodimages[y].onmouseout=function(){
            bodbg[y].classList.remove("img_cont_bg_move");
            bodbg[y].classList.add("img_cont_bg_movedown");
            //bodbg[y].classList.add("blindimg");
            //bodbg[y].classList.remove("img_cont_bg_movedown");


        }
    }
    
    

})();



/* Navonmesa Popup */

document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('navonmesa-popup');
    const closeButton = document.querySelector('.close-button');
    setTimeout(() => {
      popup.classList.remove('hidden');
      popup.classList.add('show-popup');
    }, 3000);
    closeButton.addEventListener('click', () => {
      popup.classList.add('hidden');
    });
  });
