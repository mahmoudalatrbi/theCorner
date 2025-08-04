
const cameraIcon = document.getElementById("cameraIcon");
const card = document.querySelectorAll(".card");




cameraIcon.addEventListener('click', function () {
  document.getElementById('fileInput').click();
});


document.getElementById('fileInput').addEventListener('change', function(event) {
    event.preventDefault();

  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      // Save the URL to localStorage for persistence
      localStorage.setItem('sharedImageUrl', imageUrl);
      // Update all images with the new URL
      updateImages(imageUrl);
    };
    reader.readAsDataURL(file); // Convert the file to a Data URL
  }
});

// Function to update all images with the given URL
function updateImages(imageUrl) {
  const imageSlots = document.querySelectorAll('.myimage');
  imageSlots.forEach(image => {
    image.src = imageUrl;
  });
}

function displayInputValues() {

    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
  
    // Combine and set the values in the H1 element
    document.getElementById('userName').textContent = `${firstName} ${lastName}`;
  }
  // Event listener for the button click to trigger the display function
  document.getElementById('updateButton').addEventListener('click', displayInputValues);
