document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation (เหมือนการเดินทางบนแผนที่ฟาร์ม)
    document.querySelectorAll('.farm-path a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // ป้องกันการกระโดดของลิงก์

            const targetId = this.getAttribute('href'); // #about, #experience, etc.
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth' // เลื่อนหน้าจออย่างนุ่มนวล
                });
            }
        });
    });

    // 2. Animate plots on scroll (เหมือนแปลงผักค่อยๆ งอกงามเมื่อเลื่อนดู)
    const observerOptions = {
        root: null, // ใช้ viewport เป็นหลัก
        rootMargin: '0px',
        threshold: 0.1 // เมื่อส่วนนั้นมองเห็น 10%
    };

    const plotObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ถ้าแปลงมองเห็นแล้ว ให้เพิ่มคลาส 'is-growing' เพื่อเริ่ม animation
                entry.target.classList.add('is-growing');
                // เลิกติดตามแปลงนี้ เพื่อไม่ให้ animation เล่นซ้ำ
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // ติดตามทุก section ที่เป็น 'plot'
    document.querySelectorAll('.plot').forEach(plot => {
        plotObserver.observe(plot);
    });

    // Animate Header (Farm Banner) on load
    const farmBanner = document.querySelector('.farm-banner');
    if (farmBanner) {
        farmBanner.classList.add('is-loaded');
    }

    // 3. Image Hover Effect for Farm Produce (ผลผลิตดูสดใหม่)
    document.querySelectorAll('.farm-produce').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.08)'; // ขยายรูปเล็กน้อย
                img.style.transition = 'transform 0.3s ease-out';
            }
        });

        item.addEventListener('mouseleave', () => {
            const img = item.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)'; // กลับสู่ขนาดปกติ
            }
        });
    });

    // 4. Highlight current active navigation link (เหมือนเข็มทิศชี้บอกตำแหน่ง)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.farm-path a');

    const highlightNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // ตรวจสอบว่าส่วนไหนอยู่กลางหน้าจอ
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-path'); // ลบคลาส active เดิมออก
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active-path'); // เพิ่มคลาส active ให้ลิงก์ปัจจุบัน
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // เรียกใช้ครั้งแรกเมื่อโหลดหน้า
});