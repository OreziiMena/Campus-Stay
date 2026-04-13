const counters = document.querySelectorAll('.counter');


const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Checking if the element has scrolled into the screen
        if (entry.isIntersecting) {
            const counter = entry.target;
        
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 300; 
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.5 
});

counters.forEach(counter => {
    observer.observe(counter);
});



const mobilebtn = document.querySelector('.mobilebtn');
const navLinks = document.querySelector('.navlinks');
const menuIcons = document.querySelector('.mobilebtn i');
const individualLinks = document.querySelectorAll('.navlinks ul li a'); 


mobilebtn.addEventListener('click', () => {
   
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        menuIcons.classList.remove('fa-bars');
        menuIcons.classList.add('fa-xmark');
    } else {
        menuIcons.classList.remove('fa-xmark');
        menuIcons.classList.add('fa-bars');
    }
});

individualLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active'); // Slides it back off-screen
        menuIcons.classList.remove('fa-xmark');
        menuIcons.classList.add('fa-bars');
    });
});