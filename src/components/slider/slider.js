// scroll.js

export function setupMovieSliderScroll(movieSlider) {
    // Get the movie slider container
    
  
    // Set the interval for automatic scrolling (adjust the duration as needed)
    const scrollInterval = 5000; // 3 seconds
  
    // Function to scroll the container to the next position
    function scrollContainer() {
      // Calculate the new scroll position
      const currentScroll = movieSlider.scrollLeft;
      const containerWidth = movieSlider.clientWidth;
      const scrollWidth = movieSlider.scrollWidth;
      const scrollAmount = containerWidth / 10; // You can adjust this value as needed
  
      let newScroll = currentScroll + scrollAmount;
  
      // Reset to the beginning if we reach the end
      if (newScroll + containerWidth >= scrollWidth) {
        newScroll = 0;
      }
  
      // Animate the scroll to the new position
      movieSlider.scrollTo({
        left: newScroll,
        behavior: 'smooth', // Use smooth scrolling for a nice effect
      });
    }
  
    // Start the automatic scrolling
    let scrollIntervalId = setInterval(scrollContainer, scrollInterval);
  
    // Stop the automatic scrolling when the user hovers over the slider (optional)
    movieSlider.addEventListener('mouseenter', () => {
      clearInterval(scrollIntervalId);
    });
  
    // Resume automatic scrolling when the user moves the mouse out of the slider (optional)
    movieSlider.addEventListener('mouseleave', () => {
      scrollIntervalId = setInterval(scrollContainer, scrollInterval);
    });
  }
  