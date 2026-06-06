/* =====================================
   MOBILE NAVIGATION
===================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector("nav");

if(menuToggle){

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

    });

}

/* =====================================
   STICKY HEADER EFFECT
===================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

/* =====================================
   SMOOTH SCROLLING
===================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

        }

    });

});

/* =====================================
   CONTACT FORM
===================================== */

const form = document.getElementById("contactForm");

if(form){

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const name =
        this.querySelector('input[type="text"]').value.trim();

        const phone =
        this.querySelector('input[type="tel"]').value.trim();

        if(name.length < 2){

            alert("Please enter your name.");

            return;

        }

        if(phone.length < 5){

            alert("Please enter a valid phone number.");

            return;

        }

        alert(
            "Thank you! We have received your enquiry and will contact you shortly."
        );

        form.reset();

    });

}

/* =====================================
   SCROLL REVEAL
===================================== */

const revealItems = document.querySelectorAll(
    ".food-card, .offer-card, .review-card, .menu-category"
);

const revealObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},

{
threshold:0.15
}

);

revealItems.forEach(item=>{

item.classList.add("hidden");

revealObserver.observe(item);

});

/* =====================================
   ACTIVE NAVIGATION
===================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", ()=>{

let current = "";

sections.forEach(section=>{

const sectionTop = section.offsetTop - 150;

if(window.scrollY >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(
link.getAttribute("href") === "#" + current
){

link.classList.add("active");

}

});

});

/* =====================================
   GALLERY LIGHTBOX
===================================== */

const galleryImages =
document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(img=>{

img.addEventListener("click", ()=>{

const overlay =
document.createElement("div");

overlay.className = "lightbox";

overlay.innerHTML = `
<img src="${img.src}" alt="">
`;

document.body.appendChild(overlay);

overlay.addEventListener("click", ()=>{

overlay.remove();

});

});

});

/* =====================================
   BACK TO TOP BUTTON
===================================== */

const topButton =
document.createElement("button");

topButton.innerHTML = "↑";

topButton.className = "back-to-top";

document.body.appendChild(topButton);

window.addEventListener("scroll", ()=>{

if(window.scrollY > 600){

topButton.classList.add("show");

}else{

topButton.classList.remove("show");

}

});

topButton.addEventListener("click", ()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});