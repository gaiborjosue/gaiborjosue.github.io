document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-link');
  const content = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
      tab.addEventListener('click', () => {
          // Hide all content
          content.forEach(c => c.style.display = 'none');
          
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Show target content
          const target = document.getElementById(tab.getAttribute('data-target'));
          target.style.display = 'block';
          target.classList.add('active-content');
          
          // Add active class to current tab
          tab.classList.add('active');
      });
  });

  // Trigger click on the first tab to show first content by default
  if(tabs.length > 0) tabs[0].click();
});

document.getElementById('commandInput').addEventListener('keypress', function(e) {
  // Check if the Enter key is pressed
  if (e.key === 'Enter') {
    // Prevent the default action to avoid submitting a form if the input is inside one
    e.preventDefault();
    
    // Get the command from the input
    var command = this.value;
    
    // Parse the command to find the section name (assuming the format is "cd sectionName")
    var sectionName = command.split(' ')[1]; // This splits the command by space and gets the second part
    
    // Check if the section exists
    var section = document.getElementById(sectionName);
    if (section) {
      // Scroll to the section if it exists
      section.scrollIntoView({behavior: 'smooth'});
    } else {
      // Optionally handle the case where the section does not exist
      alert("Section '" + sectionName + "' not found.");
    }
    
    // Clear the command input
    this.value = '';
  }
});

const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const certificateWidth = slider.querySelector('img').clientWidth;
let currentPosition = 0;

prevButton.addEventListener('click', () => {
  if (currentPosition < 0) {
    currentPosition += certificateWidth;
    slider.style.transform = `translateX(${currentPosition}px)`;
  }
});

nextButton.addEventListener('click', () => {
  if (currentPosition > -(slider.scrollWidth - certificateWidth)) {
    currentPosition -= certificateWidth;
    slider.style.transform = `translateX(${currentPosition}px)`;
  }
});