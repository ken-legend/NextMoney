const testimonials = document.querySelectorAll('.testimonial');
let index = 0;

function showNextTestimonial() {
    testimonials[index].classList.remove('active');
    index = (index + 1) % testimonials.length;
    testimonials[index].classList.add('active');
}

// Chanje testimonial chak 4 segonn
setInterval(showNextTestimonial, 4000);

