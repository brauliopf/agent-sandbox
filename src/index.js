// index.js
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.getElementsByClassName('close')[0];

    // Project details
    const projectDetails = {
        providence: {
            title: "Providence - Senior Product Analyst",
            description: "• Measured impact of proprietary clinical decision-making tool on provider efficiency through experimentation, with hypothesis tests and lookback analysis of provider notes and EPIC metrics.\n• Defined metrics and built a dashboard to showcase the engagement of editors of the clinical decision-making tool, constructing ETL tables from data sources in Snowflake, EPIC Systems, and business requirements."
        },
        inheret: {
            title: "INHERET, Inc. - Product Manager",
            description: "• Created the roadmap and led development of a new consumer-facing product, partnering with internal stakeholders and customers to incorporate feedback\n• Led the development of a design system, collaborating with an agency, for the web and mobile applications"
        },
        novaescola: {
            title: "Associação Nova Escola - Sr Product Manager, Online Subscription",
            description: "• Led the conception, launch, and scaling of the online experience used to pivot from print to digital, creating a new revenue source from 10k subscribers within 6 months\n• Restructured software development processes to adopt agile practices and add clarity to feature specification, increasing efficiency of team of 5 engineers by +80%\n• Formed and validated hypothesis for improving customer engagement and funnel conversion with customer discovery and AB testing; increasing retention of subscribers by 25% and conversion to purchase by +60%"
        },
        enjoei: {
            title: "enjoei - Product Manager, Seller Experience",
            description: "• Conducted research through focus groups and quantitative surveys with customers who had items for sale, defining personas for sellers, and prioritizing new ideas in the roadmap\n• Led conception and launch of user experiences to increase customers' engagement and satisfaction: bundle sales, purchase ratings by buyers, transaction history, self-service customer support"
        }
    };

    // Add click event listeners to all "View Details" buttons
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const project = this.parentElement.dataset.project;
            const details = projectDetails[project];
            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;
            modal.style.display = "block";
        });
    });

    // Close the modal when clicking on <span> (x)
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add a simple animation to the timeline items
    const timelineItems = document.querySelectorAll('.experience-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
});